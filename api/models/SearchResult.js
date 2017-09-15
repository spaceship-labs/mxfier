/**
 * SearchResult.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    link: {
      type: 'string'
    },
    category: {
      model: 'category'
    },
    webSearch: {
      model: 'webSearch'
    },
    pageRank: {
      type: 'integer'
    },
    searchEngine: {
      type: 'string',
    }
  }
};
