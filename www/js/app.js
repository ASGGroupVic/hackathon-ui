(function() {
	var app = angular.module("clientXray", []);

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

	app.controller('NavigationController', function($scope){
	    // Default panel here
	    $scope.activePanel = "updateMood";
	    
	    $scope.setPanel = function(newPanel) {
	      $scope.activePanel = newPanel;
	    };
	    
	    $scope.isSet = function(panelName){
	      return $scope.activePanel === panelName;
	    };
    
	    $scope.login = function(){
	      return $scope.setPanel('updateMood');
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

  	app.controller('SearchController', function($scope, XrayMachine){

	    $scope.search = function(selected, value){		
 			console.log("Selected: " + selected + " Value: " + value);
 			XrayMachine.getClientsForUser(selected, value).success(function(data){
 				console.log('Hooray!');
 				console.log(data);});
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

  	app.factory("XrayMachine", function($http){
  		var factory = {};

		factory.updateMood = function(email, mood) {
			return $http({
				method : 'POST',
				url : 'v1/consultant/email/' + user + "/mood",
				headers : headerObj,
				data : mood
			});
		};

		factory.getClientsForUser = function(searchType, email) {
			return $http({
				method : 'GET',
				//eg: http://hackathonapi-env.elasticbeanstalk.com/v1/consultant/david.carroll@smsmt.com/clients
				url : 'http://hackathonapi-env.elasticbeanstalk.com/v1/'+ searchType +'/' + email + "/clients",
				//headers : headerObj
			});
		};
  		
  		return factory;
  	
  	});

})();