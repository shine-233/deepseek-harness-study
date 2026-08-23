import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  SQLITE_APPLICATION_ID_HEX,
  SQLITE_SCHEMA_VERSION,
  ZSTD_THRESHOLD_BYTES,
  applicationIdAscii,
  buildSqliteRowModel,
  decodeSourceEventSeqs,
  encodeSourceEventSeqs,
  evaluateSqliteRowOracle,
} from '../website/public/sqlite-row-model.js'

const GRID = {
  packing: ['on', 'off'],
  payload: ['small', 'large'],
}

test('the reserved application id decodes to DSHP and matches the upstream hex', () => {
  assert.equal(SQLITE_APPLICATION_ID_HEX, '0x44534850')
  assert.equal(applicationIdAscii(), 'DSHP')
})

test('the schema version is the upstream constant', () => {
  assert.equal(SQLITE_SCHEMA_VERSION, 17)
})

test('the same input produces byte-identical output', () => {
  for (const packing of GRID.packing) {
    for (const payload of GRID.payload) {
      const a = JSON.stringify(buildSqliteRowModel({ packing, payload }))
      assert.equal(a, JSON.stringify(buildSqliteRowModel({ packing, payload })))
    }
  }
})

test('oracle passes across the whole input grid', () => {
  for (const packing of GRID.packing) {
    for (const payload of GRID.payload) {
      const result = evaluateSqliteRowOracle(buildSqliteRowModel({ packing, payload }))
      for (const check of result.checks) {
        assert.equal(check.pass, true, `${packing}/${payload}: ${check.id}: ${check.actual}`)
      }
    }
  }
})

test('packing off means one scalar row per logical event', () => {
  const m = buildSqliteRowModel({ packing: 'off', payload: 'small' })
  assert.equal(m.observations.physicalRowCount, m.observations.logicalEvents)
  assert.equal(m.observations.scalarRowCount, 8)
  assert.equal(m.observations.packedRowCount, 0)
})

test('packing on folds the whole run into one bounded row with dt deltas', () => {
  const m = buildSqliteRowModel({ packing: 'on', payload: 'small' })
  assert.equal(m.observations.packedRowCount, 1)
  const row = m.rows[0]
  assert.equal(row.tag, 'text-chunks')
  assert.equal(row.memberCount, 8)
  assert.equal(row.dtCount, 7)
  assert.equal(row.seqLabel, '40–47')
  assert.ok(row.memberCount >= 3 && row.memberCount <= m.maxPackedMembers)
})

test('large payloads cross the zstd threshold; small ones stay text', () => {
  const large = buildSqliteRowModel({ packing: 'off', payload: 'large' })
  assert.ok(large.rows.every(row => row.dataBytes >= ZSTD_THRESHOLD_BYTES))
  assert.equal(large.observations.compressionCandidates, large.rows.length)

  const small = buildSqliteRowModel({ packing: 'off', payload: 'small' })
  assert.ok(small.rows.every(row => row.dataBytes < ZSTD_THRESHOLD_BYTES))
  assert.equal(small.observations.compressionCandidates, 0)

  // 打包会把 8 条大增量合成一条更大的 data，但仍然只标一个候选。
  const largePacked = buildSqliteRowModel({ packing: 'on', payload: 'large' })
  assert.equal(largePacked.observations.compressionCandidates, 1)
  assert.ok(largePacked.rows[0].dataBytes <= largePacked.maxPackedDataBytes)
})

test('unknown inputs fail loud at the model boundary', () => {
  assert.throws(() => buildSqliteRowModel({ packing: 'maybe', payload: 'small' }), RangeError)
  assert.throws(() => buildSqliteRowModel({ packing: 'on', payload: 'huge' }), RangeError)
})

test('packed rows carry the ignorable=0 sentinel and a decodable source_event_seqs encoding', () => {
  const packed = buildSqliteRowModel({ packing: 'on', payload: 'small' }).rows[0]
  assert.equal(packed.ignorable, 0)
  const bytes = Uint8Array.from(packed.sourceEventSeqsHex.split(' ').map(part => Number.parseInt(part, 16)))
  assert.deepEqual(decodeSourceEventSeqs(bytes), packed.seqCovered)
  assert.equal(bytes[0], 40, 'first seq is written as a plain varint')
  assert.ok(bytes.slice(1).every(byte => byte === 0x02), 'consecutive forward deltas zigzag to single even bytes')

  const scalar = buildSqliteRowModel({ packing: 'off', payload: 'small' }).rows[0]
  assert.equal(scalar.ignorable, null)
  assert.equal(scalar.sourceEventSeqsHex, null)
})

test('the varint codec mirrors the upstream zigzag semantics and fails loud on garbage', () => {
  assert.deepEqual(encodeSourceEventSeqs([5]), Uint8Array.from([0x05]))
  assert.deepEqual(
    decodeSourceEventSeqs(encodeSourceEventSeqs([10, 10, 12, 3, 1000])),
    [10, 10, 12, 3, 1000],
  )
  const backward = encodeSourceEventSeqs([50, 49])
  assert.equal(backward[1], 0x01, 'backward delta of -1 zigzags to the odd byte 1')
  assert.throws(() => encodeSourceEventSeqs([-1]), TypeError)
  assert.throws(() => encodeSourceEventSeqs([1.5]), TypeError)
  assert.throws(() => decodeSourceEventSeqs(Uint8Array.from([0xff])), Error)
})
