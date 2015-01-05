(function() {
	var app = angular.module("clientXray", []);

	app.directive("menuBar", function() {
		return {
			restrict: 'E',
			templateUrl: '../menu-bar.html'
		};
	});

	app.directive("searchResults", function() {
		return {
			restrict: 'E',
			templateUrl: '../search-results.html'
		};
	});

	app.controller('NavigationController', function($scope){
	    // Default panel here
	    $scope.activePanel = "updateMood";
	    
	    $scope.setPanel = function(newPanel) {
	      $scope.activePanel = newPanel;
	    };
	    
	    $scope.isSet = function(panelName){
	      return $scope.activePanel === panelName;
	    };
    
  	});

  	app.controller('SearchController', function($scope){
	    $scope.searchResults = [{
	    		name :"Matt",
	    		client : "Telstra"
		    },
		    {
		    	name : "Shae",
	    		client : "ANZ"
		    }];
    
  	});

  	app.factory("XrayMachine", function($http){
  		var factory = {};

		factory.updateMood = function(user, mood) {
			return $http({
				method : 'POST',
				url : 'domain/user/' + user,
				headers : headerObj,
				data : mood
			});
		};

		factory.getClientsForUser = function(id) {
			return $http({
				method : 'GET',
				url : 'domain/getclientfunction/' + id,
				headers : headerObj,
				data : mood
			});
		};
  		
  		return factory;
  	
  	});

})();