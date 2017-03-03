
var jwt = require('jsonwebtoken'),
    moment = require('moment');


module.exports = {

  authenticate: function(username, password, successCallback, failedCallback, errorCallback) {

    User.findOne({ email: username }, function(err, user) {

      if (err) {
        sails.log.error(err);
        return errorCallback(err);
      }

      if (!user) {
        return failedCallback(err);
      }

      Crypto.comparePasswords(password, user.password, function(err, match) {

        if (err) {
          sails.log.error(err);
          return errorCallback(err);
        }

        if (!match) {
          return failedCallback(err);
        }

        var token = jwt.sign(user, sails.config.http.jwt.secret, {
          expiresIn: sails.config.http.jwt.tokenDuration
        });

        jwt.verify(token, sails.config.http.jwt.secret, function(err, decoded) {
          if (err) {
            return errorCallback(err);
          }
          return successCallback({
            token: token,
            expires: moment(decoded.exp * 1000).utc().format()
          });
        });
      });
    });
  }

};
