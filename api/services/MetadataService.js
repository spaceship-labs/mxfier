service = module.exports = {};

var Q = require('Q');

service.scrape = scrape;

function scrape(url) {
  var scrape = require('html-metadata');
  return scrape(url);
}
