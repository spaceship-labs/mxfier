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
  },
  getTestSets : function(testPct,oneAgainst){
    var query = {
      category: {'!': null}
    };

    return SearchResult.find(query).then(function(results){
      var testSet = [];
      var length = results.length;
      if(oneAgainst){
        results.map(function(result){
          result.category = result.category !== oneAgainst ? 'other' : result.category;
        });
      }
      while(testSet.length / length < testPct){
        var element = Math.floor((results.length - 1) * Math.random());
        var result = results.splice(element,1);
        testSet.push(result[0]);
      }
      return {
        training : results,
        control : testSet,
      };
    });
  },
  getTrainingSet : function(webSearch){
    var query = {
      category: {'!': null},
      webSearch : {'!' : webSearch.id}
    };

    return SearchResult.find(query);
  },
  getTestSets : function(testPct,oneAgainst){
    var query = {
      category: {'!': null}
    };

    return SearchResult.find(query).then(function(results){
      var testSet = [];
      var length = results.length;
      if(oneAgainst){
        results.map(function(result){
          result.category = result.category !== oneAgainst ? 'other' : result.category;
        });
      }
      while(testSet.length / length < testPct){
        var element = Math.floor((results.length - 1) * Math.random());
        var result = results.splice(element,1);
        testSet.push(result[0]);
      }
      return {
        training : results,
        control : testSet,
      };
    });
  },

};
