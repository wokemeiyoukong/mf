const { program } = require('commander')

const { initCreate, createCommitSh } = require('../core/create')
const { delFolderFile } = require('../core/delFolderFile')
const { fileList } = require('../core/tiny')

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

  program
    .command('tiny')
    .description('use tinypng compression reduce the file size')
    .action(() => {
      fileList(process.cwd())
    })
}

module.exports = createCommand
