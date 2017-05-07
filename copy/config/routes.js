'use strict'

module.exports.routes = require('decipher-sails-utils').prefixRoutes({
  'GET /': { view: 'homepage' }
})
