/**
* Transactions.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	transaction_id 			: {type: 'integer', autoIncrement: true, defaultsTo: function (){return 1}},
  	project 				: {model: 'projects', required: true},
  	user 					: {model: 'user', required: true},  // ID
  	user_accept 			: {model: 'user', required: true}, //  Người xác thực order 
  	time_accept 			: {type: 'date'}, // Thời gian xác thực
  	type 					: {type: 'string', required: true},
  	project_discount 		: {type: 'string', required: true}, // Số tiền giảm giá, hoặc %
  	project_amount 			: {type: 'string', required: true}, // Tổng tiền dự án
  	project_discount_type 	: {type: 'string', required: true}, // Kiểu giảm giá số tiền cố định hoặc %
  	note 					: {type: 'string'}, // Kiểu giảm giá số tiền cố định hoặc %
  	status 					: {type: 'string', required: true, enum: ['PENDING', 'PROCESSING', 'SUCCESS', 'FAIL']}, // 
  }
};

