angular.module('app')
	.controller('CreateProjectCtrl', ['$scope', '$state', '$stateParams', '$restful', '$auth', 'App', 'Upload','toaster', 
	  function ($scope, $state, $stateParams, $restful, $auth, App, Upload, toaster){

		$scope.list_city  	 = [];
		$scope.list_district = [];
		$scope.frm 			 = {
			discount_type 	: 1
		};
		$scope.submit_btn    = false;


		$scope.loadCities = function (){
			App.getCities(function (err, resp){
				if(!err){
					$scope.list_city  = resp.data;
				}
			})
		}

		$scope.loadDistrict = function (id){
			angular.forEach($scope.list_city, function (value){
				if(value.id == id){
					App.getDistricts(value.city_code, function (err , resp){
						if(!err){
							$scope.list_district  = resp.data;
						}
					})
					return;
				}
			})
		}

		$scope.$watch('files', function () {
        	$scope.upload($scope.files);

    	});

		$scope.upload = function (files) {
		    if (files && files.length) {
		        for (var i = 0; i < files.length; i++) {
		            var file = files[i];
		            Upload.upload({
		                url: ApiPath+ 'projects/uploadPicture',
		                fields: {},
		                file: file
		            }).progress(function (evt) {
		                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
		            }).success(function (data, status, headers, config) {
		                console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
		            }).error(function (data, status, headers, config) {
		                console.log('error status: ' + status);
		            })
		        }
		    }
		};

		$restful.get('projects/show',  function (error, resp){
				
				if(error){
					toaster.pop('warning', 'Lỗi', error);
				}else {
					toaster.pop('success', 'Thông báo', 'Đăng dự án thành công');
				}
			})

		$scope.create = function (frm){
			$scope.submit_btn = true;
			$restful.post('projects/createProject', frm, function (error, resp){
				$scope.submit_btn = false;
				if(error){
					toaster.pop('warning', 'Lỗi', error);
				}else {
					toaster.pop('success', 'Thông báo', 'Đăng dự án thành công');
				}
			})
		}
		$scope.loadCities();
	}])

.controller('ListProjectCtrl', ['$scope', '$state', '$stateParams', '$restful', '$auth', 'App', 'Upload','toaster', 
	  function ($scope, $state, $stateParams, $restful, $auth, App, Upload, toaster){

		$scope.item_page   = 20;
		$scope.total       = 0;
		$scope.currentPage = 1;
		$scope.loadingData = true;

		$scope.list_projects = [];

	  	$scope.load = function (){
	  		$scope.loadingData = true;
	  		$restful.get('projects/show', {page: $scope.currentPage, item_page: $scope.item_page},  function (error, resp){
	  			$scope.loadingData = false;
				if(error){
					toaster.pop('warning', 'Lỗi', error);
				}else {
					$scope.total         = resp.total;
					$scope.list_projects = resp.data;
				}
			})
	  	}

	  	$scope.load();
		
	}])