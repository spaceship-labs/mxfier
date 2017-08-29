module.exports.routes = {

  '/': {
    view: 'homepage'
  },
  '/search': {
    controller: 'main',
    action: 'search'
  },
  '/classify': {
    controller: 'main',
    action: 'classify'
  }
};
