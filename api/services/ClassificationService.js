var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
var normalize = require('../../normalize.json');
var synonyms = require('../../synonyms.json');
var Q = require('q');

service = module.exports = {};
service.train = train;
service.test = test;
service.setAdapter = setAdapter;
service.classifier = {};

function setAdapter(adapter) {
  if (adapter === 'natural') {
    this.classifier = NaturalAdapter;
  } else if (adapter === 'bayes') {
    this.classifier = BayesAdapter;
  }
}

function train(links) {
  this.classifier.init();
  links.forEach(function(link) {
    var doc = prepareText(
      link.title + ' ' + link.description + ' ' + link.href
    );
    ClassificationService.classifier.learn(doc, link.category);
  });
  this.classifier.train();
}

function test() {
  ClassificationService.setAdapter('bayes');
  return Link.getTestSets(0.1).then(function(sets) {
    ClassificationService.train(sets.training);
    var errors = 0;
    var results = sets.control.map(runTest);
    var errors = results.reduce(addErrors, 0);
    var obj = {
      errors: errors,
      totalTested: sets.control.length,
      totalTrained: sets.training.length,
      results,
    };
    //console.log(obj);
    return obj;
  });
}

function addErrors(sum, value) {
  var add = value.expected === value.result ? 0 : 1;
  return sum + add;
}

function runTest(link) {
  var doc = prepareText(link.title + ' ' + link.description + ' ' + link.href);
  var result = ClassificationService.classifier.classify(doc);
  return {
    expected: link.category,
    result: result,
  };
}

function prepareText(text) {
  return text
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .split(' ')
    .map(token => token.trim().toLowerCase())
    .filter(token => token)
    .map(token => normalize[token] || token)
    .map(token => synonyms[token] || token)
    .join(' ');
}
