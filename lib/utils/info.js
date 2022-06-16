const figlet = require('figlet')

function logToolsInfo() {
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
}

module.exports = logToolsInfo
