const { readdir, unlinkSync, statSync } = require('fs')
const { join } = require('path')

// html|mp3|.. 指定删除的格式
const gen = (str) => new RegExp(`\.(${str})$`)
// 删除嵌套文件夹
function delFolderFile(folder, type) {
  const reg = gen(type)
  readdir(folder, (err, data) => {
    if (err) return err
    data.forEach((file) => {
      const currentPath = join(folder, file)
      if (statSync(currentPath).isDirectory()) {
        delFolderFile(currentPath, type)
      } else {
        if (reg.test(currentPath)) {
          console.log(currentPath)
          unlinkSync(currentPath)
        }
      }
    })
  })
}

module.exports = {
  delFolderFile
}
