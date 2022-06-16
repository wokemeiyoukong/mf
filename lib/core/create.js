const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')

const { createQuestions } = require('../utils/config')
const { ejsCompile, writeFile, mkdirSync } = require('../utils/file')
const { downloadActions } = require('./download')

const initCreate = async function (name, options) {
  const cwd = process.cwd()
  const targetPath = path.join(cwd, options.dest || '', name)

  if (fs.existsSync(targetPath)) {
    if (options.force) {
      console.log(`${chalk.red('\r\nRemove folder --force')}`)
      await fs.remove(targetPath)
    } else {
      const { action } = await inquirer.prompt(createQuestions)
      if (action) {
        console.log(`${chalk.bgRed('\r\n ⛑  Removing dir... \n')}`)
        await fs.remove(targetPath)

        console.log(`${chalk.green('🕳  remove success! \n')}`)
        downloadActions(name)
      } else {
        console.log(`${chalk.green('🙅 cancel! \n')}`)
        return
      }
    }
  } else {
    downloadActions(name)
  }
}

const handleEjsToFile = async (name, dest, template, filename) => {
  const templatePath = path.resolve(__dirname, template)
  const result = await ejsCompile(templatePath, {
    name,
    lowerName: name.toLowerCase()
  })

  mkdirSync(dest)
  const targetPath = path.resolve(dest, filename)
  await writeFile(targetPath, result)
  console.log(`${chalk.yellow(`🈶️ generate ${name}.sh success! \n`)}`)
}

const createCommitSh = async (name, { dest = './' }) => {
  handleEjsToFile(name, dest, '../templates/commit.sh.ejs', `${name}.sh`)
}

module.exports = {
  initCreate,
  createCommitSh
}
