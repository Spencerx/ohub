/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true,
      columnName: "email"
    },
    username: {
      type: 'string',
      required: true,
      unique: true,
      columnName: "username"
    },
    firstname: {
      type: 'string',
      required: true,
      columnName: "firstname"
    },
    lastname: {
      type: 'string',
      required: true,
      columnName: "lastname"
    },
    password: {
      type: 'string',
      minLength: 6,
      required: false,
      columnName: "password"
    },
    company: {
      type: 'string',
      required: false,
      columnName: "company"
    },
    projects: {
      collection: "project",
      via: "owner"
    }
  },

  beforeCreate: function(user, cb) {
    Crypto.hashPassword(user.password, function(err, hash) {
      user.password = hash;
      cb(err);
    });
  },

  beforeUpdate: function(user, cb) {
    if (user.password) {
      Crypto.hashPassword(user.password, function(err, hash) {
        user.password = hash;
        cb(err);
      });
    }
  }

};
