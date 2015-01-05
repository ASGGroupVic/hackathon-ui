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
  		
		factory.getConsultant = function(name) {
			/*return $http({
				method : 'GET',
				url : 'http://hackathonapi-env.elasticbeanstalk.com/v1/'+ searchType.value +'/' + email + "/clients"
			});*/

  			var consultant = [
			    {name: 'Henry Niu', mood: 'Happy', date: '01/2014'},
			    {name: 'Henry Niu', mood: ' Indifferent', date: '02/2014'},
			    {name: 'Henry Niu', mood: ' Postal', date: '03/2014'},
			    {name: 'Henry Niu', mood: ' Bored', date: '04/2014'},
			    {name: 'Matt Jones', mood: ' Bored', date: '01/2014'},
			    {name: 'Matt Jones', mood: ' Postal', date: '02/2014'},
			    {name: 'Matt Jones', mood: ' Indifferent', date: '03/2014'},
			    {name: 'Matt Jones', mood: 'Happy', date: '04/2014'}
			];

			return consultant;

		};

  		return factory;
  	
  	});

	app.factory("consultantData", function(){
		var data = {
			consultant : []
		}

		return {
			getConsultant: function() {
				return data.consultant;
			},

			setConsultant: function(consultant) {
				data.consultant = consultant
			}
		}

	});
})();