/**
 * Cadmodel.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      columnName: "name"
    },
    identifier: {
      type: 'string',
      required: true,
      columnName: "identifier"
    },
    description: {
      type: 'longtext',
      required: false,
      columnName: "description"
    },
    revisions: {
      collection: "cadmodelrevision",
      via: "owner"
    },
    owner: {
      model: "project",
      columnName: "owner",
      required: true
    }
  }

};
