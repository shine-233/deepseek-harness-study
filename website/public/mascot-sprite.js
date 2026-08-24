/**
 * 像素吉祥物「阿溟」的唯一精灵数据源。
 *
 * 字符网格逐行贪婪合并成 SVG rect，shape-rendering="crispEdges" 保证像素锐利；
 * 眼睛格（E/w 连续段）打 eye 标记驱动 CSS 眨眼循环。形象致敬社区鲸鱼娘二创
 * （原型：上善无形「溟月」、ZipZipPipe 女仆装版，CC BY-NC-SA 4.0，非商用）。
 *
 * 消费方：
 * - `study-companion.js`（课程页伴侣）运行时经相对路径导入本文件；
 * - `JournalHome.vue`（手账首页）构建期直接打包同一份数据，SSG 首屏不缺精灵。
 */

/** 字符调色板：一个字符对应一个颜色，'.' 为透明。 */
export const MASCOT_PALETTE = Object.freeze({
  h: '#7db8ff',
  H: '#3b79f0',
  d: '#2a5cc9',
  W: '#ffffff',
  S: '#fff6ed',
  s: '#f5ddc4',
  E: '#22315e',
  w: '#ffffff',
  B: '#ffb9c6',
  D: '#2f63d6',
  r: '#2454b8',
  A: '#fffdf7',
  C: '#f07a5a',
  T: '#5e9bff',
})

export const MASCOT_GRID_W = 22

/** 像素画本体：每行一个字符串；渲染器把行长补齐/裁齐到 GRID_W。 */
export const MASCOT_SPRITE = Object.freeze([
  '..........hh..........',
  '.........hHHh.........',
  '........HHHHHHHH......',
  '......WWWWWWWWWWWW....',
  '.....hHHHHHHHHHHHHh...',
  '.TT.hHHHHHHHHHHHHh.TT.',
  '.TT.HHHHHHHHHHHHHH.TT.',
  '..T.HHHHHHHHHHHHHH.T..',
  '....HHhhhhhhhhhhHH....',
  '...dHSSSSSSSSSSSSHd...',
  '...dSSSSSSSSSSSSSSd...',
  '...dSwEESSSSSwEESd....',
  '...dSEEESSSSSEEESd....',
  '...dBBSSSSSSSSSSBBd...',
  '....SSSSSSSSSSSSSS....',
  '......SSSSSSSSSS......',
  '.......AAAAAAAA.......',
  '.....DDDCCCCCCDDD.....',
  '..DD.DDDDAAAADDDD.DD..',
  '..DD.DDDDAAAADDDD.DD..',
  '..ss.DDDDAAAADDDD.ss..',
  '....rrrrrrrrrrrrrr....',
])

/** 挥手：右臂举过头顶，其余与待机一致。戳一戳时播放。 */
export const MASCOT_SPRITE_WAVE = Object.freeze([
  '..........hh..........',
  '.........hHHh.........',
  '........HHHHHHHH...DD.',
  '......WWWWWWWWWWWW.DD.',
  '.....hHHHHHHHHHHHHhDD.',
  '.TT.hHHHHHHHHHHHHh.TT.',
  '.TT.HHHHHHHHHHHHHH.TT.',
  '..T.HHHHHHHHHHHHHH.T..',
  '....HHhhhhhhhhhhHH....',
  '...dHSSSSSSSSSSSSHd...',
  '...dSSSSSSSSSSSSSSd...',
  '...dSwEESSSSSwEESd....',
  '...dSEEESSSSSEEESd....',
  '...dBBSSSSSSSSSSBBd...',
  '....SSSSSSSSSSSSSS....',
  '......SSSSSSSSSS......',
  '.......AAAAAAAA.......',
  '.....DDDCCCCCCDDD.....',
  '..DD.DDDDAAAADDDD.....',
  '..DD.DDDDAAAADDDD.....',
  '..ss.DDDDAAAADDDD.ss..',
  '....rrrrrrrrrrrrrr....',
])

/** 走路：双腿迈开（巡游时与待机帧交替播放）。 */
export const MASCOT_SPRITE_WALK = Object.freeze([
  '..........hh..........',
  '.........hHHh.........',
  '........HHHHHHHH......',
  '......WWWWWWWWWWWW....',
  '.....hHHHHHHHHHHHHh...',
  '.TT.hHHHHHHHHHHHHh.TT.',
  '.TT.HHHHHHHHHHHHHH.TT.',
  '..T.HHHHHHHHHHHHHH.T..',
  '....HHhhhhhhhhhhHH....',
  '...dHSSSSSSSSSSSSHd...',
  '...dSSSSSSSSSSSSSSd...',
  '...dSwEESSSSSwEESd....',
  '...dSEEESSSSSEEESd....',
  '...dBBSSSSSSSSSSBBd...',
  '....SSSSSSSSSSSSSS....',
  '......SSSSSSSSSS......',
  '.......AAAAAAAA.......',
  '.....DDDCCCCCCDDD.....',
  '.DD..DDDDAAAADDDDDD...',
  '.DD.DDDDAAAAADDDD..DD.',
  '..s.DDDDAAAAADDDD..ss.',
  '....rrrrrrrrrrrrrr....',
])

/** 开心：弯成 ∧ 的闭眼笑（判分满分时播放）。 */
export const MASCOT_SPRITE_HAPPY = Object.freeze([
  '..........hh..........',
  '.........hHHh.........',
  '........HHHHHHHH......',
  '......WWWWWWWWWWWW....',
  '.....hHHHHHHHHHHHHh...',
  '.TT.hHHHHHHHHHHHHh.TT.',
  '.TT.HHHHHHHHHHHHHH.TT.',
  '..T.HHHHHHHHHHHHHH.T..',
  '....HHhhhhhhhhhhHH....',
  '...dHSSSSSSSSSSSSHd...',
  '...dSSSSSSSSSSSSSSd...',
  '...dS.E.SSSSS.E.Sd....',
  '...dSE.ESSSSSE.ESd....',
  '...dBBSSSSSSSSSSBBd...',
  '....SSSSSSSSSSSSSS....',
  '......SSSSSSSSSS......',
  '.......AAAAAAAA.......',
  '.....DDDCCCCCCDDD.....',
  '..DD.DDDDAAAADDDD.DD..',
  '..DD.DDDDAAAADDDD.DD..',
  '..ss.DDDDAAAADDDD.ss..',
  '....rrrrrrrrrrrrrr....',
])

/** 打盹：闭眼成一条线（打盹插件触发，配合 CSS 倾斜与 zzZ）。 */
export const MASCOT_SPRITE_NAP = Object.freeze([
  '..........hh..........',
  '.........hHHh.........',
  '........HHHHHHHH......',
  '......WWWWWWWWWWWW....',
  '.....hHHHHHHHHHHHHh...',
  '.TT.hHHHHHHHHHHHHh.TT.',
  '.TT.HHHHHHHHHHHHHH.TT.',
  '..T.HHHHHHHHHHHHHH.T..',
  '....HHhhhhhhhhhhHH....',
  '...dHSSSSSSSSSSSSHd...',
  '...dSSSSSSSSSSSSSSd...',
  '...dSSSSSSSSSSSSSSd...',
  '...dSEEESSSSSEEESd....',
  '...dBBSSSSSSSSSSBBd...',
  '....SSSSSSSSSSSSSS....',
  '......SSSSSSSSSS......',
  '.......AAAAAAAA.......',
  '.....DDDCCCCCCDDD.....',
  '..DD.DDDDAAAADDDD.DD..',
  '..DD.DDDDAAAADDDD.DD..',
  '..ss.DDDDAAAADDDD.ss..',
  '....rrrrrrrrrrrrrr....',
])

/** 具名帧注册表：行为插件按名字取帧。 */
export const MASCOT_FRAMES = Object.freeze({
  idle: MASCOT_SPRITE,
  wave: MASCOT_SPRITE_WAVE,
  walk: MASCOT_SPRITE_WALK,
  happy: MASCOT_SPRITE_HAPPY,
  nap: MASCOT_SPRITE_NAP,
})

/**
 * 同色横向贪婪合并成 rect；眼睛格单独标记以便做眨眼动画。
 * 返回 { x, y, w, fill, eye } 数组，坐标系为 22×21 的字符网格。
 *
 * @param {string[]} [grid] - 字符网格，缺省用待机帧。
 */
export function buildMascotRects(grid = MASCOT_SPRITE) {
  const rects = []
  grid.forEach((row, y) => {
    const cells = row.padEnd(MASCOT_GRID_W, '.').slice(0, MASCOT_GRID_W).split('')
    let x = 0
    while (x < cells.length) {
      const ch = cells[x]
      let w = 1
      while (x + w < cells.length && cells[x + w] === ch) w++
      if (ch !== '.') {
        rects.push({
          x,
          y,
          w,
          fill: MASCOT_PALETTE[ch] ?? '#cccccc',
          eye: [...Array(w)].every((_, i) => cells[x + i] === 'E' || cells[x + i] === 'w'),
        })
      }
      x += w
    }
  })
  return rects
}
