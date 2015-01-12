(function() {
	var app = angular.module("clientXray", ['ngRoute', 'clientXray.controllers', 'clientXray.directives', 'clientXray.factories', 'clientXray.graph']);

	angular.module("clientXray.controllers", []);
	angular.module("clientXray.directives", []);
	angular.module("clientXray.factories", []);
	angular.module("clientXray.graph", []);

    app.config(function(localStorageServiceProvider, $routeProvider, $locationProvider) {
        // configure local storage settings
        localStorageServiceProvider.setPrefix('xray');

        // configure our routes
        $routeProvider
            // route for the home/update-mood page
            .when('/', {
                templateUrl : 'update-mood.html',
                controller  : 'UpdateMoodController'
            })
            // route for the search page
            .when('/search', {
                templateUrl : 'search.html',
                controller  : 'SearchController'
            })
            // route for the login page
            .when('/login', {
                templateUrl : 'login.html',
                controller  : 'NavigationController'
            })
            // route for the consultant view page
            .when('/consultant/:email', {
                templateUrl : 'consultant-view.html',
                controller  : 'ConsultantViewController'
            })
            // route for the client view page
            .when('/client/:code', {
                templateUrl : 'client-view.html',
                controller  : 'ClientViewController'
            })
            .otherwise({redirectTo:'/'});

        $locationProvider.html5Mode(true);

    })
    .run(function($location, LoginHelper) {
    	// If user is not logged in they should be redirected to login page
    	if(!LoginHelper.isLoggedIn()) {
    		$location.path('/login');
    	}
    });

})();