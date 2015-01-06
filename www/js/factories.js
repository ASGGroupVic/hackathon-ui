(function() {

	var app = angular.module('clientXray.factories', ['LocalStorageModule']);

	app.factory("LoginHelper", function(localStorageService){
  		var factory = {};
  		var currentUser = localStorageService.get('Email');

		factory.isLoggedIn = function() {
			return currentUser !== null;
		};

		factory.setUser = function(email) {
			localStorageService.set('Email', email);
			currentUser = email;
		};

		factory.getUser = function() {
			return currentUser;
		};
  		
  		return factory;
  	
  	});

  	app.factory("XrayMachine", function($http){
  		var factory = {};

		factory.updateMood = function(email, mood) {
			return $http({
				method : 'POST',
				url : 'http://hackathonapi-env.elasticbeanstalk.com/v1/consultant/' + email + "/mood",
				data : mood
			});
		};

		factory.getClientsForUser = function(searchType, email) {
			return $http({
				method : 'GET',
				url : 'http://hackathonapi-env.elasticbeanstalk.com/v1/'+ searchType.value +'/' + email + "/clients"
			});
		};
  		
		factory.getConsultantView = function(name) {
			return $http({
				method : 'GET',
				url : 'http://hackathonapi-env.elasticbeanstalk.com/v1/consultant/'+ name
			});
		};

  		return factory;
  	
  	});

	app.factory("consultantData", function(){
		var data = {
			consultant : []
		};

		return {
			getConsultant: function() {
				return data.consultant;
			},

			setConsultant: function(consultant) {
				data.consultant = consultant;
			}
		};

	});
})();