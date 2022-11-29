#! /usr/bin/env node

const program = require('commander')
// const chalk = require('chalk')
// const figlet = require('figlet')

const optionsCreate = require('../lib/command/options')
const createCommand = require('../lib/command/create')

console.log('afu-cli is working~ \n')

program.version(`v${require('../package.json').version}`)

optionsCreate()

createCommand()

// parse shell command args
program.parse(process.argv)
