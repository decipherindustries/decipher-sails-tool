'use strict'

const argv = require('yargs').argv
const mergedirs = require('merge-dirs').default
const debug = require('debug')('decipher-sails-tool/lib/cli')
const join = require('path').join
const exec = require('./exec')
const which = require('./which')
const mkdirp = require('./mkdirp')

module.exports = function (sailsPath) {
  // 0. mkdirp directory
  // 1. Install sails in the directory given by user - relative to cwd()
  // 2. Install connect-redis, sails-mongo, ejs, debug
  // 3. Install decipher mixins
  // 4. Update/write relevant files 

  return new Promise((resolve, reject) => {
    let path = null
    let npm = null

    if (!Array.isArray(argv._) || argv._.length !== 1) {
      path = '.'
    } else {
      path = argv._[0]
    }

    mkdirp(process.cwd(), path)
    .then(installPath => {
      path = installPath
      return exec(`cd ${installPath} && ${sailsPath} new . --no-frontend`)
    })
    .then(() => {
      console.log(`Initiated a new sails project at ${path}`)
      return which('npm').then(result => {
        if (result.found === false) {
          throw new Error('npm not found')
        }

        return result.path
      })
    })
    .then(npmPath => {
      npm = npmPath
      console.log(`Installing dependencies...`)
      return exec(`cd ${path} && ${npm} install --silent .`)
    })
    .then(() => {
      console.log('Installing sails-mongo, connect-redis, ejs, request & decipher-sails-utils...')
      return exec(`cd ${path} && ${npm} install --silent --save debug sails-mongo connect-redis ejs request decipher-sails-utils`)
    })
    .then(() => {
      console.log('Copying custom files...')
      return mergedirs(join(__dirname, '../copy'), path, 'overwrite')
    })
    .then(() => {
      console.log('All done.')
      resolve()
    })
    .catch(err => {
      debug(`Error: ${err.message}`)
      reject(err)
    })
  })
}