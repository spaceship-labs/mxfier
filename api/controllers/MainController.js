/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  search: function(req, res) {
    var query = req.param('query');
    var engine = req.param('engine');
    engine = engine ? engine : 'google';
    var perPage = req.param('perPage');
    var searchFunct = SearchService.google;
    
    if(engine === 'bing'){
      var searchFunct = SearchService.bing
    }

    searchFunct(query, perPage)
      .then(function(links) {
        res.json(links);
      })
      .catch(function(error) {
        res.json(error);
      });
  },
  classify: function(req, res) {
    var link = req.param('link');
    ClassificationService
      .classify(link)
      .then(function(classification) {
        res.json(classification);
      });
  },
  test: function(req, res) {
    ClassificationService.test()
      .then(function(results) {
        res.json(results);
      })
  }
};
