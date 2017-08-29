//var service = module.exports = {};

var natural = require('natural');
const PorterStemmerEs = require('../../node_modules/natural/lib/natural/stemmers/porter_stemmer_es.js');

service.learn = learn;
service.classify = classify;
service.classifier = new natural.BayesClassifier(PorterStemmerEs);

function learn(document, tag) {
  this.classifier.addDocument(document, tag);
}

function classify(document) {
  return this.classifier.classify(document);
}
