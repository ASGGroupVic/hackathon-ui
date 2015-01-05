(function() {
	var app = angular.module("clientXray", ['clientXray.controllers', 'clientXray.directives', 'clientXray.factories']);

	angular.module("clientXray.controllers", []);
	angular.module("clientXray.directives", []);
	angular.module("clientXray.factories", []);
	
	app.config(function (localStorageServiceProvider) {
	  localStorageServiceProvider
	    .setPrefix('clientXray');
	});

})();