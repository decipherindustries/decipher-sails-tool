'use strict'

module.exports.bootstrap = function (callback) {
  require('decipher-sails-utils').populateCustomErrors(sails)

  EnvService.validate(success => {
    if (!success) {
      return process.exit(1)
    }

    sails.log.info(`[bootstrap.js] App listening on port ${process.env.PORT || 1337}`)
    callback()
  })
}
