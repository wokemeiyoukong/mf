const figlet = require('figlet')

function logToolsInfo() {
  console.log(
    '\r\n' +
      figlet.textSync('AFU', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
      })
  )
}

module.exports = logToolsInfo
