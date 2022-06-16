const { spawn, exec } = require('child_process')

const spawnCommand = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args)
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
    childProcess.on('close', () => {
      resolve()
    })
  })
}

const execCommand = (...args) => {
  return new Promise((resolve, reject) => {
    exec(...args, (err, stdout, stderr) => {
      if (err) {
        reject(err)
        return
      }
      console.log(stdout.replace('\n', ''))
      resolve()
    })
  })
}

module.exports = {
  spawn: spawnCommand,
  exec: execCommand
}
