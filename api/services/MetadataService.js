service = module.exports = {};

var Q = require('q');

service.scrape = scrape;

function scrape(url) {
  var scrape = require('html-metadata');
  return scrape(url);
}
