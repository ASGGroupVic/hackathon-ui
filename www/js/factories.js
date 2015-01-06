(function() {

	var app = angular.module('clientXray.factories', ['LocalStorageModule']);

	app.factory("LoginHelper", function(localStorageService){
  		var factory = {};
  		var currentUser = localStorageService.get('Email');
  		var loginHandler = null;

		factory.isLoggedIn = function() {
			return currentUser !== null;
		};

		factory.setUser = function(email) {
			localStorageService.set('Email', email);
			currentUser = email;
			if(loginHandler !== null) {
				loginHandler();
			} 
		};

		factory.getUser = function() {
			return currentUser;
		};

		factory.logout = function() {
			currentUser = null;
			localStorageService.remove('Email');
		};

		factory.attachLoginCallback = function(callback) {
			loginHandler = callback;
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
			consultantMood : [],
			client : [],
			clientMood : [],
			clientConsultants : []
		};

		return {
			getConsultantMood: function() {
				return data.consultantMood;
			},

			setConsultantMood: function(consultantMood) {
				data.consultantMood = consultantMood;
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
