	/**
* Projects.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	title 	: {type: 'string', required: true},
  	except 	: {type: 'string'},
  	content : {type: 'string'},
  	user 	: {model: 'user', required: true},
  	address : {type: 'string', required: true},
  	city 	: {model: 'cities', required: true},
  	district: {model: 'districts', required: true},
  	area 	: {type: 'string', required: true},
  	amount 	: {type: 'integer', required: true},
  	discount_amount : {type: 'integer', required: true},
  	discount_type : {type: 'string', required: true},
    active : {type: 'boolean', required: true},

  }
};

