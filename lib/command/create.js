const { program } = require('commander')

const { initCreate, createCommitSh } = require('../core/create')

const createCommand = () => {
  program
    .command('create <project-name>')
    .description('create a new project')
    .action((name) => {
      initCreate(name, program.opts())
    })

  program
    .command('commit <name>')
    .description('create a commit.sh')
    .action((name) => {
      createCommitSh(name, program.opts())
    })
}

module.exports = createCommand
