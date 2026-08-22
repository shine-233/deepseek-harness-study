/**
 * 课程自测题：题库与判分。
 *
 * 每道题都必须指向教材里的具体出处；答错时把读者带回那一节，而不是只给对错。
 * 题目数据是纯数据，判分是纯函数，都可以在 Node 里单独测试；
 * DOM 渲染层在本文件底部，只有被进度模块调用时才碰 document。
 */

export const QUIZ_LESSONS = Object.freeze(['00-开始这里', '01-仓库地图', '02-Cordis与插件树'])

/**
 * 题库。source 字段告诉读者答案依据在哪一节或哪个源文件；
 * explain 在提交后显示，答对答错都显示，因为解释才是学习材料。
 */
export const QUIZ_BANK = Object.freeze({
  '00-开始这里': Object.freeze([
    Object.freeze({
      id: 'q1',
      q: '“插件”和“服务”的区别是什么？',
      options: Object.freeze([
        '插件是可以插入拔出的功能模块；服务是插件放进共享上下文后、其他插件可以取得的能力',
        '插件运行在浏览器里，服务运行在 Node 里',
        '服务是插件的配置文件，插件是服务打包后的产物',
      ]),
      answer: 0,
      explain: '第 1 课「先记住六个词」：模型适配器、工具注册表、Session 等都可以作为插件装配；`ctx.sessions`、`ctx.tools` 这类能力就是服务。',
      source: 'study/00-开始这里.md#先记住六个词',
    }),
    Object.freeze({
      id: 'q2',
      q: '一个 Turn 和一个 Step 的关系是什么？',
      options: Object.freeze([
        '一个 Turn 固定包含一个 Step',
        'Turn 和 Step 是同一件事的两个名字',
        '一个 Turn 可以包含 0 个或多个 Step，每个 Step 是一次模型请求及其触发的工具调用',
      ]),
      answer: 2,
      explain: '第 1 课「先记住六个词」：首次输入被拒绝时甚至可能记录一个没有 Step 的 Turn。',
      source: 'study/00-开始这里.md#先记住六个词',
    }),
    Object.freeze({
      id: 'q3',
      q: '读完源码得出“这个工具会截断预览文本”，这属于哪类结论？',
      options: Object.freeze([
        '真实 DSH 运行证据',
        '模型回答质量结论',
        '源码事实；它不能证明真实 Profile 已加载该插件',
      ]),
      answer: 2,
      explain: '第 1 课「先看一个贯穿示例」：四句话方法要求把“已能证明”（源码和单元测试）与“还没有证明”（真实加载、token 变化）分开写。',
      source: 'study/00-开始这里.md#先看一个贯穿示例',
    }),
  ]),
  '01-仓库地图': Object.freeze([
    Object.freeze({
      id: 'q1',
      q: '`vendor/` 目录里放的是什么？读它时要注意什么？',
      options: [
        '上游从未发布的实验代码，可以直接当成官方 API 使用',
        '固定放进仓库的第三方基础库副本，带有 DSH 的重命名和部分行为修改',
        '文档站点的构建产物',
      ],
      answer: 1,
      explain: '仓库地图顶层目录表：vendor 是 Cordis 等第三方项目的副本，先读 vendor/README.md 的 Manifest 和 Local modifications，不要把第三方设计和 DSH 修改混为一谈。',
      source: 'study/01-仓库地图.md#顶层目录',
    }),
    Object.freeze({
      id: 'q2',
      q: '工具想使用文件系统，为什么通过 `ctx.tools` 这类服务而不是直接导入某个后端文件？',
      options: [
        '因为直接导入会被 lint 拒绝',
        '为了依赖方向从抽象指向具体：换后端时工具本身不用重写',
        '为了让打包体积变大',
      ],
      answer: 1,
      explain: '仓库地图「依赖方向」一节：核心包提供接口和事件，具体包提供实现；这样换实现不需要改调用方。',
      source: 'study/01-仓库地图.md#依赖方向',
    }),
    Object.freeze({
      id: 'q3',
      q: '官方架构文档（architecture.md）在哪个目录？',
      options: ['study/', 'docs/', 'website/'],
      answer: 1,
      explain: '仓库地图顶层目录表：docs/ 是官方架构、开发、用户和子系统文档的权威来源；study/ 是本仓库新增的中文导读。',
      source: 'study/01-仓库地图.md#顶层目录',
    }),
  ]),
  '02-Cordis与插件树': Object.freeze([
    Object.freeze({
      id: 'q1',
      q: 'Fiber 记录并清理的是哪些东西？',
      options: [
        '插件通过 Cordis 注册机制登记的可撤销效果',
        '进程里所有定时器和文件句柄',
        '插件私下创建的网络连接和子进程',
      ],
      answer: 0,
      explain: 'Cordis 基础一节：Fiber 按相反顺序清理已登记的效果；插件绕过注册机制私建的 timer、watcher 或子进程不在它的视野里。',
      source: 'study/02-Cordis与插件树.md',
    }),
    Object.freeze({
      id: 'q2',
      q: 'waterfall 监听器想继续让链条走下去，必须做什么？',
      options: ['返回 true', '调用 next()', '重新抛出事件'],
      answer: 1,
      explain: '事件分发模式一节：waterfall 需要监听器调用 next() 才继续；直接返回等于短路整条链。',
      source: 'study/02-Cordis与插件树.md',
    }),
    Object.freeze({
      id: 'q3',
      q: '227 个包、1124 条 peerDependencies 这个数字能说明什么？',
      options: [
        '说明行数多的包更重要',
        '只说明清单里的静态依赖形状；不能说明运行时真的调用过这些依赖',
        '说明启动耗时和包数量成正比',
      ],
      answer: 1,
      explain: '组件边界声明：这张图只读清单和行数，dependencies、动态 import 和 cordis.yml 装配都没有画进去。',
      source: 'website/public/package-graph-lab.html 的证据边界',
    }),
  ]),
})

/** 判一份答卷：answers 以题号为键，值是选项下标；返回每题对错和总分。 */
export function gradeAnswers(questions, answers) {
  const results = questions.map(question => {
    const chosen = answers[question.id]
    const pass = chosen === question.answer
    return { id: question.id, pass, chosen: chosen ?? null }
  })
  return {
    results,
    score: results.filter(result => result.pass).length,
    total: questions.length,
  }
}
