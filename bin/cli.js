#! /usr/bin/env node

console.log('🇨🇳  fmj-cli is working~ \n')

const program = require('commander')
const chalk = require('chalk')
const figlet = require('figlet')

program
  .command('create <app-name>')
  .description('Create a new project')
  //
  .option('-f, --force', 'overwrite existing project if it already exists')
  .action((name, option) => {
    // console.log(`name:${name}`, option)
    require('../lib/create')(name, option)
  })

// 配置 config 命令
program
  .command('config [value]')
  .description('inspect and modify the config')
  .option('-g, --get <path>', 'get value from option')
  .option('-s, --set <path> <value>')
  .option('-d, --delete <path>', 'delete option from config')
  .action((value, options) => {
    console.log(value, options)
  })

program
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')

program.on('--help', () => {
  // figlet for logo
  console.log(
    '\r\n' +
      figlet.textSync('fang', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
      })
  )
  console.log(
    `\r\nRun ${chalk.cyan(`fmj-cli <command> --help`)} for details\r\n`
  )
})

// parse shell command args
program.parse(process.argv)
