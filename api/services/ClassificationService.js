service = module.exports = {};

var Q = require('Q');

service.train = train;
service.classify = classify;

function train() {
  var defered = Q.defer();
  var classifier = BayesAdapter;
  Link.find({ limit: 3000 }).then(function(links) {
    links.forEach(function(link, key) {
      var doc = link.title + ' ' + link.description + ' ' + link.hostname;
      classifier.learn(doc, link.category);
    });
    defered.resolve(classifier);
  });
  return defered.promise;
}

function classify(link) {
  return ClassificationService
    .train()
    .then(function(classifier) {
      var doc = link.title + ' ' + link.description + ' ' + link.hostname;
      var result = classifier.classify(doc);
      console.log('result', result);
      return result;
    });

}
