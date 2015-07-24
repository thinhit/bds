"use strict";

var ApiPath = "http://localhost:1337/api/v1/";
angular.module('app', 
	[
	'ui.router',
    'ngResource',
    'ngSanitize',
    'textAngular',
    'ngFileUpload',
    'toaster'
	]
)

.config(['$stateProvider',   '$urlRouterProvider',   '$controllerProvider',   '$compileProvider',   '$filterProvider',   '$provide', 
	function ($stateProvider,   $urlRouterProvider,   $controllerProvider,   $compileProvider,   $filterProvider,   $provide){
        $urlRouterProvider
            .otherwise('dat-lenh/danh-sach');
		$stateProvider
            .state('app', {
                abstract:true, 
                url: '/',
                templateUrl: 'views/app.html',
            })
            .state('login', {
                url: '/dang-nhap',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .state('register', {
                url: '/dang-ky?refer',
                templateUrl: 'views/register.html',
                controller: 'LoginCtrl'
            })

            .state('app.commands', {
                abstract: true,
                url: 'dat-lenh',
                templateUrl: 'views/commands/index.html',
            })

            .state('app.commands.list', {
                url: '/danh-sach',
                templateUrl: 'views/commands/list.html',
            })

            .state('app.commands.create', {
                url: '/tao',
                templateUrl: 'views/commands/create.html',
            })

            .state('app.projects', {
                abstract: true,
                url: 'du-an',
                templateUrl: 'views/projects/index.html',
            })

            .state('app.projects.list', {
                url: '/danh-sach',
                templateUrl: 'views/projects/list.html',
            })

            .state('app.projects.create', {
                url: '/tao-du-an',
                templateUrl: 'views/projects/create.html',
                controller: 'CreateProjectCtrl'
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