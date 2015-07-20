"use strict";

var ApiPath = "http://localhost:1337/api/v1/";
angular.module('app', 
	[
	'ui.router',
    'ngResource',
    'ngSanitize'
	]
)

.config(['$stateProvider',   '$urlRouterProvider',   '$controllerProvider',   '$compileProvider',   '$filterProvider',   '$provide', 
	function ($stateProvider,   $urlRouterProvider,   $controllerProvider,   $compileProvider,   $filterProvider,   $provide){
        $urlRouterProvider
            .otherwise('login');
		$stateProvider
            .state('app', {
                url: '/',
                templateUrl: 'views/app.html',
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .state('register', {
                url: '/register?refer',
                templateUrl: 'views/register.html',
                controller: 'LoginCtrl'
            })

}])
.run(['$rootScope', '$auth', '$state', '$stateParams', '$templateCache', function ($rootScope, $auth, $state, $stateParams, $templateCache){
    
    $rootScope.user         = $auth.getUser() || false;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$state       = $state;


    $rootScope.$on('$stateChangeStart', function (evt,toState,toParams) {
        if(toState.name.indexOf('app') !== -1){
            
            if(!$auth.getUser() || $auth.getUser()['time_expired']  <= (Date.now() / 1000) ){
                console.log('$stateChangeStart', $auth.getUser());
                evt.preventDefault();
                $auth.clearUser();
                $state.go('login');
            }
        }
    });

    $auth.setToken();
	

}])