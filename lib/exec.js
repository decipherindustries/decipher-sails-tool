'use strict'

const debug = require('debug')('decipher-sails-tool/lib/exec')
const exec = require('child_process').exec

module.exports = function (cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        debug(`error: ${err.message}`)
        return reject(err)
      }

      // debug(`stdout: ${stdout}`)
      // debug(`stderr: ${stderr}`)

      resolve({
        stdout,
        stderr
      })
    })
  })
}