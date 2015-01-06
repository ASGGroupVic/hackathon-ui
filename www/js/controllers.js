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
			console.log("new Panel : " + newPanel);
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

	app.controller('UpdateMoodController', function($scope, XrayMachine, LoginHelper){
	    // Default panel here
	    $scope.newUpdate = {};
	    $scope.successNotify = false;
	    
	    $scope.closeNotfication = function() {
	    	$scope.successNotify = false;
	    };

	    $scope.updateMood = function(){
			var moodObject = { mood: $scope.newUpdate.mood, notes : $scope.newUpdate.notes};
			var email = LoginHelper.getUser();
			XrayMachine.updateMood(email, moodObject).success(function(){
				// Mood has been successfully sent to API
				$scope.newUpdate.notes = null;
				$scope.successNotify = true;
			});
		};
  	});

	app.controller('SearchController', function($scope, XrayMachine, consultantData) {

		$scope.searchList = [
        	{ field: 'Consultant', value: 'consultant'},
        	{ field: 'Client', value: 'client'},
        	{ field: 'Mood', value: 'mood'}];
        $scope.selected = $scope.searchList[0];

	    $scope.search = function(selected, value){		
 			console.log("Selected: " + selected.value + " Value: " + value);
 			XrayMachine.getClientsForUser(selected, value).success(function(data){			
 				$scope.searchResults = data;
 				//$scope.searchResults = [{name:'test'},{name:'test1'}];
			});
		};

	    $scope.viewConsutlant = function(name){
			var consultant = XrayMachine.getConsultant(name);
			consultantData.setConsultant(consultant);
			$scope.setPanel('consultantView');
		};	

	});

	app.controller('ConsultantViewController', function($scope, consultantData) {
		$scope.$watch(
			function () { 
				return consultantData.getConsultant(); 
			},
			function (newValue) {
        		if (newValue) 
        			$scope.consultants = newValue;
    		}
    	);
	}); 

})();
