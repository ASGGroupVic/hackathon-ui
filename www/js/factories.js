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

	app.factory("ConsultantManager", function(XrayMachine, $q){
  		var factory = {};
  		var consultantPool = [];

		factory.getConsultant = function(email, allowCache) {
			// Allowing caching if not specified
			allowCache = typeof allowCache !== 'undefined' ? a : true;
			var deferred = $q.defer();

			if(!consultantPool[email]) {
				consultantPool[email] = {};
			}

			// Check if consultant is already cached
			if(allowCache && consultantPool[email].details) {
				deferred.resolve(consultantPool[email].details);
			} else {
				XrayMachine.getConsultant(email).success(function(data) {
					consultantPool[email].details = data;
					deferred.resolve(consultantPool[email].details);
				})
				.error(function() {
                    deferred.reject();
                });
			}

			return deferred.promise;
		};

		factory.getConsultantMoods = function(email, allowCache) {
			// Allowing caching if not specified
			allowCache = typeof allowCache !== 'undefined' ? a : true;
			var deferred = $q.defer();

			if(!consultantPool[email]) {
				consultantPool[email] = {};
			}

			// Check if consultant moods are already cached
			if(allowCache && consultantPool[email].moods) {
				deferred.resolve(consultantPool[email].moods);
			} else {
				XrayMachine.getConsultantMood(email).success(function(data) {
					consultantPool[email].moods = data;
					deferred.resolve(consultantPool[email].moods);
				})
				.error(function() {
                    deferred.reject();
                });
			}

			return deferred.promise;
		};


		factory.getClientsForConsultant = function(email, allowCache) {
			// Allowing caching if not specified
			allowCache = typeof allowCache !== 'undefined' ? a : true;
			var deferred = $q.defer();

			if(!consultantPool[email]) {
				consultantPool[email] = {};
			}

			// Check if consultant moods are already cached
			if(allowCache && consultantPool[email].clients) {
				deferred.resolve(consultantPool[email].clients);
			} else {
				XrayMachine.getClientsForUser(email).success(function(data) {
					consultantPool[email].clients = data;
					deferred.resolve(consultantPool[email].clients);
				})
				.error(function() {
                    deferred.reject();
                });
			}

			return deferred.promise;
		};
  		
  		return factory;
  	
  	});

	app.factory("MoodValues", function(){

		return {
			getMoodValue: function(mood){
				if(mood === 'indifferent'){
					return 75;
				}
				else if(mood === 'bored'){
					return 50;
				}
				else if(mood === 'happy'){
					return 100;
				}
				else{
					return 0;
				}
			}
		};
	});

	app.factory("NotificationHelper", function(){
  		var factory = {};
  		var notification = {
  			strongText :'',
  			text : '',
  			visible : false
  		};

		factory.showNotification = function(strong, text) {
			notification.visible = true;
			notification.strongText = strong;
			notification.text = text;	
		};

		factory.isVisible = function() {
			return notification.visible;
		};

		factory.closeNotification = function() {
			notification.visible = false;
		};

		factory.getNotification = function() {
			return notification;
		};
  		
  		return factory;
  	
  	});

})();
