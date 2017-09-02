var service = module.exports = {};

service.learn = learn;
service.classify = classify;
service.train = train;
service.init = init;

function init() {
  var natural = require('natural');
  const PorterStemmerEs = require('../../node_modules/natural/lib/natural/stemmers/porter_stemmer_es.js');
  this.classifier = new natural.BayesClassifier(PorterStemmerEs);
}

function learn(document, tag) {
  this.classifier.addDocument(document, tag);
}

function classify(document) {
  return this.classifier.classify(document);
}

function train() {
  this.classifier.train();
}
