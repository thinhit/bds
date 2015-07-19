angular.module('app')
	.controller('LoginCtrl', ['$scope', '$state', '$stateParams', '$restful', '$auth', function ($scope, $state, $stateParams, $restful, $auth){
		$scope.loginProcessing = false;
		$scope.loginErr = "";
		$scope.login = function (email, password, remember){
			if(!email){
				$scope.loginErr = "Vui lòng nhập email của bạn";
				return ;
			}

			if(!password){
				$scope.loginErr = "Vui lòng nhập mật khẩu của bạn";
				return ;
			}
			$scope.loginProcessing = true;
			$restful.post('user/signin', {username: email, password: password}, function (err, resp){
				$scope.loginProcessing = false;
				if(err){
					$scope.loginErr = "Sai thông tin đăng nhập, vui lòng thử lại";
					return ;
				}
				$auth.setUser(resp.data);
				$state.go('app')
			})
		}
	}])