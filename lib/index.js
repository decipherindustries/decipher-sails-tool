'use strict'

const debug = require('debug')('decipher-sails-tool/lib/index')
const which = require('./which')
const install = require('./install')
const cli = require('./cli')

module.exports = {
  main () {
    which('sails')
    .then(result => {
      if (result.found === true) {
        debug(`Found sails at: ${result.path}`)
        return result.path
      }

      debug('Sails not found, installing...')
      return install()
    })
    .then(sailsPath => {
      return cli(sailsPath)
    })
    .then(() => {
      process.exit(0)
    })
    .catch(err => {
      console.error(`Error: ${err.message}. Aborting.`)
      process.exit(1)
    })
  }
}