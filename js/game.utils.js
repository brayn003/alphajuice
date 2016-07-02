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
	    		// console.log("randomSeed : " + randomSeed + ", letter : " + _this.letterFrequency[i].letter);
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
		// console.log(key+" : "+value);
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

// var alphaJuice = new game('letter-frequency.json','wordlist.json');
// alphaJuice.init();
// alphaJuice.startRequest();
