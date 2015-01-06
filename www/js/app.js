(function() {
	var app = angular.module("clientXray", ['clientXray.controllers', 'clientXray.directives', 'clientXray.factories', 'clientXray.graph']);

	angular.module("clientXray.controllers", []);
	angular.module("clientXray.directives", []);
	angular.module("clientXray.factories", []);
	angular.module("clientXray.graph", []);
	
	app.config(function (localStorageServiceProvider) {
	  localStorageServiceProvider
	    .setPrefix('xray');
	});

})();
