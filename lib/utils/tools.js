const fs = require('fs')
const axios = require('axios')
const path = require('path')
const handlebars = require('handlebars')

const { REPOS_URL } = require('./config')

function delFolders(url) {
  let files = []
  if (fs.existsSync(url)) {
    files = fs.readdirSync(url)
    files.forEach((file) => {
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

async function fetchOriginsTemplates() {
  const templates = {}
  let choices = []
  const instance = axios.create()
  try {
    const { data } = await instance.get(REPOS_URL, {
      timeout: 10000
    }) // 模板组织仓库
    choices = data.map((v) => v.name)
    for (const item of data) {
      templates[item.name] = item.full_name
    }
  } catch (error) {
    console.log(error, 'error')
    process.exit(1)
  }
  return {
    templates,
    choices
  }
}

function removeDotGitDir(downloadPath) {
  // 模板内部存在.git 文件需要删除
  const gitPath = path.join(downloadPath, '.git')
  if (fs.existsSync(gitPath)) {
    delFolders(gitPath)
  }
}

function generatePackageJson(downloadPath, param) {
  const packagePath = path.join(downloadPath, 'package.json')

  if (fs.existsSync(packagePath)) {
    const content = fs.readFileSync(packagePath).toString()
    const template = handlebars.compile(content)
    const result = template(param)
    fs.writeFileSync(packagePath, result)
  }
}

module.exports = {
  fetchOriginsTemplates,
  removeDotGitDir,
  generatePackageJson
}
