var app = angular.module('alphaJuice', []);

app.controller('appCtrl',['$scope','$interval','$log','$http',function($scope,$interval,$log,$http){
	$scope.audience = {
		'request' : []
	};
	
	$scope.blender = {
		'word' : ''
	};

	$scope.dictionary = {

	};

	$scope.audience.startRequest = startRequest;
	$scope.blender.indexof = indexof;

	$http.get('wordlist.json').success(function(data) {
	    $scope.dictionary = data;
	    alert($scope.dictionary.words.indexOf('hi'));
	});
	var requestInterval;
	var generating = 0;

	// generic function
	function generateAlphabet(){
		return String.fromCharCode(97 + Math.floor(Math.random() * 26));
	};

	function generateNumber(){
		return 1 + Math.floor(Math.random() * 36);
	};

	
	// non generic funtions
	function startRequest(){
		if(generating == 1){
			return;
		}
		generating = 1;
		requestInterval = $interval(generateRequestArray, 300);
		generating = 0;
							// .then(function(){
							// 	requestInterval = undefined;
							// });
	};

	function generateRequestArray(){
		var key = generateNumber();
		var value = generateAlphabet();
		var limit = 18;
		$log.log(key+" : "+value);
		// $log.log($scope.audience.request.filter(function(x){ return true }).length);

		if($scope.audience.request.filter(function(x){ return true }).length > limit-1) {
			$log.log('Stopping');
			$interval.cancel(requestInterval);
		}else{
			if($scope.audience.request[key] === null || $scope.audience.request[key] === undefined){
				$scope.audience.request[key]= value;
			}
		}

		
		// else {
		// 	// generateRequestArray();
		// }
		// alert(JSON.stringify(req)); 
	};

	function indexof(){
		for (var i = 0; i < $scope.blender.word.length; i++) {
			delete $scope.audience.request[$scope.audience.request.indexOf($scope.blender.word[i])];
		}
		startRequest();
	};

	startRequest();

}])