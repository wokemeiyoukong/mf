const chalk = require('chalk')
const ora = require('ora')
const download = require('download-git-repo')
const path = require('path')
const inquirer = require('inquirer')

const {
  removeDotGitDir,
  fetchOriginsTemplates,
  generatePackageJson
} = require('../utils/tools')
const { generateQuestions } = require('../utils/config')

const terminal = require('../utils/terminal')

const logToolsInfo = require('../utils/info')

const downloadActions = async function (projectName, targetPath) {
  let spinner = ora(chalk.cyan('⏬ Start Fetching Templates... \n'))
  spinner.start()
  const { templates, choices } = await fetchOriginsTemplates()

  spinner.succeed()

  inquirer.prompt(generateQuestions(choices)).then((answers) => {
    const { template, author, install } = answers

    console.log(chalk.white('👓 Start generating... \n'))

    const downloadPath = path.join(process.cwd(), projectName)

    spinner = ora('💥 Downloading... \n')
    spinner.start()

    // download repo
    download(templates[template], projectName, async (err) => {
      if (err) {
        spinner.fail()
        console.log(chalk.red(`💦 Generate failed. ${err} \n`))
        process.exit(1)
      }

      spinner.succeed()

      // remove .git dir
      removeDotGitDir(downloadPath)

      // write to package.json
      generatePackageJson(downloadPath, {
        name: projectName,
        author
      })

      console.log(chalk.bgGreen('🌮 Generate completed! \n'))
      console.log(chalk.magenta(`🚑 ${install} install \n`))

      const script = process.platform === 'win32' ? `${install}.cmd` : install

      try {
        // window mac 执行时的脚本命令不同 window 执行npm -> npm.cmd的可执行文件 补充
        await terminal.spawn(script, install === 'yarn' ? [] : ['install'], {
          cwd: `./${projectName}`
        })

        spinner = ora('🎲 install packages ....')
        spinner.start()
      } catch (error) {
        console.log(
          chalk.red('🙅‍♂️ Error occurred while installing dependencies!'),
          error
        )
        process.exit(1)
      }

      spinner.stop()

      // auto run dev
      const commands = install === 'yarn' ? ['dev'] : ['run', 'dev']
      await terminal.spawn(script, commands, {
        cwd: `./${projectName}`
      })

      logToolsInfo()
    })
  })
}

module.exports = {
  downloadActions
}
