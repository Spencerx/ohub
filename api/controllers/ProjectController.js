/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');

module.exports = {

  find: function(req, res) {
    var criteria = {};

    if (req.query.identifier) {
      criteria['identifier'] = req.query.identifier;
    }

    Project.find(criteria)
      .populate("owner")
      .populate("cadmodels")
      .sort("identifier DESC")
      .exec(function(err, projects) {
        if (err) {
          sails.log.error(err);
          return res.serverError({ error: 'Internal server error'});
        }

        var matchProjects;
        if (req.query.username) {
          matchProjects = [];
        }

        for (project in projects) {

        }

        projects.forEach(function(project) {
          delete project.owner.password;
          if (matchProjects !== undefined && project.owner.username === req.query['username']) {
            matchProjects.push(project);
          }
        });

        res.ok(matchProjects ? matchProjects : projects);
      });
  },

};
