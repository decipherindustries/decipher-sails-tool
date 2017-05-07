'use strict'

module.exports.app = {
  pathPrefix: process.env.PATH_PREFIX || '/',
  env: {
    development: {
      PORT: 'number',
      BASE_URL: 'string',
      MONGO_HOST: 'string',
      MONGO_DB: 'string',
      MONGO_PORT: 'number',
      PATH_PREFIX: 'string',
      SSO_URL: 'string'
    },
    production: {
      PORT: 'number',
      BASE_URL: 'string',
      MONGODB_URL: 'string',
      PATH_PREFIX: 'string',
      SSO_URL: 'string'
    }
  }
}
