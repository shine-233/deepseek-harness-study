const SCHEMA_VERSION = 1
const REQUEST_KIND = 'dsh-research-diagnostic-request'
const RESULT_KIND = 'dsh-research-diagnostic-result'
const REPRO_KIND = 'dsh-debug-repro'

export const SOURCE_KINDS = Object.freeze([
  'incident',
  'trace',
  'pointer',
  'diagnostics',
  'receipt',
  'unknown',
])

export const CHECK_IDS = Object.freeze(['coverage', 'privacy', 'integrity'])
export const CHECK_STATUSES = Object.freeze(['PASS', 'PARTIAL', 'WARN', 'UNAVAILABLE', 'FAIL'])
const RESULT_STATUSES = Object.freeze(['COMPLETE', 'PARTIAL', 'UNAVAILABLE', 'FAIL'])
const FINDING_SEVERITIES = Object.freeze(['info', 'warning', 'error'])
const INTEGRITY_STATUSES = Object.freeze(['verified', 'absent', 'not-checked', 'invalid', 'mismatch'])
const NEXT_ACTIONS = Object.freeze([
  'return-to-course',
  'supply-missing-evidence',
  'run-explicit-repro-export',
  'fix-request-or-artifact',
])
const ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,119}$/
const CHECK_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,59}$/
const MAX_REQUEST_BYTES = 512 * 1024
const MAX_RESULT_BYTES = 512 * 1024
const DEBUG_COMMAND_TEMPLATE = [
  '# 1) 只从你已审阅的输入生成 metadata-only repro',
  '.\\Debug-DSH.ps1 `',
  '  -Action repro-export `',
  '  -InputPath .\\approved\\diagnostics.json `',
  '  -InputPath .\\approved\\trace.json `',
  '  -ReproPath .\\repro-export',
  '',
  '# 2) 用下载的 request 和上一步的 repro 生成 result',
  '.\\Debug-DSH.ps1 `',
  '  -Action research-bridge `',
  '  -ResearchRequestPath .\\diagnostic-request.json `',
  '  -ResearchEvidencePath .\\repro-export\\repro.json `',
  '  -ResearchResultPath .\\diagnostic-result.json',
].join('\n')

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function exactString(value, maxLength) {
  if (typeof value !== 'string') return null
  const normalized = value.trim()
  if (normalized.length === 0 || normalized.length > maxLength) return null
  return normalized
}

function validId(value) {
  return typeof value === 'string' && ID_PATTERN.test(value)
}

function uniqueEnumArray(value, allowed, minimum, maximum, errorCode, errors) {
  if (!Array.isArray(value) || value.length < minimum || value.length > maximum) {
    errors.push(errorCode)
    return []
  }
  const normalized = []
  for (const item of value) {
    if (typeof item !== 'string' || !allowed.includes(item) || normalized.includes(item)) {
      errors.push(errorCode)
      return []
    }
    normalized.push(item)
  }
  return normalized
}

function validateCourse(value, errors) {
  if (!isRecord(value)) {
    errors.push('COURSE_INVALID')
    return null
  }
  const course = {
    siteId: value.siteId,
    courseId: value.courseId,
    lessonId: value.lessonId,
    questionId: value.questionId,
  }
  if (Object.values(course).some(item => !validId(item))) {
    errors.push('COURSE_ID_INVALID')
    return null
  }
  return course
}

function validateQuestion(value, errors) {
  if (!isRecord(value)) {
    errors.push('QUESTION_INVALID')
    return null
  }
  const title = exactString(value.title, 240)
  if (title === null) errors.push('QUESTION_TITLE_INVALID')
  const requiredSourceKinds = uniqueEnumArray(
    value.requiredSourceKinds,
    SOURCE_KINDS,
    1,
    SOURCE_KINDS.length,
    'QUESTION_SOURCE_KINDS_INVALID',
    errors,
  )
  const requestedChecks = []
  const checked = uniqueEnumArray(
    value.requestedChecks,
    CHECK_IDS,
    1,
    CHECK_IDS.length,
    'QUESTION_CHECKS_INVALID',
    errors,
  )
  requestedChecks.push(...checked)
  if (title === null || requiredSourceKinds.length === 0) return null
  return { title, requiredSourceKinds, requestedChecks }
}

function validateRequestSafety(value, errors) {
  if (!isRecord(value)) {
    errors.push('SAFETY_INVALID')
    return null
  }
  const valid = value.inputMode === 'explicit-file-only'
    && value.networkAccessed === false
    && value.commandsExecuted === false
    && value.targetMutated === false
    && value.uploads === false
  if (!valid) {
    errors.push('SAFETY_FAIL_CLOSED')
    return null
  }
  return {
    inputMode: 'explicit-file-only',
    networkAccessed: false,
    commandsExecuted: false,
    targetMutated: false,
    uploads: false,
  }
}

/** Build a deterministic v1 request from explicit course-form values. */
export function createRequest(input = {}) {
  const request = {
    schemaVersion: SCHEMA_VERSION,
    kind: REQUEST_KIND,
    requestId: input.requestId ?? 'course-context-001',
    course: {
      siteId: input.siteId ?? 'dsh-study',
      courseId: input.courseId ?? 'deepseek-harness',
      lessonId: input.lessonId ?? 'debug-bridge-v1',
      questionId: input.questionId ?? 'evidence-coverage',
    },
    question: {
      title: input.title ?? '检查上下文诊断证据是否完整',
      requiredSourceKinds: input.requiredSourceKinds ?? ['diagnostics', 'trace'],
      requestedChecks: input.requestedChecks ?? ['coverage', 'privacy'],
    },
    safety: {
      inputMode: 'explicit-file-only',
      networkAccessed: false,
      commandsExecuted: false,
      targetMutated: false,
      uploads: false,
    },
  }
  const validated = validateRequest(request)
  if (!validated.ok) throw new TypeError(`Invalid research request: ${validated.errors.join(', ')}`)
  return validated.value
}

/** Validate and project only fields owned by the v1 request schema. */
export function validateRequest(value) {
  const errors = []
  if (!isRecord(value)) return { ok: false, errors: ['REQUEST_NOT_OBJECT'] }
  if (value.schemaVersion !== SCHEMA_VERSION) errors.push('REQUEST_SCHEMA_UNSUPPORTED')
  if (value.kind !== REQUEST_KIND) errors.push('REQUEST_KIND_INVALID')
  if (!validId(value.requestId)) errors.push('REQUEST_ID_INVALID')
  const course = validateCourse(value.course, errors)
  const question = validateQuestion(value.question, errors)
  const safety = validateRequestSafety(value.safety, errors)
  if (errors.length > 0 || course === null || question === null || safety === null) {
    return { ok: false, errors: [...new Set(errors)] }
  }
  return {
    ok: true,
    errors: [],
    value: {
      schemaVersion: SCHEMA_VERSION,
      kind: REQUEST_KIND,
      requestId: value.requestId,
      course,
      question,
      safety,
    },
  }
}

function matchesPreset(request, preset) {
  return request.course.siteId === preset.course.siteId
    && request.course.courseId === preset.course.courseId
    && request.course.lessonId === preset.course.lessonId
    && request.course.questionId === preset.course.questionId
    && request.question.title === preset.question.title
    && JSON.stringify(request.question.requiredSourceKinds) === JSON.stringify(preset.question.requiredSourceKinds)
    && JSON.stringify(request.question.requestedChecks) === JSON.stringify(preset.question.requestedChecks)
}

/** Project a validated request into form values without retaining browser state. */
export function projectRequestToForm(value) {
  const validated = validateRequest(value)
  if (!validated.ok) throw new TypeError(`Invalid research request: ${validated.errors.join(', ')}`)
  const request = validated.value
  const preset = RESEARCH_PRESETS.find(item => matchesPreset(request, item)) ?? null
  return {
    request,
    presetId: preset?.presetId ?? 'custom',
    fields: {
      'request-id': request.requestId,
      'site-id': request.course.siteId,
      'course-id': request.course.courseId,
      'lesson-id': request.course.lessonId,
      'question-id': request.course.questionId,
      'question-title': request.question.title,
    },
    sourceKinds: [...request.question.requiredSourceKinds],
    requestedChecks: [...request.question.requestedChecks],
  }
}

function validateResultPrivacy(value, errors) {
  if (!isRecord(value)) {
    errors.push('RESULT_PRIVACY_INVALID')
    return null
  }
  const valid = value.inputMode === 'explicit-file-only'
    && value.networkAccessed === false
    && value.commandsExecuted === false
    && value.targetMutated === false
    && value.uploads === false
    && value.rawPayloadStored === false
    && value.absolutePathsStored === false
  if (!valid) {
    errors.push('RESULT_PRIVACY_FAIL_CLOSED')
    return null
  }
  return {
    inputMode: 'explicit-file-only',
    networkAccessed: false,
    commandsExecuted: false,
    targetMutated: false,
    uploads: false,
    rawPayloadStored: false,
    absolutePathsStored: false,
  }
}

function validateEvidence(value, errors) {
  if (!isRecord(value)) {
    errors.push('RESULT_EVIDENCE_INVALID')
    return null
  }
  if (typeof value.artifactPresent !== 'boolean') errors.push('RESULT_ARTIFACT_PRESENCE_INVALID')
  const artifactKind = value.artifactKind === null ? null : exactString(value.artifactKind, 80)
  if (value.artifactPresent === true && artifactKind !== REPRO_KIND) errors.push('RESULT_ARTIFACT_KIND_INVALID')
  if (value.artifactPresent === false && artifactKind !== null) errors.push('RESULT_ARTIFACT_KIND_INVALID')
  if (!Number.isInteger(value.sourceCount) || value.sourceCount < 0 || value.sourceCount > 32) {
    errors.push('RESULT_SOURCE_COUNT_INVALID')
  }
  const sourceKinds = uniqueEnumArray(value.sourceKinds, SOURCE_KINDS, 0, SOURCE_KINDS.length, 'RESULT_SOURCE_KINDS_INVALID', errors)
  const missingKinds = uniqueEnumArray(value.missingKinds, SOURCE_KINDS, 0, SOURCE_KINDS.length, 'RESULT_MISSING_KINDS_INVALID', errors)
  const sourceStatuses = []
  if (!Array.isArray(value.sourceStatuses) || value.sourceStatuses.length > 32) {
    errors.push('RESULT_SOURCE_STATUSES_INVALID')
  } else {
    for (const item of value.sourceStatuses) {
      const status = isRecord(item) ? exactString(item.status, 40) : null
      if (!isRecord(item) || !SOURCE_KINDS.includes(item.sourceKind) || status === null) {
        errors.push('RESULT_SOURCE_STATUSES_INVALID')
        sourceStatuses.length = 0
        break
      }
      sourceStatuses.push({ sourceKind: item.sourceKind, status })
    }
  }
  if (!INTEGRITY_STATUSES.includes(value.integrity)) errors.push('RESULT_INTEGRITY_INVALID')
  if (value.trust !== 'declared-metadata-only') errors.push('RESULT_TRUST_INVALID')
  if (errors.length > 0) return null
  return {
    artifactPresent: value.artifactPresent,
    artifactKind,
    sourceCount: value.sourceCount,
    sourceKinds,
    sourceStatuses,
    missingKinds,
    integrity: value.integrity,
    trust: 'declared-metadata-only',
  }
}

function validateFindings(value, errors) {
  if (!Array.isArray(value) || value.length > 64) {
    errors.push('RESULT_FINDINGS_INVALID')
    return []
  }
  const findings = []
  for (const finding of value) {
    if (!isRecord(finding)) {
      errors.push('RESULT_FINDINGS_INVALID')
      return []
    }
    const code = exactString(finding.code, 120)
    const message = exactString(finding.message, 400)
    if (code === null || !CHECK_PATTERN.test(code) || message === null || !FINDING_SEVERITIES.includes(finding.severity)) {
      errors.push('RESULT_FINDINGS_INVALID')
      return []
    }
    findings.push({ code, severity: finding.severity, message })
  }
  return findings
}

function validateHandoff(value, errors) {
  if (!isRecord(value)
    || typeof value.returnToCourse !== 'boolean'
    || typeof value.requiresManualReview !== 'boolean'
    || !NEXT_ACTIONS.includes(value.nextAction)) {
    errors.push('RESULT_HANDOFF_INVALID')
    return null
  }
  return {
    returnToCourse: value.returnToCourse,
    requiresManualReview: value.requiresManualReview,
    nextAction: value.nextAction,
  }
}

function validateCheckResults(value, requestedChecks, resultStatus, errors) {
  if (value === undefined) return null
  if (!Array.isArray(value) || value.length > CHECK_IDS.length) {
    errors.push('RESULT_CHECKS_INVALID')
    return []
  }
  const checks = []
  const seen = new Set()
  for (const item of value) {
    if (!isRecord(item)
      || !CHECK_IDS.includes(item.checkId)
      || seen.has(item.checkId)
      || !CHECK_STATUSES.includes(item.status)
      || !Array.isArray(item.findingCodes)
      || item.findingCodes.length > 16) {
      errors.push('RESULT_CHECKS_INVALID')
      return []
    }
    const findingCodes = []
    for (const code of item.findingCodes) {
      if (typeof code !== 'string' || !CHECK_PATTERN.test(code) || findingCodes.includes(code)) {
        errors.push('RESULT_CHECKS_INVALID')
        return []
      }
      findingCodes.push(code)
    }
    seen.add(item.checkId)
    checks.push({ checkId: item.checkId, status: item.status, findingCodes })
  }
  if (resultStatus !== 'FAIL' && requestedChecks !== null
    && (checks.length !== requestedChecks.length || requestedChecks.some(checkId => !seen.has(checkId)))) {
    errors.push('RESULT_CHECKS_REQUEST_MISMATCH')
  }
  if (resultStatus === 'COMPLETE' && checks.length > 0 && checks.some(item => item.status !== 'PASS')) {
    errors.push('RESULT_COMPLETE_CHECKS_INVALID')
  }
  if (resultStatus === 'UNAVAILABLE' && checks.length > 0 && checks.some(item => item.status !== 'UNAVAILABLE')) {
    errors.push('RESULT_UNAVAILABLE_CHECKS_INVALID')
  }
  if (resultStatus === 'PARTIAL' && checks.length > 0 && checks.every(item => item.status === 'PASS')) {
    errors.push('RESULT_PARTIAL_CHECKS_INVALID')
  }
  return checks
}

/** Validate and project only fields owned by the v1 result schema. */
export function validateResult(value) {
  const errors = []
  if (!isRecord(value)) return { ok: false, errors: ['RESULT_NOT_OBJECT'] }
  if (value.schemaVersion !== SCHEMA_VERSION) errors.push('RESULT_SCHEMA_UNSUPPORTED')
  if (value.kind !== RESULT_KIND) errors.push('RESULT_KIND_INVALID')
  if (!RESULT_STATUSES.includes(value.status) || value.result !== value.status) errors.push('RESULT_STATUS_INVALID')
  const failWithoutRequest = value.status === 'FAIL' && value.requestId === ''
  if (!failWithoutRequest && !validId(value.requestId)) errors.push('RESULT_REQUEST_ID_INVALID')

  const generatedAt = value.generatedAt === undefined ? null : exactString(value.generatedAt, 80)
  if (value.generatedAt !== undefined && generatedAt === null) errors.push('RESULT_GENERATED_AT_INVALID')
  // A FAIL result may be the bridge's own fail-closed envelope, produced before
  // it could recover a valid course/question/evidence projection. Treat those
  // three context fields as optional on FAIL, while keeping the result kind,
  // status, findings, privacy, and handoff contract mandatory.
  const contextErrors = value.status === 'FAIL' ? [] : errors
  const course = value.course === undefined ? null : validateCourse(value.course, contextErrors)
  const question = value.question === undefined ? null : validateQuestion(value.question, contextErrors)
  if (value.status !== 'FAIL' && (course === null || question === null)) errors.push('RESULT_CONTEXT_MISSING')
  const evidence = value.evidence === undefined ? null : validateEvidence(value.evidence, contextErrors)
  if (value.status !== 'FAIL' && evidence === null) errors.push('RESULT_EVIDENCE_MISSING')
  const checks = validateCheckResults(value.checks, question?.requestedChecks ?? null, value.status, errors)
  const findings = validateFindings(value.findings, errors)
  const privacy = validateResultPrivacy(value.privacy, errors)
  const handoff = validateHandoff(value.handoff, errors)

  if (evidence !== null && value.status !== 'FAIL') {
    if (evidence.sourceStatuses.length !== evidence.sourceCount) errors.push('RESULT_SOURCE_COUNT_MISMATCH')
    if (value.status === 'COMPLETE' && (evidence.artifactPresent !== true || evidence.missingKinds.length !== 0)) {
      errors.push('RESULT_COMPLETE_EVIDENCE_INVALID')
    }
    if (value.status === 'PARTIAL' && (evidence.artifactPresent !== true || evidence.missingKinds.length === 0)) {
      errors.push('RESULT_PARTIAL_EVIDENCE_INVALID')
    }
    if (value.status === 'UNAVAILABLE' && evidence.artifactPresent !== false) errors.push('RESULT_UNAVAILABLE_HAS_ARTIFACT')
  }

  if (value.outputWritten !== undefined && typeof value.outputWritten !== 'boolean') errors.push('RESULT_OUTPUT_FLAG_INVALID')
  const errorCode = value.errorCode === undefined ? null : exactString(value.errorCode, 120)
  if (value.errorCode !== undefined && (errorCode === null || !CHECK_PATTERN.test(errorCode))) errors.push('RESULT_ERROR_CODE_INVALID')
  if (errors.length > 0 || privacy === null || handoff === null) {
    return { ok: false, errors: [...new Set(errors)] }
  }

  return {
    ok: true,
    errors: [],
    value: {
      schemaVersion: SCHEMA_VERSION,
      kind: RESULT_KIND,
      requestId: value.requestId,
      generatedAt,
      status: value.status,
      result: value.status,
      course,
      question,
      evidence,
      checks,
      findings,
      privacy,
      handoff,
      outputWritten: value.outputWritten ?? null,
      errorCode,
    },
  }
}

/** Return the small, display-safe projection used by the static page. */
export function summarizeResult(value) {
  const validated = validateResult(value)
  if (!validated.ok) return { ok: false, errors: validated.errors }
  const result = validated.value
  return {
    ok: true,
    status: result.status,
    requestId: result.requestId || '未绑定 request',
    sourceKinds: result.evidence?.sourceKinds ?? [],
    missingKinds: result.evidence?.missingKinds ?? [],
    integrity: result.evidence?.integrity ?? 'not-checked',
    trust: result.evidence?.trust ?? 'declared-metadata-only',
    checks: result.checks ?? [],
    checksAvailable: result.checks !== null && result.checks !== undefined,
    findings: result.findings,
    privacy: result.privacy,
    nextAction: result.handoff.nextAction,
    requiresManualReview: result.handoff.requiresManualReview,
  }
}

/** The only text writer used for imported data; it never interprets HTML. */
export function writeText(target, value) {
  if (target === null || typeof target !== 'object' || !('textContent' in target)) {
    throw new TypeError('A text-capable target is required.')
  }
  target.textContent = value === null || value === undefined ? '' : String(value)
}

function freezePreset(preset) {
  return Object.freeze({
    ...preset,
    course: Object.freeze({ ...preset.course }),
    question: Object.freeze({
      ...preset.question,
      requiredSourceKinds: Object.freeze([...preset.question.requiredSourceKinds]),
      requestedChecks: Object.freeze([...preset.question.requestedChecks]),
    }),
    canProve: Object.freeze([...preset.canProve]),
    cannotProve: Object.freeze([...preset.cannotProve]),
  })
}

export const RESEARCH_PRESETS = Object.freeze([
  freezePreset({
    presetId: 'session-log-recovery',
    title: 'Session 日志与恢复',
    description: '研究 session 失败、重试和恢复链是否有足够的脱敏证据。',
    course: { siteId: 'dsh-study', courseId: 'deepseek-harness', lessonId: 'session-recovery', questionId: 'session-log-recovery' },
    question: {
      title: 'Session 失败与恢复链的证据是否完整',
      requiredSourceKinds: ['diagnostics', 'trace', 'incident'],
      requestedChecks: ['coverage', 'privacy', 'integrity'],
    },
    canProve: ['显式 repro 是否声明 diagnostics、trace、incident', '隐私字段是否全部 fail-closed', 'manifest 是否能核对'],
    cannotProve: ['原始 Session 是否真实成功恢复', '模型请求是否已经修复'],
  }),
  freezePreset({
    presetId: 'tool-execution-failure',
    title: '工具执行与失败分类',
    description: '把工具调用、失败事件和诊断观察分开，避免把错误文字当成根因。',
    course: { siteId: 'dsh-study', courseId: 'deepseek-harness', lessonId: 'tool-execution', questionId: 'tool-execution-failure' },
    question: {
      title: '工具执行失败是否有可审阅的 trace 与 incident 证据',
      requiredSourceKinds: ['trace', 'incident', 'diagnostics'],
      requestedChecks: ['coverage', 'privacy'],
    },
    canProve: ['要求的 source kind 是否存在', 'repro 是否声明未保存 Tool 参数和结果正文'],
    cannotProve: ['工具是否在生产环境执行过', '失败分类是否就是唯一根因'],
  }),
  freezePreset({
    presetId: 'permission-guard',
    title: 'Guard 与权限边界',
    description: '研究权限判断、保护名单和人工复核之间的证据边界。',
    course: { siteId: 'dsh-study', courseId: 'deepseek-harness', lessonId: 'permission-guard', questionId: 'permission-guard' },
    question: {
      title: 'Guard 决策是否同时有 trace、pointer 和 receipt',
      requiredSourceKinds: ['trace', 'pointer', 'receipt'],
      requestedChecks: ['coverage', 'privacy', 'integrity'],
    },
    canProve: ['脱敏 artifact 是否覆盖决策所需的三类来源', 'manifest 是否保持 artifact 完整性线索'],
    cannotProve: ['权限是否在 Host 中真正生效', '任何命令是否被实际拦截'],
  }),
  freezePreset({
    presetId: 'context-compaction',
    title: 'Context Compaction',
    description: '研究上下文压缩前后的观察线索，以及课程模型不能替代的真实 trace。',
    course: { siteId: 'dsh-study', courseId: 'deepseek-harness', lessonId: 'context-compaction', questionId: 'context-compaction' },
    question: {
      title: '上下文压缩研究是否有 diagnostics、trace 和 provenance pointer',
      requiredSourceKinds: ['trace', 'diagnostics', 'pointer'],
      requestedChecks: ['coverage', 'privacy'],
    },
    canProve: ['研究请求要求的压缩线索是否被声明', '证据是否遵守 metadata-only 约束'],
    cannotProve: ['压缩后的语义是否等价', '真实 token 账单或模型质量是否未受影响'],
  }),
  freezePreset({
    presetId: 'scheduler-concurrency',
    title: 'Scheduler 与并发',
    description: '研究调度顺序、并发观察和失败回收，但不把静态证据当成时序真相。',
    course: { siteId: 'dsh-study', courseId: 'deepseek-harness', lessonId: 'scheduler-concurrency', questionId: 'scheduler-concurrency' },
    question: {
      title: 'Scheduler 并发问题是否有 trace 与 diagnostics 覆盖',
      requiredSourceKinds: ['trace', 'diagnostics'],
      requestedChecks: ['coverage', 'privacy', 'integrity'],
    },
    canProve: ['显式 repro 是否包含所需的调度观察类别', 'manifest 是否可验证'],
    cannotProve: ['生产时序是否可重放', '并发竞态是否已经消失'],
  }),
  freezePreset({
    presetId: 'subagent-handoff',
    title: '子 Agent 与 Ralph 交接',
    description: '研究子任务交接、追踪和回执是否能被分层复核。',
    course: { siteId: 'dsh-study', courseId: 'deepseek-harness', lessonId: 'subagent-handoff', questionId: 'subagent-handoff' },
    question: {
      title: '子 Agent 交接是否有 trace、pointer 与 receipt',
      requiredSourceKinds: ['trace', 'pointer', 'receipt'],
      requestedChecks: ['coverage', 'privacy'],
    },
    canProve: ['交接证据类别是否齐全', '输入是否没有隐式上传或 Session 内容保存'],
    cannotProve: ['子 Agent 是否按预期完成任务', '交接内容是否忠实于生产上下文'],
  }),
  freezePreset({
    presetId: 'plugin-provenance',
    title: '插件溯源与 Provenance',
    description: '研究插件来源、回执和诊断元数据的可追溯性。',
    course: { siteId: 'dsh-study', courseId: 'deepseek-harness', lessonId: 'plugin-provenance', questionId: 'plugin-provenance' },
    question: {
      title: '插件溯源是否有 pointer、receipt 和 diagnostics',
      requiredSourceKinds: ['pointer', 'receipt', 'diagnostics'],
      requestedChecks: ['coverage', 'privacy', 'integrity'],
    },
    canProve: ['来源类别和 manifest 完整性是否可审阅', '结果是否保持 declared-metadata-only 信任级别'],
    cannotProve: ['来源声明是否真实可信', '插件是否已经安全加载或热切换'],
  }),
  freezePreset({
    presetId: 'research-debug-bridge',
    title: '研究 ↔ Debug 桥接自身',
    description: '用桥接协议本身练习 coverage、privacy 和 integrity 三层检查。',
    course: { siteId: 'dsh-study', courseId: 'deepseek-harness', lessonId: 'debug-bridge-v1', questionId: 'evidence-coverage' },
    question: {
      title: '研究请求、脱敏 repro 和 result 是否能闭合回放',
      requiredSourceKinds: ['diagnostics', 'trace', 'pointer'],
      requestedChecks: ['coverage', 'privacy', 'integrity'],
    },
    canProve: ['三项协议检查是否逐项产生结果', '网站和 Debug 是否都只处理显式文件'],
    cannotProve: ['原始 DSH 是否运行过', '课程模型是否等于真实运行时事实'],
  }),
])

export function getResearchPreset(presetId) {
  const preset = RESEARCH_PRESETS.find(item => item.presetId === presetId)
  if (preset === undefined) return null
  return {
    ...preset,
    course: { ...preset.course },
    question: {
      ...preset.question,
      requiredSourceKinds: [...preset.question.requiredSourceKinds],
      requestedChecks: [...preset.question.requestedChecks],
    },
    canProve: [...preset.canProve],
    cannotProve: [...preset.cannotProve],
  }
}

export function createRequestFromPreset(presetId, input = {}) {
  const preset = getResearchPreset(presetId)
  if (preset === null) throw new RangeError(`Unknown research preset: ${presetId}`)
  return createRequest({
    ...preset.course,
    ...preset.question,
    requestId: input.requestId ?? `${preset.presetId}-001`,
    ...input,
  })
}

function exampleResult(status = 'COMPLETE') {
  const complete = status === 'COMPLETE'
  const partial = status === 'PARTIAL'
  const unavailable = status === 'UNAVAILABLE'
  const failed = status === 'FAIL'
  return {
    schemaVersion: 1,
    kind: RESULT_KIND,
    requestId: 'course-context-001',
    generatedAt: '2026-08-19T00:00:00.000Z',
    status,
    result: status,
    course: {
      siteId: 'dsh-study',
      courseId: 'deepseek-harness',
      lessonId: 'debug-bridge-v1',
      questionId: 'evidence-coverage',
    },
    question: {
      title: '检查上下文诊断证据是否完整',
      requiredSourceKinds: ['diagnostics', 'trace'],
      requestedChecks: ['coverage', 'privacy'],
    },
    evidence: {
      artifactPresent: !unavailable && !failed,
      artifactKind: unavailable || failed ? null : REPRO_KIND,
      sourceCount: complete ? 2 : partial ? 1 : 0,
      sourceKinds: complete ? ['diagnostics', 'trace'] : partial ? ['diagnostics'] : [],
      sourceStatuses: complete
        ? [{ sourceKind: 'diagnostics', status: 'PASS' }, { sourceKind: 'trace', status: 'PASS' }]
        : partial ? [{ sourceKind: 'diagnostics', status: 'PASS' }] : [],
      missingKinds: partial ? ['trace'] : [],
      integrity: unavailable ? 'absent' : failed ? 'not-checked' : 'verified',
      trust: 'declared-metadata-only',
    },
    checks: failed ? [] : [
      {
        checkId: 'coverage',
        status: complete ? 'PASS' : partial ? 'PARTIAL' : 'UNAVAILABLE',
        findingCodes: [complete ? 'REQUIRED_EVIDENCE_PRESENT' : partial ? 'EVIDENCE_KIND_MISSING' : 'EVIDENCE_NOT_SUPPLIED'],
      },
      {
        checkId: 'privacy',
        status: complete || partial ? 'PASS' : 'UNAVAILABLE',
        findingCodes: [complete || partial ? 'EVIDENCE_PRIVACY_DECLARATION_VALID' : 'EVIDENCE_NOT_SUPPLIED'],
      },
    ],
    findings: [{
      code: complete ? 'REQUIRED_EVIDENCE_PRESENT' : partial ? 'EVIDENCE_KIND_MISSING' : unavailable ? 'EVIDENCE_NOT_SUPPLIED' : 'REQUEST_KIND_INVALID',
      severity: complete ? 'info' : partial ? 'warning' : unavailable ? 'info' : 'error',
      message: complete
        ? 'All requested evidence kinds are present in the explicit repro artifact.'
        : partial
          ? 'Required evidence kind is missing: trace.'
          : unavailable ? 'No explicit metadata-only repro artifact was supplied.' : 'The research request did not satisfy the bridge schema.',
    }],
    privacy: {
      inputMode: 'explicit-file-only',
      networkAccessed: false,
      commandsExecuted: false,
      targetMutated: false,
      uploads: false,
      rawPayloadStored: false,
      absolutePathsStored: false,
    },
    handoff: {
      returnToCourse: !failed,
      requiresManualReview: partial || unavailable || failed,
      nextAction: complete
        ? 'return-to-course'
        : partial ? 'supply-missing-evidence' : unavailable ? 'run-explicit-repro-export' : 'fix-request-or-artifact',
    },
    outputWritten: true,
  }
}

function replaceList(list, values, emptyLabel) {
  list.replaceChildren()
  if (values.length === 0) {
    const item = document.createElement('li')
    item.className = 'empty-item'
    writeText(item, emptyLabel)
    list.append(item)
    return
  }
  for (const value of values) {
    const item = document.createElement('li')
    writeText(item, value)
    list.append(item)
  }
}

function initializePage() {
  const form = document.querySelector('#bridge-request-form')
  const presetSelect = document.querySelector('#preset-id')
  const presetCanProve = document.querySelector('#preset-can-prove')
  const presetCannotProve = document.querySelector('#preset-cannot-prove')
  const requestPreview = document.querySelector('#request-preview')
  const requestFeedback = document.querySelector('#request-feedback')
  const downloadButton = document.querySelector('#download-request')
  const requestInput = document.querySelector('#request-file')
  const debugCommandPreview = document.querySelector('#debug-command-preview')
  const copyDebugCommand = document.querySelector('#copy-debug-command')
  const commandFeedback = document.querySelector('#command-feedback')
  const resultInput = document.querySelector('#result-file')
  const exampleButtons = document.querySelectorAll('[data-example-status]')
  const resultCard = document.querySelector('#result-card')
  const resultStatus = document.querySelector('#result-status')
  const resultRequestId = document.querySelector('#result-request-id')
  const resultIntegrity = document.querySelector('#result-integrity')
  const resultTrust = document.querySelector('#result-trust')
  const resultNextAction = document.querySelector('#result-next-action')
  const sourceKindsList = document.querySelector('#source-kinds-list')
  const missingKindsList = document.querySelector('#missing-kinds-list')
  const checkResultsList = document.querySelector('#check-results-list')
  const findingsList = document.querySelector('#findings-list')
  const privacyList = document.querySelector('#privacy-list')
  const resultFeedback = document.querySelector('#result-feedback')

  if (!(form instanceof HTMLFormElement)
    || !(presetSelect instanceof HTMLSelectElement)
    || !(presetCanProve instanceof HTMLUListElement)
    || !(presetCannotProve instanceof HTMLUListElement)
    || !(requestPreview instanceof HTMLElement)
    || !(requestFeedback instanceof HTMLElement)
    || !(downloadButton instanceof HTMLButtonElement)
    || !(requestInput instanceof HTMLInputElement)
    || !(debugCommandPreview instanceof HTMLElement)
    || !(copyDebugCommand instanceof HTMLButtonElement)
    || !(commandFeedback instanceof HTMLElement)
    || !(resultInput instanceof HTMLInputElement)
    || !(resultCard instanceof HTMLElement)
    || !(resultStatus instanceof HTMLElement)
    || !(resultRequestId instanceof HTMLElement)
    || !(resultIntegrity instanceof HTMLElement)
    || !(resultTrust instanceof HTMLElement)
    || !(resultNextAction instanceof HTMLElement)
    || !(sourceKindsList instanceof HTMLUListElement)
    || !(missingKindsList instanceof HTMLUListElement)
    || !(checkResultsList instanceof HTMLUListElement)
    || !(findingsList instanceof HTMLUListElement)
    || !(privacyList instanceof HTMLUListElement)
    || !(resultFeedback instanceof HTMLElement)) return

  let currentRequest = null

  writeText(debugCommandPreview, DEBUG_COMMAND_TEMPLATE)

  const setFeedback = (target, message, tone = 'neutral') => {
    target.dataset.tone = tone
    writeText(target, message)
  }

  const buildFromForm = () => {
    const data = new FormData(form)
    return createRequest({
      requestId: data.get('request-id'),
      siteId: data.get('site-id'),
      courseId: data.get('course-id'),
      lessonId: data.get('lesson-id'),
      questionId: data.get('question-id'),
      title: data.get('question-title'),
      requiredSourceKinds: data.getAll('source-kind'),
      requestedChecks: data.getAll('requested-check'),
    })
  }

  const renderPresetBoundary = (preset) => {
    replaceList(presetCanProve, preset?.canProve ?? [], '自定义节点：请自行写下可证明范围。')
    replaceList(presetCannotProve, preset?.cannotProve ?? [], '自定义节点：请自行写下不能证明范围。')
  }

  const applyRequestToForm = (value) => {
    const projection = projectRequestToForm(value)
    const preset = getResearchPreset(projection.presetId)
    presetSelect.value = projection.presetId
    renderPresetBoundary(preset)
    for (const [name, fieldValue] of Object.entries(projection.fields)) {
      const field = form.elements.namedItem(name)
      if (field instanceof HTMLInputElement) field.value = fieldValue
    }
    for (const checkbox of form.querySelectorAll('input[name="source-kind"]')) {
      if (checkbox instanceof HTMLInputElement) checkbox.checked = projection.sourceKinds.includes(checkbox.value)
    }
    for (const checkbox of form.querySelectorAll('input[name="requested-check"]')) {
      if (checkbox instanceof HTMLInputElement) checkbox.checked = projection.requestedChecks.includes(checkbox.value)
    }
    currentRequest = projection.request
    writeText(requestPreview, JSON.stringify(currentRequest, null, 2))
    downloadButton.disabled = false
    setFeedback(requestFeedback, 'request 已从用户选择的 JSON 恢复；页面没有读取其他文件或发送网络请求。', 'success')
  }

  const applyPreset = (presetId) => {
    const preset = getResearchPreset(presetId)
    renderPresetBoundary(preset)
    if (preset === null) return
    const values = {
      'request-id': `${preset.presetId}-001`,
      'site-id': preset.course.siteId,
      'course-id': preset.course.courseId,
      'lesson-id': preset.course.lessonId,
      'question-id': preset.course.questionId,
      'question-title': preset.question.title,
    }
    for (const [name, value] of Object.entries(values)) {
      const field = form.elements.namedItem(name)
      if (field instanceof HTMLInputElement) field.value = value
    }
    for (const checkbox of form.querySelectorAll('input[name="source-kind"]')) {
      if (checkbox instanceof HTMLInputElement) checkbox.checked = preset.question.requiredSourceKinds.includes(checkbox.value)
    }
    for (const checkbox of form.querySelectorAll('input[name="requested-check"]')) {
      if (checkbox instanceof HTMLInputElement) checkbox.checked = preset.question.requestedChecks.includes(checkbox.value)
    }
  }

  const generateRequest = () => {
    try {
      currentRequest = buildFromForm()
      writeText(requestPreview, JSON.stringify(currentRequest, null, 2))
      downloadButton.disabled = false
      setFeedback(requestFeedback, 'request 已在浏览器内生成；尚未读取本机文件，也没有发送网络请求。', 'success')
    } catch (error) {
      currentRequest = null
      downloadButton.disabled = true
      writeText(requestPreview, '')
      setFeedback(requestFeedback, error instanceof Error ? error.message : 'request 生成失败。', 'error')
    }
  }

  const renderSummary = (summary) => {
    resultCard.dataset.status = summary.status.toLowerCase()
    writeText(resultStatus, summary.status)
    writeText(resultRequestId, summary.requestId)
    writeText(resultIntegrity, summary.integrity)
    writeText(resultTrust, summary.trust)
    writeText(resultNextAction, summary.nextAction)
    replaceList(sourceKindsList, summary.sourceKinds, '没有声明 source kind')
    replaceList(missingKindsList, summary.missingKinds, '无缺失 kind')
    checkResultsList.replaceChildren()
    if (!summary.checksAvailable) {
      const item = document.createElement('li')
      item.className = 'empty-item'
      writeText(item, '旧 result 未携带逐项 checks；不能把旧状态解释成每项检查都通过。')
      checkResultsList.append(item)
    } else if (summary.checks.length === 0) {
      const item = document.createElement('li')
      item.className = 'empty-item'
      writeText(item, '没有 requested check 结果')
      checkResultsList.append(item)
    } else {
      for (const check of summary.checks) {
        const item = document.createElement('li')
        const name = document.createElement('strong')
        const detail = document.createElement('span')
        item.dataset.status = check.status
        writeText(name, check.checkId)
        writeText(detail, `${check.status} · ${check.findingCodes.join(', ') || 'no finding code'}`)
        item.append(name, detail)
        checkResultsList.append(item)
      }
    }
    findingsList.replaceChildren()
    if (summary.findings.length === 0) {
      const item = document.createElement('li')
      item.className = 'empty-item'
      writeText(item, '没有 finding')
      findingsList.append(item)
    } else {
      for (const finding of summary.findings) {
        const item = document.createElement('li')
        item.dataset.severity = finding.severity
        const code = document.createElement('strong')
        const message = document.createElement('span')
        writeText(code, finding.code)
        writeText(message, finding.message)
        item.append(code, message)
        findingsList.append(item)
      }
    }
    const privacyRows = Object.entries(summary.privacy).map(([key, value]) => `${key}: ${String(value)}`)
    replaceList(privacyList, privacyRows, 'privacy 声明缺失')
    const review = summary.requiresManualReview ? '需要人工复核。' : '可回到课程继续。'
    const checkNote = summary.checksAvailable
      ? 'checks 已逐项读取。'
      : '这是旧 result，未携带逐项 checks。'
    setFeedback(resultFeedback, `result 已按 v1 schema 导入；${checkNote}${review}`, summary.status === 'FAIL' ? 'error' : 'success')
  }

  const importValue = (value) => {
    const summary = summarizeResult(value)
    if (!summary.ok) {
      resultCard.dataset.status = 'invalid'
      writeText(resultStatus, 'INVALID')
      setFeedback(resultFeedback, `拒绝导入：${summary.errors.join(', ')}`, 'error')
      return
    }
    renderSummary(summary)
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    generateRequest()
  })

  presetSelect.addEventListener('change', () => {
    applyPreset(presetSelect.value)
    generateRequest()
  })

  downloadButton.addEventListener('click', () => {
    if (currentRequest === null) return
    const blob = new Blob([`${JSON.stringify(currentRequest, null, 2)}\n`], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${currentRequest.requestId}.diagnostic-request.json`
    anchor.hidden = true
    document.body.append(anchor)
    anchor.click()
    anchor.remove()
    setTimeout(() => URL.revokeObjectURL(url), 0)
    setFeedback(requestFeedback, 'request 已下载。文件只包含表单中的课程定位、问题和安全声明。', 'success')
  })

  requestInput.addEventListener('change', async () => {
    const file = requestInput.files?.[0]
    if (file === undefined) return
    if (!file.name.toLowerCase().endsWith('.json') || file.size > MAX_REQUEST_BYTES) {
      setFeedback(requestFeedback, '拒绝恢复：只接受不超过 512 KiB 的 JSON request 文件。', 'error')
      return
    }
    try {
      applyRequestToForm(JSON.parse(await file.text()))
    } catch (error) {
      currentRequest = null
      downloadButton.disabled = true
      writeText(requestPreview, '')
      setFeedback(requestFeedback, error instanceof Error ? `拒绝恢复：${error.message}` : '拒绝恢复：request 不是合法 JSON。', 'error')
    }
  })

  copyDebugCommand.addEventListener('click', async () => {
    try {
      if (navigator.clipboard?.writeText === undefined) throw new Error('clipboard unavailable')
      await navigator.clipboard.writeText(DEBUG_COMMAND_TEMPLATE)
      setFeedback(commandFeedback, '浏览器已接受命令模板的剪贴板写入请求；运行前仍要把示例路径替换成你审阅过的本地路径。', 'success')
    } catch {
      setFeedback(commandFeedback, '当前浏览器不允许访问剪贴板；请直接选择并复制上面的命令模板。', 'error')
    }
  })

  resultInput.addEventListener('change', async () => {
    const file = resultInput.files?.[0]
    if (file === undefined) return
    if (!file.name.toLowerCase().endsWith('.json') || file.size > MAX_RESULT_BYTES) {
      setFeedback(resultFeedback, '拒绝导入：只接受不超过 512 KiB 的 JSON 文件。', 'error')
      return
    }
    try {
      importValue(JSON.parse(await file.text()))
    } catch {
      resultCard.dataset.status = 'invalid'
      writeText(resultStatus, 'INVALID')
      setFeedback(resultFeedback, '拒绝导入：文件不是合法 JSON。', 'error')
    }
  })

  for (const button of exampleButtons) {
    button.addEventListener('click', () => importValue(exampleResult(button.dataset.exampleStatus)))
  }

  applyPreset(presetSelect.value)
  generateRequest()
  importValue(exampleResult('COMPLETE'))
}

if (typeof document !== 'undefined') initializePage()
