/**
 * Category.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	tag : {
  		type : 'string',
  		index : true,
  		primaryKey : true,
  		required : true
  	},
  	label : {
  		type : 'string',
  		required : true
  	},
    links : {
      collection : 'link',
      via : 'category'
    }
  }
};

