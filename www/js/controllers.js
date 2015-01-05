(function() {

	var app = angular.module('clientXray.controllers', ['clientXray.factories']);

	app.controller('NavigationController', function($scope, LoginHelper){
		// Determine if login page is required
		if(!LoginHelper.isLoggedIn()) {
			$scope.activePanel = "login";
		} else {
			$scope.activePanel = "updateMood";
		}

		$scope.setPanel = function(newPanel) {
			$scope.activePanel = newPanel;
		};

		$scope.isSet = function(panelName){
			return $scope.activePanel === panelName;
		};

		$scope.login = function(){
			// Add Email to local storage
			LoginHelper.setUser($scope.email);
			$scope.setPanel('updateMood');
		};
	});

	app.controller('UpdateMoodController', function($scope){
	    // Default panel here
	    $scope.newUpdate = {};
	    

	    $scope.updateMood = function(){
	    	var a = $scope.newUpdate.mood + ' ' + $scope.newUpdate.notes;
	    	console.log(a);
	    };
	});

	app.controller('SearchController', function($scope){

		$scope.search = function(selected, value){		
			console.log("Selected: " + selected + " Value: " + value);
		};

		$scope.searchResults = [{
			name :"Matt",
			client : "Telstra"
		},
		{
			name : "Shae",
			client : "ANZ"
		}];

	});

})();