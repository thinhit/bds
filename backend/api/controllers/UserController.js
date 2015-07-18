/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	signup: function (req, res, next){
		if(req.body){
			var username  = req.body.username,
				password  = req.body.password,
				fullname  = req.body.fullname;

			User.findOne({username: username}, function (err, doc){
				if(err){return res.json({'error': true, 'message': "SERVER.ERROR", 'data': []})}
				if(doc){return res.json({'error': true, 'message': "USER.EXITS", 'data': []})}

				User.create({
					username	: username,
					password	: password,
					fullname	: fullname,
				}).exec(function (err, created){
					return res.json({
						error	: (err) ? true : false,
						message	: (err) ? err : "SUCCESS",
						data 	: created || {}
					})
					}
				);
			})
		}else {
			return res.json({
				error: true,
				message: "METHOD.NOT.ALLOW",
				data: []
			});
		}
		
	},

	signin: function (req, res, next){
		if(req.body){
			var username = req.body.username,
				password = req.body.password;

			UserService.hasUsername(username, function (has, user){
				if(has){
					UserService.comparePassword(password, user.password, function (err, isMatch){
						if(err ||  !isMatch){
							return res.json({'error': true, 'message': "PASSWORD.NOT.MATCH", 'data': []});
						}

						var token = UserService.generationToken(user);
						return res.json({
							"error"		: false,
							"message"	: "SUCCESS",
							"data"		: {
								token: token,
								user: {
									fullname: user.fullname,
									username: user.username
								}
							}
						})
					})
				}else {
					return res.json({'error': true, 'message': "USER.EXITS", 'data': []});
				}
			})
		}else {
			return res.json({
				error: true,
				message: "METHOD.NOT.ALLOW",
				data: []
			});	
		}

		
	}
	
};

