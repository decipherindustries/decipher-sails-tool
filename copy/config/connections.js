'use strict'

var credentials = {};

if (process.env.NODE_ENV === 'production') {
  credentials = {
    adapter: 'sails-mongo',
    url: process.env.MONGODB_URL,
  }
} else {
  credentials = {
    adapter: 'sails-mongo',
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DB || 'sails-app',
  }
}

module.exports.connections = {
  mongo: credentials
}
