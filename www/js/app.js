(function() {
	var app = angular.module("clientXray", ['LocalStorageModule']);

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

	app.directive("searchResults", function() {
		return {
			restrict: 'E',
			templateUrl: 'search-results.html'
		};
	});

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
 			console.log("Selected: " + selected.field + " Value: " + value);
		};

		 $scope.searchList = [
        	{ field: 'Consultant'},
        	{ field: 'Client'},
        	{ field: 'Mood'},];

    	$scope.selected = $scope.searchList[0];

	    $scope.searchResults = [{
	    		name :"Matt",
	    		client : "Telstra"
		    },
		    {
		    	name : "Shae",
	    		client : "ANZ"
		    }];
    
  	});

	app.factory("LoginHelper", function(localStorageService){
  		var factory = {};
  		var currentUser = localStorageService.get('Email');

		factory.isLoggedIn = function() {
			return currentUser != null;
		};

		factory.setUser = function(email) {
			localStorageService.set('Email', email);
			currentUser = email;
		};

		factory.getUser = function() {
			return currentUser;
		}
  		
  		return factory;
  	
  	});

  	app.factory("XrayMachine", function($http){
  		var factory = {};

		factory.updateMood = function(email, mood) {
			return $http({
				method : 'POST',
				url : 'v1/consultant/email/' + email + "/mood",
				headers : headerObj,
				data : mood
			});
		};

		factory.getClientsForUser = function(email) {
			return $http({
				method : 'GET',
				url : 'v1/consultant/email/' + email + "/clients",
				headers : headerObj
			});
		};
  		
  		return factory;
  	
  	});

})();