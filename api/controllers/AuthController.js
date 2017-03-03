
module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  authenticate: function(req, res) {
    Authentication.authenticate(req.body.username, req.body.password,
      function(token) {
        res.send(201, token);
      },
      function() {
        res.send(401, { message: 'Authentication failed.' });
      },
      function(err) {
        res.send(500);
      }
    );
  },

};
