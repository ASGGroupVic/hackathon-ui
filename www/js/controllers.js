(function() {

	var app = angular.module('clientXray.controllers', ['clientXray.factories', 'clientXray.graph']);

	app.controller('NavigationController', function($scope, $location, LoginHelper, NotificationHelper) {
		// Make sure dropdown menu closes itselt upon item click
		angular.element(document).ready(function () {
			$('.navbar-collapse a').click(function(){
			    $(".navbar-collapse").collapse('hide');
			});		    
		});
		
		// Only show menu if user is logged in
		$scope.$watch(
			function () { 
				return LoginHelper.isLoggedIn(); 
			},
			function (newValue) {
        		$scope.showMenu = newValue;
    		}
    	);

    	$scope.$watch(
			function () { 
				return NotificationHelper.isVisible(); 
			},
			function (newValue) {
        		$scope.notify = NotificationHelper.getNotification();
        		console.log($scope.notify.strongText);
    		}
    	);

    	$scope.closeNotfication = function() {
    		NotificationHelper.closeNotification();
    	};

		// Set current path each time page is changed
    	$scope.$on('$locationChangeSuccess', function(event) {
    		console.log('URL change to ' + $location.path());
    		$scope.currentPath = $location.path();
    	});

    	$scope.isSet = function(value) {
    		return $scope.currentPath === value;
    	};

		$scope.login = function(){
			// Add Email to local storage
			LoginHelper.setUser($scope.email);
			$location.path('/');
		};

		$scope.logout = function() {
			LoginHelper.logout();
			$location.path('/login');
		};
	});

	app.controller('UpdateMoodController', function($scope, XrayMachine, LoginHelper, NotificationHelper){
	    // Default panel here
	    $scope.newUpdate = {};

		XrayMachine.getClientsForUser(LoginHelper.getUser()).success(function(data){			
			$scope.clientsForUser = data;
			if (data[0]) {
				$scope.newUpdate.client = data[0].clientCode;
			}
			else {
				$scope.newUpdate.client = 'bench';
			}
		});

		XrayMachine.getConsultantMoodBriefHistory(LoginHelper.getUser()).success(function(data){			
			if (data[0]) {
				$scope.moodHistory = data;
			}
		});

	    $scope.getHashtags = function(){
			var regex = /#[^\s]+/g;

			var matches = [];
			var match = regex.exec($scope.newUpdate.notes);
			while (match !== null) {
			    matches.push(match[0].replace("#", ""));
			    match = regex.exec($scope.newUpdate.notes);
			}
			return matches.join(",");
	    };

	    $scope.updateMood = function(){
	    	var tagsList = $scope.getHashtags();
			var moodObject = { mood: $scope.newUpdate.mood, notes : $scope.newUpdate.notes, client : $scope.newUpdate.client, tags : tagsList };
			var email = LoginHelper.getUser();
			XrayMachine.updateMood(email, moodObject).success(function(){
				// Mood has been successfully sent to API
				$scope.newUpdate.notes = null;
				NotificationHelper.showNotification("You're Awesome", "You've just updated your mood!");
			});
		};
  	});

	app.controller('SearchController', function($scope, XrayMachine, $location, MoodValues) {

		$scope.searchType = '';
		$scope.searchList = [
        	{ field: 'Consultant', value: 'consultant'},
        	{ field: 'Client', value: 'client'},
        	{ field: 'Mood', value: 'mood'}];
        $scope.selected = $scope.searchList[0];

	    $scope.search = function(selected, value){		
 			console.log("Selected: " + selected.value + " Value: " + value);
 			$scope.searchType = selected.value;

 			if(selected.value === "consultant") {
 				XrayMachine.searchConsultant(value).success(function(data){			
 					$scope.searchResults = data;
				});
 			}
 			else if(selected.value === "client") {
 				console.log('search for client');
 				XrayMachine.searchClient(value).success(function(data){			
 					$scope.searchResults = data;
				}); 				
 			}		
		};

	    $scope.viewConsutlant = function(email){
			$location.path('/consultant/' + email);
		};	

	    $scope.viewClient = function(clientCode){
			$location.path('/client/'+clientCode);
		};

		$scope.isViewForClients = function() {
			return $scope.searchType === 'client';
		};

		$scope.isViewForMood = function() {
			return $scope.searchType === 'mood';
		};	

		$scope.isViewForConsultant = function() {
			return $scope.searchType === 'consultant';
		};	

	});

	app.controller('ConsultantViewController', function($scope, XrayMachine, Grapher, $routeParams) {
		var init = function () {
            console.log("ConsultantView Initialising...");

            var email = $routeParams.email;

            XrayMachine.getConsultant(email).success(function(consultantData) {
            	$scope.consultant = consultantData;
        	});

			XrayMachine.getConsultantMood(email).success(function(moodData) {
            	$scope.consultantMood = moodData;
				Grapher.createGraph(moodData);
        	});
        };

        // fire on controller loaded
        init();

	});

	app.controller('ClientViewController', function($scope, XrayMachine, MoodValues, $routeParams, $location) {
		var init = function () {
            console.log("ClientView Initialising...");

            // Get the client code from the route paramater
            var clientCode = $routeParams.clientCode;

            // Fetch data from the server using the client code
            XrayMachine.getClient(clientCode).success(function(clientData) {
				$scope.client = clientData;
			});

			XrayMachine.getClientMood(clientCode).success(function(clientMoodData) {
				$scope.clientMood = clientMoodData;

				var totalCount = 0;
				var moodCount = 0;
				for(var index = 0; index < clientMoodData.length; index++) {
					var mood = clientMoodData[index];
					console.log("Mood: " + angular.toJson(mood));
					totalCount += mood.count;
					moodCount += mood.count * MoodValues.getMoodValue((mood['mood.name']));
				}
				$scope.overallClientMood = moodCount/totalCount;
				console.log("Overall Mood: " + $scope.overallClientMood);
			});

			XrayMachine.getClientConsultants(clientCode).success(function(clientConsultantsData) {
				$scope.clientConsultants = clientConsultantsData;
			});									
        };

        // fire on controller loaded
        init();

	    $scope.viewConsultant = function(email){
			$location.path('/consultant/'+email);
		};			
	});
})();
