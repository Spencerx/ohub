/**
 * ViewController
 *
 * @description :: Server-side logic for managing webs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require("underscore");

var reservedPathList = ['about', 'projects']

function _view(req, res, view, model) {
  return res.view(view, model ? {} : model);
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

module.exports = {

  websiteRouter: function(req, res) {

    var pathArray = cleanArray(req.path.split('/'));

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
