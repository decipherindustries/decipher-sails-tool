'use strict';

module.exports.http = {

  middleware: {
    order: [
      'startRequestTimer',
      'cookieParser',
      'session',
      'bodyParser',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      'overrideRedirect',
      // 'poweredBy',
      'overridePoweredBy',
      '$custom',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ],

    // Hides X-Powered-By: SailsJS from response headers
    overridePoweredBy: function(req, res, next) {
      const express = sails.hooks.http.app
      express.disable('x-powered-by')
      res.set('X-Powered-By', 'Decipher Industries <https://decipher.industries>')
      next()
    },

    // Overrides the redirect middleware to support path based routing
    overrideRedirect: function(req, res, next) {
      const _redirect = res.redirect;

      res.redirect = function(url) {
        let prefix = String(sails.config.app.pathPrefix)
        const indexOfPrefix = url.indexOf(prefix)

        if (url.indexOf('http') > -1 || (indexOfPrefix > -1 && indexOfPrefix <= prefix.length)) {
          prefix = ''
        }

        let url = `${prefix}${url}`

        if (url.includes('//')) {
          url = url.replace(/\/\//, '/')
        }

        _redirect.call(this, url)
      }
      next()
    },
  }

};