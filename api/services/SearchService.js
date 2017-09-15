service = module.exports = {};

var Q = require('q');

service.google = google;
service.ddg = ddg;
service.ddgEnhanced = ddgEnhanced;
service.bing = bing;

function bing(query, perPage) {

  var deferred = Q.defer();
  var Bing = require('node-bing-api')({ accKey: sails.config.bing.apiKey });
  Bing.web(query, { count: perPage }, function(error, res, body) {
    if (error) {
      return deferred.reject(error);
    } else {
      if (body.webPages) {
        //console.log('some links',body.webPages.value.length);
        return deferred.resolve(body.webPages.value);
      } else {
        deferred.resolve([]);
      }
    }
  });
  return deferred.promise;
}

function google(query, perPage) {
  var _google = require('google');
  var ddg = require('ddg-scraper')
  var deferred = Q.defer();

  _google.resultsPerPage = perPage;
  //
  _google(query, function(err, res) {
    //console.log('searched',res.links.length);
    if (err) {
      console.log('blocked by google');
      deferred.reject(err);
    } else {
      deferred.resolve(res.links.splice(0, res.links.length - 1));
    }
  });
  return deferred.promise;
}

function ddg(query, max) {
  console.log(query);
  var ddg = require('ddg-scraper');
  return DdgResultsScrapper.search({ q: query, max: max });
}

function ddgEnhanced(query, max) {
  return SearchService.ddg(query, max)
    .then(function(links) {
      return MetadataService.scrape(links[5])
        .then(function(data) {
          console.log('scraped meta', data);
          return data;
        });
    });
}
