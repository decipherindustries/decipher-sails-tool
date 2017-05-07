'use strict'

const debug = require('debug')('decipher-sails-tool/lib/which')
const which = require('which')

module.exports = function (cmd) {
  return new Promise(resolve => {
    which(cmd, (err, path) => {
      if (err) {
        debug(`error: ${err.message}`)
        return resolve({ path: null, found: false })
      }

      resolve({ path, found: true })
    })
  })
}
