const { program } = require('commander')

const { initCreate, createCommitSh } = require('../core/create')
const { delFolderFile } = require('../core/delFolderFile')

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

  program
    .command('del <type>')
    .description('delete files from nested folders in current path')
    .action((type) => {
      if (!type) throw Error('type must be specified')
      delFolderFile(process.cwd(), type)
    })
}

module.exports = createCommand
