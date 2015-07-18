/**
* Customers.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	user 	 : {model: 'user', required: true},
  	fullname : {type: 'string', required: true},
  	phone 	 : {type: 'string', required: true},
  	email 	 : {type: 'email', required: true},
  	address  : {type: 'string', required: true},
  	city 	 : {model: 'cities', required: true},
  	district : {model: 'districts', required: true},
  	note  : {type: 'string', required: true},
  }
};

