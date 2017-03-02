/**
 * ViewController
 *
 * @description :: Server-side logic for managing webs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require("underscore");

var reservedPathList = ['homepage', 'about', 'projects', 'signin', 'logout'];

function _view(req, res, view, model) {
  if (!model) {
    model = {};
  }

  if (req.isAuthenticated()) {
    model.authenticated = true;
    sails.log.debug(req.user);
    model.user = {
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      username: req.user.username,
      email: req.user.email
    }
  }
  else {
    model.authenticated = false;
  }

  return res.view(view, model);
}

function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

function isIdentfierReservedPathPrefix(identifier) {
  if (_.contains(reservedPathList, identifier)) {
    return true;
  }
  return false;
}

function logout(req, res) {
  res.cookie('jwttoken', 'logout', { httpOnly: true, expires: new Date(0) })
  return res.redirect('/');
}

module.exports = {

  auth: function(req, res) {
    Authentication.authenticate(req.body.username, req.body.password,
      function(token) {
        res.cookie('jwttoken', token.token, { httpOnly: true })
        return res.redirect('/projects');
      },
      function() {
        return _view(req, res, 'signin');
      },
      function(err) {
        res.send(500);
      }
    );
  },

  websiteRouter: function(req, res) {

    var pathArray = cleanArray(req.path.split('/'));

    if (pathArray.length === 0) {
      return _view(req, res, 'homepage');
    }

    if (pathArray[0] === 'signin' && req.isAuthenticated()) {
      return res.redirect('/');
    }

    if (pathArray[0] === 'logout') {
      return logout(req, res);
    }

    if (isIdentfierReservedPathPrefix(pathArray[0])) {
      return _view(req, res, pathArray[0]);
    }

    if (pathArray.length === 1) {
      // Requesting for a user homepage
      // TODO Check username exists
      return _view(req, res, 'user');
    }

    if (pathArray.length === 2) {
      // Requesting for a project homepage :username/:projectIdentifier
      // TODO Check :username/:projectIdentifier exists
      return _view(req, res, 'project');
    }

    if (pathArray.length === 3) {
      // Requesting for an application in a project (like mecanics, issues, ...)
      if (pathArray[2] === 'mecanic') {
        return _view(req, res, 'mecanic');
      }
      // TODO return not found
      return res.notFound();
    }

    return res.notFound();
  },

};
