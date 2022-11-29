const { readdir, unlinkSync, statSync } = require('fs')
const { join } = require('path')

// html|mp3|.. assign type to delete
const gen = (str) => new RegExp(`\.(${str})$`)
// delete folder weather it's a nest folder
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
