service = module.exports = {};

var rp = require('request-promise');
var searchId = '';

var entityIndex = 19;
var endIndex = 21;
var entities = [];

service.crawl = crawl;
service.searchEntity = searchEntity;
service.purgeEmptySearches = purgeEmptySearches;
//service.test = test;

function crawl() {
  Entity
    .find()
    .then(function(_entities) {
      entities = _entities;
      repeatSearch();
    });
}



function purgeEmptySearches() {
  WebSearch.find()
    .populate('searchResults')
    .then(function(webSearches) {
      var toDelete = [];
      webSearches.forEach(function(webSearch) {
        console.log(webSearch.searchResults.length);
        if (webSearch.searchResults.length === 0) {
          toDelete.push(webSearch.id);
        }
      });
      if (toDelete.length) {
        return WebSearch.destroy(toDelete).then();
      } else {
        console.log('no records to purrge');
        return webSearches;
      }
    })
}



function repeatSearch() {
  searchEntity(entities[entityIndex++])
    .then(function(results) {
      if (entityIndex <= endIndex) {
        var time = (Math.floor(Math.random() * 55) + 35) * 1000;
        console.log('search completed: ' + Math.floor(time / 1000) + 's till next search');
        setTimeout(repeatSearch, time);
      } else {
        console.log('done');
      }
    });
}

function searchEntity(entity, searchEngine, maxResults) {
  var alias = cleanCompanyName(entity.name);
  var webSearch = {};
  console.log(alias);
  if (!maxResults) {
    maxResults = 50;
  }
  if (searchEngine === 'bing') {
    searchFunct = SearchService.bing;
  } else if (searchEngine === 'ddg') {
    searchFunct = SearchService.ddg;
  } else if (searchEngine === 'google') {
    alias = '"' + alias + '"';
    searchFunct = SearchService.google;
  }


  return WebSearch.create({
      entity: entity.id,
      term: alias,
      searchEngine: searchEngine
    })
    .then(function(_webSearch) {
      webSearch = _webSearch;
      searchId = webSearch.id;
      return searchFunct(alias, maxResults);
    })
    .then(function(results) {
      console.log(results.length + ' search results');
      var links = results.map(function(result, key) {
        if (searchEngine === 'ddg') {
          //ddg
          return {
            link: result.url,
            title: result.title,
            description: result.description,
            pageRank: key + 1,
            searchEngine: 'ddg',
            webSearch: searchId,
            webId: result.url
          }
        } else if (searchEngine === 'google') {
          //google
          return {
            link: result.link,
            title: result.title,
            description: result.description,
            pageRank: key + 1,
            searchEngine: 'google',
            webSearch: searchId,
            webId: result.href
          }
        } else if (searchEngine === 'bing') {
          //bing
          return {
            link: result.displayUrl,
            title: result.name,
            description: result.snippet,
            pageRank: key + 1,
            searchEngine: 'bing',
            webSearch: searchId,
            webId: result.url
          }
        }
      });

      return SearchResult.create(links)
        .then(searchResults => webSearch);
    });


}



function cleanCompanyName(name) {
  name = name.replace(/,? s\.?[pc]\.?r?\.? de r\.?l\.? de c\.?v\.?/ig, '');
  name = name.replace(/,? s\.? de r\.?l\.? m\.?i\.?/ig, '');
  name = name.replace(/,? s\.? de r\.?l\.? de c\.?v\.?/ig, '');
  name = name.replace(/,? ?s\.?a\.? ?\.?de c\.?v\.?/ig, '');
  return name.replace(/,? s\.?c\.?/ig, '');
}
