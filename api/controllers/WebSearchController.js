/**
 * SearchController
 *
 * @description :: Server-side logic for managing searches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  classify: function(req, res) {
    var webSearchId = req.param('webSearchId');
    WebSearch.findOne(webSearchId)
      .populate('searchResults', {
        limit: 100,
        sort: 'pageRank'
      })
      .then(ClassificationService.classifyWebSearch)
      .then(webSearch => res.json(webSearch));
  }
};
