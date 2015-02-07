(function() {

	var app = angular.module('clientXray.directives', ['clientXray.factories']);

	app.directive("menuBar", function() {
		return {
			restrict: 'E',
			templateUrl: 'html/menu-bar.html'
		};
	});

	app.directive('autoComplete', function($http, XrayMachine){
	    return {
	        restrict:'A',
	        scope: {
	            selectedTag:'=model',
	            sampleText: '=placeholder'
	        },
	        templateUrl:'html/auto-complete.html',
	        link:function(scope,elem,attrs){
	        	scope.suggestions=[];
				scope.selectedTag="";
				scope.selectedIndex=-1; //currently selected suggestion index

	            scope.search = function(){
	                XrayMachine.getInputSuggestion(attrs.url, scope.selectedTag).success(function(data){
	                    if(data.indexOf(scope.selectedTag)===-1){
	                        data.unshift(scope.selectedTag);
	                    }
	                    scope.suggestions=data;
	                    scope.selectedIndex=-1;
	                });
	            }

	            scope.updateSelectedTag = function(index){
                    scope.selectedTag = scope.suggestions[index];
                    scope.suggestions = [];
	            }

	            scope.checkKeyDown = function(event){
	                if(event.keyCode===40){
	                    event.preventDefault();
	                    if(scope.selectedIndex+1 !== scope.suggestions.length){
	                        scope.selectedIndex++;
	                    }
	                }
	                else if(event.keyCode===38){
	                    event.preventDefault();
	                    if(scope.selectedIndex-1 !== -1){
	                        scope.selectedIndex--;
	                    }
	                }
	                else if(event.keyCode===13){
	                    scope.updateSelectedTag(scope.selectedIndex);
	                }
	            }

	            scope.$watch('selectedIndex',function(val){
	                if(val!==-1) {
	                    scope.selectedTag = scope.suggestions[scope.selectedIndex];
	                }
	            });
	        }
	 	}
	});

	app.directive("starRating", function() {
		return {
			restrict : "A",
			templateUrl:'html/star-rating.html',
			scope : {
			  ratingValue : "=",
			  max : "=",
			  functional : "=",
			  onRatingSelected : "&"
			},
			link : function(scope, elem, attrs) {
				var updateStars = function() {
					scope.stars = [];
					for ( var i = 0; i < scope.max; i++) {
						scope.stars.push({
					    	filled : i < scope.ratingValue
					  	});
					}
				};

				scope.toggle = function(index) {
					if(scope.functional) {
						scope.ratingValue = index + 1;
						scope.onRatingSelected({
							rating : index + 1
						});
					}
				};

				scope.$watch("ratingValue", function(oldVal, newVal) {
					if (newVal) { 
						updateStars(); 
					}
				});
			}
		};
	});
})();