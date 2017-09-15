/**
 * Entity.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      index : true,
    },
    ctbookId: {
      index: true,
      unique: true,
      type: 'string'
    },
    searchCount : {
      type : 'integer',
      defaultsTo : 0,
      required: true,
    },
    webSearches : {
      collection: 'webSearch',
      via: 'entity'
    }
  }
};
