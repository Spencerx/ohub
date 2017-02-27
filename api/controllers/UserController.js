/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  find: function(req, res) {

    if (req.query.username) {
      User.findOne({ username: req.query.username })
        .populate("projects")
        .exec(function(err, user) {
          if (err) {
            sails.log.error(err);
            return res.serverError({ error: 'Internal server error'});
          }

          if (!user) {
            return res.send(404);
          }

          res.ok(user);
        });
    }
    else {
      User.find()
        .populate("projects")
        .exec(function(err, users) {
          if (err) {
            sails.log.error(err);
            return res.serverError({ error: 'Internal server error'});
          }
          res.ok(users);
        });
    }
  },

};
