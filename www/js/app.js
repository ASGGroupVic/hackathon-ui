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
                templateUrl : 'html/update-mood.html',
                controller  : 'UpdateMoodController'
            })
            // route for the search page
            .when('/search', {
                templateUrl : 'html/search.html',
                controller  : 'SearchController'
            })
            // route for the login page
            .when('/login', {
                templateUrl : 'html/login.html',
                controller  : 'NavigationController'
            })
            // route for the consultant view page
            .when('/consultant/:email', {
                templateUrl : 'html/consultant-view.html',
                controller  : 'ConsultantViewController'
            })
            // route for the client view page
            .when('/client/:clientCode', {
                templateUrl : 'html/client-view.html',
                controller  : 'ClientViewController'
            })
            // route for the skills page
            .when('/skills', {
                templateUrl : 'html/skills.html',
                controller  : 'SkillsController'
            })// route for the skills page
            .when('/add-opportunity', {
                templateUrl : 'html/add-opportunity.html',
                controller  : 'AddOpportunityController'
            })
            .otherwise({redirectTo:'/'});

        //$locationProvider.html5Mode(true);

    })
    .run(function($location, LoginHelper) {
    	// If user is not logged in they should be redirected to login page
    	if(!LoginHelper.isLoggedIn()) {
    		$location.path('/login');
    	}
    });

})();