var bcrypt 	= require('bcrypt');

module.exports = {
	attributes: {
		device_id	: {type: 'string', unique: true, required: true},
		username	: {type: 'string', unique: true, required: true},
		password 	: {type: 'string', required: true},
		fullname	: {type: 'string', required: true},
		last_login 	: {type: 'integer'}, // Use timestamp
	},
	// Hook on user create
	beforeCreate: function (value, next){
		bcrypt.hash(value.password, 11, function(err, hash) {
      		if(err) return next(err);
      		value.password = hash;
      		//value.createAt = Math.floor(new Date().getTime() /1000);
      		next();
    	});
	},
	beforeUpdate: function (value, next){
		//value.updateAt = Math.floor(new Date().getTime() /1000);
		next();
	},
	comparePassword: function (password, cb){
		bcrypt.compare(password, this.password, function(err, isMatch) {
	        if (err) return cb(err);
	        cb(null, isMatch);
    	});
	}
};

