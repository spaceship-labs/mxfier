service = module.exports = {};

var rp = require('request-promise');

service.topContracts = topContracts;
service.getEntities = getEntities;

function getEntities() {
  ctbookService.topContracts(300,1)
    .then(extractEntities)
    .then(Entity.findOrCreate)
    .then(function(results){
      console.log(results.length + ' companies processed');
    });
}


function topContracts(ammount,page) {
  if (!page) {
    page = 0;
  }
  var where = {
    'fecha_inicio_year': {
      '>=': 2016,
      '<=': 2016
    }
  };
  var query = {
    limit: ammount,
    skip: page * ammount,
    sort: 'importe_contrato DESC',
    where: JSON.stringify(where),
  };

  var options = {
    url: 'http://ctbook-api.herokuapp.com/contrato',
    qs: query,
    json: true
  }
  return rp(options).catch(function(error) {
    console.log('request error');
  });
}

function extractEntities(results) {
  var entities = [];
  console.log('extracting from ' + results.length + ' contracts');
  var filteredResults = results.filter(function(result, index) {
    if (entities.indexOf(result.provedorContratista.id) === -1) {
      entities.push(result.provedorContratista.id);
      return true;
    } else {
      return false;
    }
  });

  var entities = filteredResults.map(function(result) {
    return {
      ctbookId: result.provedorContratista.id,
      name: result.provedorContratista.proveedor_contratista,
    }
  });

  console.log('extracted ' + entities.length + ' entities');
  return entities
}
