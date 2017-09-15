/**
 * Link.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	link : {
  		index : true,
  		type : 'string'
  	},
  	category : {
  		model : 'category'
  	},
    webSearch : {
      model : 'webSearch'
    },
    pageRank : {
      index : true,
      type : 'integer'
    },
    searchEngine : {
      type : 'string',
      index : true,
    }

  },
  getTestSets : function(testPct,oneAgainst){
    return Link.find().then(function(links){
      var testSet = [];
      var length = links.length;
      if(oneAgainst){
        links.map(function(link){
          link.category = link.category !== oneAgainst ? 'other' : link.category;
        });
      }
      while(testSet.length / length < testPct){
        var element = Math.floor((links.length - 1) * Math.random());
        var link = links.splice(element,1);
        testSet.push(link[0]);
      }
      return {
        training : links,
        control : testSet,
      }
    });
  },
};

