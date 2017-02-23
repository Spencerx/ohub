/**
 * Project.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    identifier: {
      type: 'string',
      required: true,
      columnName: "identifier"
    },
    name: {
      type: 'string',
      required: true,
      columnName: "name"
    },
    headline: {
      type: 'longtext',
      required: false,
      columnName: "headline"
    },
    description: {
      type: 'longtext',
      required: false,
      columnName: "description"
    },
    cadmodels: {
      collection: "cadmodel",
      via: "owner"
    },
    owner: {
      model: "user",
      columnName: "owner",
      required: true
    }
  }

};
