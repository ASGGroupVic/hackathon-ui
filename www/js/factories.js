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

		factory.logout = function() {
			currentUser = null;
			localStorageService.remove('Email');
		};
  		
  		return factory;
  	
  	});

  	app.factory("XrayMachine", function($http){
  		var factory = {};
  		var host = "http://hackathonapi-env.elasticbeanstalk.com/v1/";

		factory.updateMood = function(email, mood) {
			return $http({
				method : 'POST',
				url : host + 'consultant/' + email + "/mood",
				data : mood
			});
		};

		factory.getClientsForUser = function(email) {
			return $http({
				method : 'GET',
				url : host + 'consultant/' + email + "/clients"
			});
		};
  		
		factory.searchConsultant = function(email) {
			console.log('search consultant by email : ' + email);
			return $http({
				method : 'GET',
				url : host + 'consultant/search/'+ email
			});
		};

		factory.searchClient = function(name) {			
			return $http({
				method : 'GET',
				url : host + 'client/search/'+ name
			});
		};

		factory.getConsultant = function(email) {
			console.log('search consultant by email : ' + email);
			return $http({
				method : 'GET',
				url : host + 'consultant/'+ email
			});
		};

		factory.getConsultantMood = function(email) {
			console.log('search consultant mood by email : ' + email);
			return $http({
				method : 'GET',
				url : host + 'consultant/'+ email + "/mood"
			});
		};

		factory.getConsultantMoodBriefHistory = function(email) {
			return $http({
				method : 'GET',
				url : host + 'consultant/'+ email + "/last5mood"
			});
		};

		factory.getClient = function(clientCode) {
			return $http({
				method : 'GET',
				url : host + 'client/' + clientCode
			});
		};

		factory.getClientConsultants = function(clientCode) {
			return $http({
				method : 'GET',
				url : host + 'client/' + clientCode + "/consultants"
			});
		};

		factory.getClientMood = function(clientCode) {
			return $http({
				method : 'GET',
				url : host + 'client/' + clientCode + "/mood"
			});
		};

  		return factory;
  	});

	app.factory("data", function(){
		var data = {
			consultantMood : null,
			client : null,
			clientMood : null,
			clientConsultants : null,
			consultant : null
		};

		return {
			getConsultantMood: function() {
				return data.consultantMood;
			},

			setConsultantMood: function(consultantMood) {
				data.consultantMood = consultantMood;
			},

			getConsultant: function() {
				return data.consultant;
			},

			setConsultant: function(consultant) {
				data.consultant = consultant;
			},


			getClient: function() {
				return data.client;
			},

			setClient: function(client) {
				data.client = client;
			},

			getClientMood: function() {
				return data.clientMood;
			},

			setClientMood: function(clientMood) {
				data.clientMood = clientMood;
			},

			getClientConsultants: function() {
				return data.clientConsultants;
			},

			setClientConsultants: function(clientConsultants) {
				data.clientConsultants = clientConsultants;
			}

		};

	});
})();
