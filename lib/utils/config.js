exports.REPOS_URL = 'https://api.github.com/orgs/little-cli/repos'

const installs = [
  {
    name: 'npm',
    value: 'npm'
  },
  {
    name: 'yarn',
    value: 'yarn'
  },
  {
    name: 'pnpm',
    value: 'pnpm'
  }
]

exports.createQuestions = [
  {
    name: 'action',
    type: 'list',
    message: '⚠️ Target directory already exists, Pick an action:',
    choices: [
      {
        name: '🍭 overwrite',
        value: true
      },
      {
        name: '🧊 cancel',
        value: false
      }
    ]
  }
]

exports.generateQuestions = (choices) => [
  {
    name: 'author',
    type: 'input',
    message: '🧑‍🦽 project author name?',
    default: 'fang'
  },
  {
    name: 'template',
    type: 'list',
    choices,
    message: '📃 Please choose a template to create project!'
  },
  {
    name: 'install',
    type: 'list',
    default: 'pnpm',
    message:
      '👷 Please choose a tool to install :( you need to install this choices!',
    choices: installs
  }
]
