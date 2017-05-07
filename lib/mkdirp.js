'use strict'

const mkdirp = require('mkdirp')
const p = require('path')
const debug = require('debug')('decipher-sails-tool/lib/mkdirp')

module.exports = function () {
  const args = Array.from(arguments)
  let path = null

  if (args.length === 1) {
    path = args[0]
  } else {
    path = p.join.apply(p, args)
  }

  return new Promise((resolve, reject) => { 
    if (path === null) {
      return reject(new Error('Path is null'))
    } 

    debug('Recursively creating path: ' + path)
    mkdirp(path, function (err) {
      if (err) {
        debug(`error: ${err.message}`)
        return reject(err)
      }
      
      resolve(path)
    })
  })
}
