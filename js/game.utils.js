function game(letterFrequencyJson,wordlistJson){
	this.letterFrequencyJson = letterFrequencyJson;
	this.wordlistJson = wordlistJson;
	this.letterFrequency;
	this.wordlist;
	
	// this.requestInterval;
	var generating = 0;
	var _this = this;

	this.audience = {
		'request' : []
	};

	this.blender = {
		'word' : ''
	};

	this.dictionary = {

	};

	this.init = function() {
		$.get( letterFrequencyJson, function(data) {
			_this.letterFrequency = data.letterFrequency;
		}, "json" );
		$.get( wordlistJson, function(data) {
			_this.wordlist = data.words;
		}, "json" );
	};

	this.generateLetter = function() {
	    var	cumilativeFrequency = 0,
    		randomSeed = (Math.random() * 100),
    		i = 0;
	    for (i = 0; i < _this.letterFrequency.length; i++) {
	    	cumilativeFrequency += _this.letterFrequency[i].frequency;
    		// letterFrequency[i]["cumilativeFrequency"] = round(cumilativeFrequency,2);
    		if (cumilativeFrequency > randomSeed) {
    			// alert(letterFrequency[i].letter);
    			// console.log(JSON.stringify(_this.letterFrequency));
	    		console.log("randomSeed : " + randomSeed + ", letter : " + _this.letterFrequency[i].letter);
    			return _this.letterFrequency[i].letter
    		}
	    }

	};

	this.generateNumber = function(){
		return 1 + Math.floor(Math.random() * 18);
	};

	this.startRequest = function(){
		if(generating == 1){
			return;
		}
		generating = 1;
		_this.requestInterval = setInterval(_this.generateRequestArray, 300);
		generating = 0;
							// .then(function(){
							// 	requestInterval = undefined;
							// });
	};

	this.generateRequestArray = function(){
		var key = _this.generateNumber();
		var value = _this.generateLetter();
		var limit = 18;
		console.log(key+" : "+value);
		// $log.log(audience.request.filter(function(x){ return true }).length);

		if(_this.audience.request.filter(function(x){ return true }).length > limit-1) {
			console.log('Stopping');
			clearInterval(_this.requestInterval);
		}else{
			if( _this.audience.request[key] === null || _this.audience.request[key] === undefined){
				_this.audience.request[key]= value;
			}
		}


		// else {
		// 	// generateRequestArray();
		// }
		// alert(JSON.stringify(req));
	};

	this.indexof = function(){
		if(isWordVaild(_this.blender.word)){
			for (var i = 0; i < _this.blender.word.length; i++) {
				delete _this.audience.request[_this.audience.request.indexOf(_this.blender.word[i])];
			}
			_this.startRequest();
		}else{
			alert('Not a vaild english word')
		}
	};

	this.isWordVaild = function(word){
		if(_this.dictionary.words.indexOf(word) == -1)
			return false
		return true
	};
}

var alphaJuice = new game('letter-frequency.json','wordlist.json');
alphaJuice.init();
alphaJuice.startRequest();

// var app = angular.module('alphaJuice', []);

// app.controller('appCtrl',['$scope','$interval','$log','$http',function($scope,$interval,$log,$http){


// 	function game () {
// 		// this.letterFrequencyJson =
// 	}

// 	$scope.audience.startRequest = startRequest;
// 	$scope.blender.indexof = indexof;

// 	// $http.get('wordlist.json').success(function(data) {
// 	//     $scope.dictionary = data;
// 	//     $log.log($scope.dictionary.words.indexOf('hi'));
// 	// });

// 	$http.get('letter-frequency.json').success(function(data) {
// 	    generateLetter(data.letterFrequency);
// 	});

// 	var requestInterval;
// 	var generating = 0;

// 	// generic function
// 	function generateAlphabet(){
// 		return String.fromCharCode(97 + Math.floor(Math.random() * 26));
// 	};

// 	function generateNumber(){
// 		return 1 + Math.floor(Math.random() * 36);
// 	};

// 	function generateLetter(letterFrequency){
// 		// var letterFrequency = data.letterFrequency,
// 	    var	cumilativeFrequency = 0,
//     		randomSeed = (Math.random() * 100),
//     		i = 0;
// 	    for (i = 0; i < letterFrequency.length; i++) {
// 	    	cumilativeFrequency += letterFrequency[i].frequency;
//     		// letterFrequency[i]["cumilativeFrequency"] = round(cumilativeFrequency,2);
//     		if (cumilativeFrequency > randomSeed) {
//     			// alert(letterFrequency[i].letter);
//     			break;
//     		}
// 	    }
// 	    $log.log(JSON.stringify(letterFrequency));
// 	    $log.log("randomSeed : " + randomSeed + ", letter : " + letterFrequency[i].letter);
// 	}

// 	function round(value, decimals) {
// 		return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
// 	}

// 	function binaryIndexOf(searchElement,array) {
// 	    'use strict';

// 	    var minIndex = 0;
// 	    var maxIndex = array.length - 1;
// 	    var currentIndex;
// 	    var currentElement;

// 	    while (minIndex <= maxIndex) {
// 	        currentIndex = (minIndex + maxIndex) / 2 | 0;
// 	        currentElement = array[currentIndex];

// 	        if (currentElement < searchElement) {
// 	            minIndex = currentIndex + 1;
// 	        }
// 	        else if (currentElement > searchElement) {
// 	            maxIndex = currentIndex - 1;
// 	        }
// 	        else {
// 	            return currentIndex;
// 	        }
// 	    }

// 	    return -1;
// 	}

// 	// non generic funtions
// 	function startRequest(){
// 		if(generating == 1){
// 			return;
// 		}
// 		generating = 1;
// 		requestInterval = $interval(generateRequestArray, 300);
// 		generating = 0;
// 							// .then(function(){
// 							// 	requestInterval = undefined;
// 							// });
// 	};

// 	function generateRequestArray(){
// 		var key = generateNumber();
// 		var value = generateAlphabet();
// 		var limit = 18;
// 		$log.log(key+" : "+value);
// 		// $log.log($scope.audience.request.filter(function(x){ return true }).length);

// 		if($scope.audience.request.filter(function(x){ return true }).length > limit-1) {
// 			$log.log('Stopping');
// 			$interval.cancel(requestInterval);
// 		}else{
// 			if($scope.audience.request[key] === null || $scope.audience.request[key] === undefined){
// 				$scope.audience.request[key]= value;
// 			}
// 		}


// 		// else {
// 		// 	// generateRequestArray();
// 		// }
// 		// alert(JSON.stringify(req));
// 	};

// 	function isWordVaild(word){
// 		if($scope.dictionary.words.indexOf(word) == -1)
// 			return false
// 		return true
// 	};

// 	function indexof(){
// 			if(isWordVaild($scope.blender.word)){
// 				for (var i = 0; i < $scope.blender.word.length; i++) {
// 					delete $scope.audience.request[$scope.audience.request.indexOf($scope.blender.word[i])];
// 				}
// 				startRequest();
// 			}else{
// 				alert('Not a vaild english word')
// 			}
// 		};

// 	// startRequest();

// }])
