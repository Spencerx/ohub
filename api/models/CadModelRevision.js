/**
 * Cadmodelrevision.js
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
    description: {
      type: 'longtext',
      required: false,
      columnName: "description"
    },
    owner: {
      model: "cadmodel",
      columnName: "cadmodel",
      required: true
    },
    author: {
      model: "user",
      columnName: "author",
      required: true
    },
    projectId: {
      type: "string",
      columnName: "projectId",
      required: true
    }
  }

};
