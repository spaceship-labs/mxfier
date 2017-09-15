/**
 * EntityController
 *
 * @description :: Server-side logic for managing entities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  saveSearch: function(req, res) {
    var entityId = req.param('entityId');
    var searchEngine = req.param('searchEngine');
    Entity.findOne(entityId)
      .then(entity => CrawlService.searchEntity(entity,searchEngine))
      .then(searchResults => res.json(searchResults))
      .catch(error => res.json(error));
  }
};
