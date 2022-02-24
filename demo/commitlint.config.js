const types = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'release',
  'chore',
  'revert'
]

module.exports = {
  extends: ['@commitlint/config-conventional'],
  // <type>(<scope>): <subject>
  // <空行>
  // <body>
  // <空行>
  // <footer></footer>
  // type: commit类型
  // scope: 标识commit影响的范围
  // subject: 本次修改的简单描述
  // body 详细描述
  rules: {
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', types], // type类型
    'scope-case': [0, 'always'], // 单词格式
    'scope-empty': [0, 'never'], // scope 允许为空
    'subject-empty': [2, 'never'], //
    'subject-case': [0, 'never'],
    'header-max-length': [2, 'always', 88],
    'custom-rule': [2, 'always']
  },
  plugins: [
    {
      rules: {
        'custom-rule': commit => {
          const { type } = commit
          const warning = `commit type should one of ${types.toString()}`
          return [types.includes(type), warning]
        }
      }
    }
  ]
}
