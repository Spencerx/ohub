/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.http.html
 */

var jwt = require('jsonwebtoken');

function internalBaseUrl() {
    if (process.env.PORT) {
        return 'http://localhost:' + process.env.PORT;
    }
    return 'http://localhost:1337';
}

module.exports.http = {

  baseUrl: process.env.BASE_URL || internalBaseUrl(),
  internalBaseUrl: internalBaseUrl(),

  jwt: {
    tokenDuration: process.env.API_AUTH_TOKEN_DURATION || 86400,
    secret: process.env.API_AUTH_JWT_SECRET || 'jwtsecret'
  },

  /****************************************************************************
  *                                                                           *
  * Express middleware to use for every Sails request. To add custom          *
  * middleware to the mix, add a function to the middleware config object and *
  * add its key to the "order" array. The $custom key is reserved for         *
  * backwards-compatibility with Sails v0.9.x apps that use the               *
  * `customMiddleware` config option.                                         *
  *                                                                           *
  ****************************************************************************/

  middleware: {

    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP request. (the Sails *
    * router is invoked by the "router" middleware below.)                     *
    *                                                                          *
    ***************************************************************************/

    order: [
      'startRequestTimer',
      'cookieParser',
      'decodeJwtToken',
      'session',
      'requestLogger',
      'bodyParser',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      'poweredBy',
      '$custom',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ],

    decodeJwtToken: function(req, res, next) {

      var token = req.headers['x-auth-token'];

      if (!token) {
        token = req.cookies.jwttoken;
      }

      sails.log.debug("==== Token => ", token);

      req.isAuthenticated = function() {
        if (req.user) {
          return true;
        }
        return false;
      }

      if (token) {
        jwt.verify(token, sails.config.http.jwt.secret, function(err, decoded) {
          if (err) {
            sails.log.debug("==== Invalid Token");
            if (req.url.startsWith('/api/')) {
              return res.send(401, { message: 'Token authentication failed' });
            }
          }
          else {
            req.user = decoded;
            sails.log.debug("==== Decoded Token => ", decoded);
          }
          next();
        });
        return;
      }

      next();
    },

    requestLogger: function (req, res, next) {
      sails.log.debug("Requested :: ", req.method, req.url);
      return next();
    },

    /***************************************************************************
    *                                                                          *
    * The body parser that will handle incoming multipart HTTP requests. By    *
    * default as of v0.10, Sails uses                                          *
    * [skipper](http://github.com/balderdashy/skipper). See                    *
    * http://www.senchalabs.org/connect/multipart.html for other options.      *
    *                                                                          *
    * Note that Sails uses an internal instance of Skipper by default; to      *
    * override it and specify more options, make sure to "npm install skipper" *
    * in your project first.  You can also specify a different body parser or  *
    * a custom function with req, res and next parameters (just like any other *
    * middleware function).                                                    *
    *                                                                          *
    ***************************************************************************/

    // bodyParser: require('skipper')({strict: true})

  },

  /***************************************************************************
  *                                                                          *
  * The number of seconds to cache flat files on disk being served by        *
  * Express static middleware (by default, these files are in `.tmp/public`) *
  *                                                                          *
  * The HTTP static cache is only active in a 'production' environment,      *
  * since that's the only time Express will cache flat-files.                *
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000
};
