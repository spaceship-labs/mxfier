/**
 * LinkController
 *
 * @description :: Server-side logic for managing links
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Q = require('q');

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
  },

  stats: function(req, res) {
    var Q = require('q');
    Category.find().then(function(categories) {
      var tasks = categories.map(function(cat) {
        return Link.count({ category: cat.tag });
      });
      Q.all(tasks).then(function(results) {
        var result = categories.map(function(cat,i){
          return {
            category : cat,
            count : results[i]
          }
        });
        res.json(result);
      });
    });
  }
};
