service = module.exports = {};

var bayes = require('bayes');

service.learn = learn;
service.classify = classify;
service.classifier = bayes();

function learn(document, tag) {
  this.classifier.learn(document, tag);
}

function classify(document) {
  return this.classifier.categorize(document);
}
