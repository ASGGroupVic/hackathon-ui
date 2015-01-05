var ConsultantViewController = function ($scope, $location) {
	$scope.consultants = [
	    {name: 'Henry Niu', mood: 'happy', date: '01/2014'},
	    {name: 'Henry Niu', mood: 'neutral', date: '02/2014'},
	    {name: 'Henry Niu', mood: 'sad', date: '03/2014'},
	    {name: 'Henry Niu', mood: 'unkonwn', date: '04/2014'},
	    {name: 'Matt Jones', mood: 'unknown', date: '01/2014'},
	    {name: 'Matt Jones', mood: 'sad', date: '02/2014'},
	    {name: 'Matt Jones', mood: 'neutral', date: '03/2014'},
	    {name: 'Matt Jones', mood: 'happy', date: '04/2014'}
	];

	$scope.name = $location.search()['name'];
}; 