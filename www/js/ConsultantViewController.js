var ConsultantViewController = function ($scope, $location) {
	$scope.consultants = [
	    {name: 'Henry Niu', mood: 'Happy', date: '01/2014'},
	    {name: 'Henry Niu', mood: ' Indifferent', date: '02/2014'},
	    {name: 'Henry Niu', mood: ' Postal', date: '03/2014'},
	    {name: 'Henry Niu', mood: ' Bored', date: '04/2014'},
	    {name: 'Matt Jones', mood: ' Bored', date: '01/2014'},
	    {name: 'Matt Jones', mood: ' Postal', date: '02/2014'},
	    {name: 'Matt Jones', mood: ' Indifferent', date: '03/2014'},
	    {name: 'Matt Jones', mood: 'Happy', date: '04/2014'}
	];

	$scope.name = $location.search()['name'];
}; 