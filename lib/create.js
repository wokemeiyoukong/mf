const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')

module.exports = async function (name, options) {
	// console.log(name, options, 'create')
	const cwd = process.cwd()
	const targetPath = path.join(cwd, name)

	if (fs.existsSync(targetPath)) {
		// force create
		if (options.force) {
			console.log(`${chalk.red('\r\nRemove folder --force')}`)
			await fs.remove(targetPath)
		} else {
			// TODO ask sure about cover folder
			const { action } = await inquirer.prompt([
				{
					name: 'action',
					type: 'list',
					message: 'Target directory already exists Pick an action:',
					choices: [
						{
							name: 'overwrite',
							value: true
						},
						{
							name: 'cancel',
							value: false
						}
					]
				}
			])
			if (action) {
				console.log(`${chalk.bgRed('\r\nRemoving...')}`)
				await fs.remove(targetPath)
				console.log(`${chalk.green('remove success!')}`)
				require('./download')(name)
			} else {
				return
			}
		}
	} else {
		// 执行选择模版并创建 任务
		require('./download')(name)
	}
}
