/* SearchService.js *
 * @description::
 * @docs::http: //sailsjs.org/#!documentation/controllers
 */

service = module.exports = {};

var google = require('google');
var Q = require('Q');

service.query = query;

function query(query, perPage) {

  var deferred = Q.defer();

  google.resultsPerPage = perPage;
  console.log('searching',query);
  google(query, function(err, res) {
    //console.log('searched',res.links.length);
    if (err) {
      console.log(err);
      deferred.reject(err);
    } else {
      deferred.resolve(res.links.splice(0, res.links.length - 1));
    }
  });
  return deferred.promise;
}
