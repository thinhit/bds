"use strict";

var ApiPath = "http://localhost:1337/api/v1/";
angular.module('app', 
	[
	'ui.router',
    'ngResource',
    'ngSanitize'
	]
)
/*.config(['$facebookProvider', function ($facebookProvider){
    $facebookProvider.setAppId(fb_sdk.appId);
    $facebookProvider.setPermissions(fb_sdk.permission);
}])
*/
.config(['$stateProvider',   '$urlRouterProvider',   '$controllerProvider',   '$compileProvider',   '$filterProvider',   '$provide', 
	function ($stateProvider,   $urlRouterProvider,   $controllerProvider,   $compileProvider,   $filterProvider,   $provide){
		$stateProvider
            .state('app', {
                url: '/',
                templateUrl: 'views/app.html',
                /*controller: 'AppController'*/
            })
            


}])
.run(['$rootScope', '$auth', '$state', '$stateParams', '$templateCache', function ($rootScope, $auth, $state, $stateParams, $templateCache){
    
    $rootScope.user         = $auth.getUser() || false;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$state       = $state;


/*    $rootScope.$on('$stateChangeStart', function (evt,toState,toParams) {
        if(toState.name.indexOf('app') !== -1){
            
            if(!$auth.getUser()){
                console.log('$stateChangeStart', $auth.getUser());
                evt.preventDefault();
                $auth.clearUser();
                $state.go('login');
            }
        }
    });
*/



    $auth.setToken();
	

}])