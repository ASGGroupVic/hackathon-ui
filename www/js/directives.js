(function() {

	var app = angular.module('clientXray.directives', []);

	app.directive("menuBar", function() {
		return {
			restrict: 'E',
			templateUrl: 'menu-bar.html'
		};
	});

	app.directive("updateMood", function() {
		return {
			restrict: 'E',
			templateUrl: 'update-mood.html'
		};
	});

	app.directive("login", function() {
		return {
			restrict: 'E',
			templateUrl: 'login.html'
		};
	});

	app.directive("search", function() {
		return {
			restrict: 'E',
			templateUrl: 'search.html'
		};
	});

	app.directive("consultantView", function() {
		return {
			restrict: 'E',
			templateUrl: 'consultant-view.html'
		};
	});

	app.directive("clientView", function() {
		return {
			restrict: 'E',
			templateUrl: 'client-view.html'
		};
	});
})();