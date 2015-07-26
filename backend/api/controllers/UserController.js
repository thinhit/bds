/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	signup: function (req, res, next){
		if(req.body){
			var email    = req.body.username,
				password = req.body.password,
				fullname = req.body.fullname;
				phone    = req.body.phone;
				refer    = req.body.refer;

			var messageErr = "";
			if(!email){messageErr = "Vui lòng nhập email"}
			if(!password){messageErr = "Vui lòng nhập mật khẩu"}
			if(!fullname){messageErr = "Vui lòng nhập họ tên"}
			if(!phone){messageErr = "Vui lòng nhập số điện thoại"}

			if(messageErr && messageErr !== ""){
				return res.json({'error': true, 'error_message': messageErr, 'data': []});
			}

			User.findOne({email: email}, function (err, doc){
				if(err){return res.json({'error': true, 'error_message': "SERVER.ERROR", 'data': []})}
				if(doc){return res.json({'error': true, 'error_message': "USER.EXITS", 'data': []})}

				var data = {
					email		: email,
					password	: password,
					fullname	: fullname,
					phone    	: phone
				};
				if(refer){
					data['refer'] = refer;
				}

				User.create(data).exec(function (err, created){
					return res.json({
						error	: (err) ? true : false,
						error_message	: (err) ? err : "SUCCESS",
						data 	: created || {}
					})
				});
			})
		}else {
			return res.json({
				error: true,
				error_message: "METHOD.NOT.ALLOW",
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
							return res.json({'error': true, 'error_message': "PASSWORD.NOT.MATCH", 'data': []});
						}

						var token = UserService.generationToken(user);
						console.log('user', user);
						return res.json({
							"error"		: false,
							"error_message"	: "SUCCESS",
							"data"		: {
								token: token,
								user: {
									id	: user.id,
									fullname: user.fullname,
									email: user.email,
									privilige: user.privilige || 1 
								}
							}
						})
					})
				}else {
					return res.json({'error': true, 'error_message': "USER.EXITS", 'data': []});
				}
			})
		}else {
			return res.json({
				error: true,
				error_message: "METHOD.NOT.ALLOW",
				data: []
			});	
		}
	},
	validRefer : function (req, res, next){
		var email = req.query.refer;
		UserService.hasUsername(email, function (has, user){
			if(has){
				return res.json({'error': false, 'error_message': "Người giới thiệu hợp lệ", 'data': {code: user.id}});
			}
			return res.json({'error': true, 'error_message': "Người giới thiệu không hợp lệ", 'data': []});
		});
	}
	
};

