/**
 * LinkController
 *
 * @description :: Server-side logic for managing links
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Q = require('Q');

module.exports = {
  saveLinks: function(req, res) {
    var params = req.allParams();
    var toSave = params.links.filter(function(link) {
      return link.category;
    });
    var tasks = toSave.map(function(link) {
      return Link.updateOrCreate(link.link, link);
    });

    Q.all(tasks)
      .then(function(results) {
      	res.json(results);
      })
      .catch(function(error) {
        console.log(error);
        res.json(error);
      })

  }
};
