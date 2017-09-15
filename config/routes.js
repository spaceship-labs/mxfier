module.exports.routes = {

  '/': {
    controller: 'link',
    action: 'count'
  },
  '/search': {
    controller: 'main',
    action: 'search'
  },
  '/classify': {
    controller: 'main',
    action: 'classify'
  },
  'get /entity/count' : {
    blueprint: 'count',
    model : 'entity'
  },
};
