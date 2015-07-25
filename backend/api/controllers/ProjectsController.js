/**
 * ProjectsController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	createProject : function (req, res, next){
		var params = req.body;
		var user   = req.user;
		if(!user){
			return res.json({
				'error': true,
				'error_message': 'Bạn không có quyền thực hiện hành động này'
			}, 403);
		}
		if(req.method == 'GET'){
			return res.json({
				'error': true,
				'error_message': 'Không hỗ trợ phương thức GET'
			});
		}
/*		try	{
			Projects.validate({
				'title' 		: {required: true},
				'content'  		: {required: true},
				'user'  		: {required: true},
				'city' 			: {required: true},
				'district' 		: {required: true},
				'address' 		: {required: true},
				'area' 			: {required: true},
				'amount' 		: {required: true},
				'discount' 		: {required: true},
				'discount_type' : {required: true},
			});
		}catch (errors){
			return res.json({
				'error' 		: true,
				'message'		: errors,
				'error_message' : 'Các trường dữ liệu gửi lên không đúng'
			});
		}
*/
		params['user']   = user.id;
		params['active'] = true;
		Projects.create(params).exec(function (err, resp){
			if(err){
				return res.json({
					'error' 		: true,
					'message'		: err,
					'error_message' : 'Lỗi truy vấn, vui lòng liên hệ BQT'
				});
			}
			return res.json({
				'error' 		: false,
				'message'		: "",
				'error_message' : 'Thêm dự án thành công',
				'data'			: resp
			})
		})
	},
	show: function (req, res, next){
		var params 			= req.query,
		 	user   			= req.user,
		 	id 				= params.id || 0,
		 	item_page 		= params.item_page || 20,
		 	page 			= params.page || 1;
		 	discount_type 	= params.discount_type || 0;

		if(!user){
			return res.json({
				'error': true,
				'error_message': 'Bạn không có quyền thực hiện hành động này'
			}, 403);
		}
		if(req.method !== 'GET'){
			return res.json({
				'error': true,
				'error_message': 'Không hỗ trợ phương thức'
			});
		}
		
		var query = {
			where: {}
		};

		if(discount_type){
			query.where['discount_type'] = discount_type;
		}
		Projects.count(query, function (err, total){
			var chain = Projects.find(query).populate('city').populate('district').paginate({'page': page, 'limit': item_page});
				chain.exec(function (err, projects){
					if(err){
						return res.json({
							'error' 		: true,
							'message'		: err,
							'error_message' : 'Lỗi truy vấn, vui lòng thử lại hoặc liên hệ BQT'
						});
					}else {
						return res.json({
							'error' 		: false,
							'message'		: "",
							'error_message' : 'Thành công',
							'data'			: projects,
							'total'			: total
						})
					}
				});
		});
		
	},
	uploadPicture: function (req, res, next){
		if(req.method === 'GET'){
			return res.json({
				'error': true,
				'error_message': 'Không hỗ trợ phương thức GET'
			});
		}

		var uploadFile = req.file('file');
	    uploadFile.upload({ dirname: '../../assets/images/uploads', maxBytes: 1000000 }, function onUploadComplete (err, files) {				
	    	if (err) return res.serverError(err);
	    	res.json({status:200,file:files});
	    });
	}
};

