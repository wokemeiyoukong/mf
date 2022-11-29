const program = require('commander')
const chalk = require('chalk')

const logToolsInfo = require('../utils/info')

const optionsCreate = () => {
  program
    .option('-d, --dest <dest>', 'a destination folder,e.g: -d src/pages')
    .option('-f, --force', 'overwrite existing project if it already exists')

  program.on('--help', () => {
    logToolsInfo()
    console.log(
      `\r\n run ${chalk.cyan(`afu <command> --help`)} for details \r\n`
    )
  })
}

module.exports = optionsCreate
