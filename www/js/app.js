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

	app.controller('NavigationController', function($scope){
	    // Default panel here
	    $scope.activePanel = "login";
	    
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
  	
})();