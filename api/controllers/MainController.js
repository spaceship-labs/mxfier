/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  search: function(req, res) {
    //var query = '"' + req.param('query') + '"';
    var query = req.param('query');
    console.log(query);
    SearchService.query(query, req.param('perPage'))
      .then(function(links) {
        res.json(links);
      });
  },
  classify: function(req, res) {
    var link = req.param('link');
    ClassificationService
      .classify(link)
      .then(function(classification) {
        res.json(classification);
      });
  }
};
