(function() {

	var app = angular.module('clientXray.directives', []);

	app.directive("menuBar", function() {
		return {
			restrict: 'E',
			templateUrl: 'menu-bar.html'
		};
	});
	
})();