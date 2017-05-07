'use strict'

const debug = require('debug')('decipher-sails-tool/lib/install')
const which = require('which')
const exec = require('./exec')

module.exports = function install() {
  return new Promise((resolve, reject) => {
    let npm = null

    try {
      npm = which.sync('npm')
    } catch (e) {
      debug(`which "npm" error: ${e.message}`)
      return reject(e)
    }

    exec(`${npm} install -g sails`)
    .then(() => {
      return which('sails')
    })
    .then(result => {
      if (result.found === false) {
        throw new Error('Couldn\'t find "sails" after installation')
      }

      resolve(result.path)
    })
    .catch(err => {
      debug(`error: ${err.message}`)
      reject(err)
    })
  })
}