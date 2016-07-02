var rightSpotlight, leftSpotlight, middleSpotlight;
var bubblePoints, bubbles, bubbleText,mixer,table;
var scoreText, multiplerText;
var game, game_scale;
var style = { font: "48px Quenda", fill: "#ff0044", align: "center"};
var	crowdFirst, crowdSecond, crowdThirdLeft, crowdThirdRight;


var gameState = {
  preload: function(){
  	this.alphaJuice = new game('letter-frequency.json','wordlist.json');
	  this.alphaJuice.init();


    this.load.image('background','../assets/images/background.png');

    //Light
    this.load.image('left-spotlight','../assets/images/left-spotlight.png');
    this.load.image('middle-spotlight','../assets/images/middle-spotlight.png');
    this.load.image('right-spotlight','../assets/images/right-spotlight.png');

    //Crowd
    this.load.image('crowd-first','../assets/images/crowd_first.png');
    // this.load.image('crowd-first-right','../assets/images/crowd_first_right.png');
    // this.load.image('crowd-first-middle','../assets/images/crowd_first_middle.png');
    this.load.image('crowd-second','../assets/images/crowd_second.png');
    this.load.image('crowd-third-left','../assets/images/crowd_third_left.png');
    this.load.image('crowd-third-right','../assets/images/crowd_third_right.png');

    //Bubble
    this.load.image('bubbles','../assets/images/bubble.png');

    //Mixer
    this.load.image('mixer','../assets/images/mixer.png');

    //Table
    this.load.image('table','../assets/images/table.png');
  },
  create: function(){
	this.alphaJuice.startRequest();

    var _this = this
  	game = this.game;
    var background = game.add.sprite(game.width/2,game.height/2,'background');
    game_scale = game.world.height / background.height;
    background.anchor.setTo(0.5,0.5);
    background.scale.setTo(game_scale, game_scale);

    this.game.world.setBounds(0, 0, game.width, game.height);



    leftSpotlight = game.add.sprite(0,0,'left-spotlight');
    leftSpotlight.scale.setTo(game_scale, game_scale);

    middleSpotlight = game.add.sprite(game.width/2,0,'middle-spotlight');
    middleSpotlight.anchor.setTo(0.5,0);
    middleSpotlight.scale.setTo(game_scale, game_scale);

    rightSpotlight = game.add.sprite(game.width,0,'right-spotlight');
    rightSpotlight.anchor.setTo(1,0);
    rightSpotlight.scale.setTo(game_scale, game_scale);

    crowdThirdLeft = game.add.sprite(-1,200*game_scale,'crowd-third-left');
    crowdThirdLeft.scale.setTo(game_scale, game_scale);
    this.add.tween(crowdThirdLeft).to({ y: [250*game_scale,200*game_scale]},1000, 'Cubic.easeOut', true, 0).loop(true);


    crowdThirdRight = game.add.sprite(game.width,200*game_scale,'crowd-third-right');
    crowdThirdRight.anchor.setTo(1,0);
    crowdThirdRight.scale.setTo(game_scale, game_scale);
    this.add.tween(crowdThirdRight).to({ y: [250*game_scale,200*game_scale]},1000, 'Cubic.easeOut', true, 0).loop(true);

	  crowdSecond = game.add.sprite(game.width/2,200*game_scale,'crowd-second');
    crowdSecond.anchor.setTo(0.5,0);
    crowdSecond.scale.setTo(game_scale, game_scale);
    this.add.tween(crowdSecond).to({ y: [250*game_scale,200*game_scale]},1200, 'Cubic.easeOut', true, 0).loop(true);

    // crowdFirstLeft = game.add.sprite(-1,400*game_scale,'crowd-first-left');
    // crowdFirstLeft.scale.setTo(game_scale, game_scale);
    // this.add.tween(crowdFirstLeft).to({ y: [350*game_scale,400*game_scale]},1100, 'Cubic.easeOut', true, 0).loop(true);

    // crowdFirstRight = game.add.sprite(game.width/2,400*game_scale,'crowd-first-right');
    // crowdFirstRight.anchor.setTo(0.5,0);
    // crowdFirstRight.scale.setTo(game_scale, game_scale);
    // this.add.tween(crowdFirstRight).to({ y: [350*game_scale,400*game_scale]},1150, 'Cubic.easeOut', true, 0).loop(true);

    crowdFirst = game.add.sprite(game.width/2,330*game_scale,'crowd-first');
    crowdFirst.anchor.setTo(0.5,0);
    crowdFirst.scale.setTo(game_scale, game_scale);
    this.add.tween(crowdFirst).to({ y: [380*game_scale,330*game_scale]},1050, 'Cubic.easeOut', true, 0).loop(true);



    bubblePoints = {
    	'x' : [165,275,514,638,824,1091,1281,1501,1610,1710],
    	'y' : [545,701,572,761,694,644,588,660,400,547]
    }
    // var style = { font: "32px Arial", fill: "#ff0044", align: "center", backgroundColor: "#ffff00" };

    // for (var i = 0; i < bubblePoints.x.length; i++) {
    // 	var bubbles = game.add.sprite(bubblePoints.x[i],bubblePoints.y[i],'bubbles');
    // 	bubbles.scale.setTo(game_scale * 0.6, game_scale * 0.6);


    // }
    setInterval(function(){
  		leftSpotlight.tint = Math.random() * 0xffffff;
  		rightSpotlight.tint = Math.random() * 0xffffff;
  		middleSpotlight.tint = Math.random() * 0xffffff;

  	},1500);
    //Score
    var multiplerstyle = { font: "20px Quenda", fill: "#FFD700", align: "center"};
    multiplerText = game.add.text(0,0,this.alphaJuice.multipler+" X ",multiplerstyle);
    multiplerText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

    var scorestyle =  { font: "50px Quenda", fill: "#FFD700", align: "center" };
    scoreText = game.add.text(multiplerText.width,0,this.alphaJuice.score,scorestyle);
    scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

    multiplerText.position.y = scoreText.height - multiplerText.height - 9

    //Bottom word text
    var wordStyle = { font: "30px Quenda", fill: "#28B463", backgroundColor: "#FCF3CF" ,align: "center" };
    wordText = game.add.text(0,0,"g",wordStyle);
    wordText.position.y=game.height - wordText.height;
    wordText.setText("");

    //table
    table = game.add.sprite(0,0,'table');
    table.scale.setTo(game_scale,game_scale);
    table.position.x = (game.width/2)- (table.width/2);
    table.position.y = game.height - table.height;

    //mixer
    mixer = game.add.sprite(0,0,'mixer');
    mixer.scale.setTo(game_scale, game_scale);
    mixer.position.x = (game.width/2) - (table.width/4);
    mixer.position.y = game.height - 200;
    mixer.inputEnabled = true;
    mixer.events.onInputDown.add(function(mixer){
      _this.alphaJuice.mixerClickListener(scoreText,multiplerText);
    });

	 //Background Music
    var bgAudio = new Audio('../assets/sounds/bg.ogg');
    bgAudio.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    bgAudio.play();

    window.addEventListener("beforeunload", function(e){
      _this.bgAudio.stop();
    });

	//bubble gen
    this.alphaJuice.on("request", function(event,data){

		var bubbles = game.add.sprite(bubblePoints.x[data.key]*game_scale*0.8,game.height-bubblePoints.y[data.key]*game_scale*0.8,'bubbles');
    bubbles.scale.setTo(game_scale * 0.7, game_scale * 0.7);
    bubbles.anchor.setTo(0.5,0.5);
    bubbles.inputEnabled=true;
		bubbles.name = data.key;
		// console.log(this.alphaJuice.audience.request[i]);
		var bubbleText = game.add.text(bubblePoints.x[data.key]*game_scale*0.8,game.height-(bubblePoints.y[data.key]*game_scale*0.825), data.value, style);
    bubbleText.anchor.setTo(0.5,0.5);
    bubbles.events.onInputDown.add(function(bubble){
      _this.alphaJuice.bubbleClickListener(bubble,bubbleText,_this.game);
		});

    });

},
  update: function(){
    var _this = this




  }


}
