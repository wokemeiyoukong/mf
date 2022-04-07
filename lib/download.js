#!/usr/bin/env node

const chalk = require('chalk')
const ora = require('ora')
const download = require('download-git-repo')
const path = require('path')
const fs = require('fs')
const handlebars = require('handlebars')
const inquirer = require('inquirer')
const axios = require('axios')
const figlet = require('figlet')
const spawn = require('cross-spawn')
const shell = require('shelljs')

// 递归删除文件夹下的文件
function delFolders(url) {
	let files = []
	// 是否存在
	if (fs.existsSync(url)) {
		// 查看文件夹
		files = fs.readdirSync(url)
		files.forEach((file, index) => {
			let curPath = path.join(url, file)
			// 是否是文件夹 递归
			if (fs.statSync(curPath).isDirectory()) {
				delFolders(curPath)
			} else {
				// 删除文件
				fs.unlinkSync(curPath)
			}
		})

		fs.rmdirSync(url)
	} else {
		console.log('path is not exist')
	}
}

let spinner = ora(chalk.cyan('Start Fetching Templates... \n'))
spinner.start()

// 拉取远程仓库名称
let choices = []

module.exports = async function getRepoLists(projectName) {
  let repos = []
  try {
    const instance = axios.create()
    const { data } = await instance.get(
      'https://api.github.com/orgs/little-cli/repos',
      {
        timeout: 10000
      }
    ) // 模板组织仓库
    repos = data
  } catch (error) {
    process.exit(1)
  }
	spinner.succeed()
	choices = repos.map((v) => v.name) // 模板名称
	const templates = {} // 模板 key : 地址 url

	for (const item of repos) {
		templates[item.name] = item.full_name
	}

	const question = [
		{
			name: 'author',
			type: 'input',
			message: 'project author name?',
			default: 'fang'
		},
		{
			name: 'template',
			type: 'list',
			choices,
			message: 'Please choose a template to create project!'
		},
		{
			name: 'install',
			type: 'list',
			default: 'pnpm',
			message:
				'Please choose a tool to install :( you need to install this choices!',
			choices: [
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
		}
	]
	inquirer.prompt(question).then((answers) => {
		const { template, author, install } = answers

		console.log(chalk.white('\n Start generating... \n'))
		// 出现加载图标

		const downloadPath = path.join(process.cwd(), projectName)

		const param = {
			name: projectName,
			author
		}

		spinner = ora('Downloading...')
		spinner.start()

		// 执行下载方法并传入参数
		download(templates[template], projectName, (err) => {
			if (err) {
				spinner.fail()
				console.log(chalk.red(`Generation failed. ${err}`))
				return
			}
			// 结束加载图标
			spinner.succeed()

			// 模板内部存在.git 文件需要删除
			const gitPath = path.join(downloadPath, '.git')
			if (fs.existsSync(gitPath)) {
				delFolders(gitPath)
			}

			// *修改package.json
			const packagePath = path.join(downloadPath, 'package.json')

			if (fs.existsSync(packagePath)) {
				const content = fs.readFileSync(packagePath).toString()
				const template = handlebars.compile(content)
				const result = template(param)
				fs.writeFileSync(packagePath, result)
			}

			console.log(chalk.bgGreen('\n Generation completed!'))

      console.log('\n To get started \n')
      // !删除lock文件
			// if (install !== 'yarn') {
			// 	// delete yarn.lock
      //   const lock = path.join(downloadPath, 'yarn.lock')
      //   if (fs.existsSync(lock)) {
      //     fs.unlinkSync(lock)
      //   }
			// }
			// 进入工程目录
			shell.cd(`./${projectName}`)

			console.log(chalk.magenta(`\n ${install} install \n`))

			try {
				if (install === 'yarn') {
					// synchronously
					spawn.sync(install, { stdio: 'inherit' })
				} else {
					spawn.sync(install, ['install'], { stdio: 'inherit' })
				}
				spinner = ora('install packages ....')
				spinner.start()
			} catch (error) {
				console.log(chalk.red('Error occurred while installing dependencies!'))
				process.exit(1)
			}

			//
			// child.on('close', function (code) {
			// 	// 执行失败
			// 	if (code !== 0) {
			// 		console.log(
			// 			chalk.red('Error occurred while installing dependencies!')
			// 		)
			// 		process.exit(1)
			// 	}
			// 	// 执行成功
			// 	else {
			// 		spinner.stop()
			// 		console.log(chalk.cyan('Install finished'))
			// 	}
			// })
			spinner.stop()
			shell.cd('..')
			console.log(chalk.cyan(`    cd ${projectName} \n`))

			console.log(
				chalk.yellow(`    ${install} ${install === 'yarn' ? '' : 'run'} dev \n`)
			)

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
		})
	})
}
