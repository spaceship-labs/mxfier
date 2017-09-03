var request = require('request-promise');
var cheerio = require('cheerio');

  function search (opts, cb) {
    var max = opts.max || 0;
    delete opts.max;

    // See https://duckduckgo.com/params for more arams

    return request({
      baseUrl: `https://duckduckgo.com`,
      uri: '/html',
      qs: opts,
      transform: function (body) {
          return cheerio.load(body);
      }            
    })
    .then(function($){
      var results = [];
      var links = $('#links .result__body');
      sails.log.info('links', links);
      links.each((i, elem) => {

        if ((max > 0 && results.length < max) || max === 0) {
          sails.log.info('elem', $(elem).html());

          var linkUrl = $(elem).find('a.result__a');
          var url = $(linkUrl).attr('href');
          var title = $(linkUrl).text();
          var description = $(elem).find('.result__snippet').text();
          sails.log.info('a url', url);


          url = formatDdgUrl(url);

          results.push({
            url: url,
            title: title,
            description: description
          });
        }
      });

      return results;
    });
}

function formatDdgUrl(url){
  //DDG scrapping comes with this url format
  // /l/?kh=-1&amp;uddg=http%3A%2F%2Fwww.breakingnews.com%2Ftopic%2Fgrupo%2Dhiga%2F

  var protocol = 'http';
  if(url.indexOf('https') > -1){
    protocol = 'https';
  }
  url = unescape(url.substring(url.indexOf(protocol)));
  return url;  
}

module.exports = {
  search: search
};
