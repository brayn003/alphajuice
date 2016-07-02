var rightSpotlight, leftSpotlight, middleSpotlight;
var bubblePoints, bubbles, bubbleText;
var game, game_scale;
var style = { font: "48px Arial", fill: "#ff0044", align: "center"};

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
    this.load.image('crowd-left','../assets/images/crowd_left.png');
    this.load.image('crowd-right','../assets/images/crowd_right.png');
    this.load.image('crowd-middle','../assets/images/crowd_middle.png');
    this.load.image('crowd-secondline','../assets/images/crowd_secondline.png');
    this.load.image('crowd-topleft','../assets/images/crowd_topleft.png');
    this.load.image('crowd-topright','../assets/images/crowd_topright.png');

    //Bubble
    this.load.image('bubbles','../assets/images/bubble.png');
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

    

    bubblePoints = {
    	'x' : [165,275,514,638,824,1091,1281,1501,1610,1710],
    	'y' : [545,701,572,761,694,644,588,660,400,547]
    }
    var style = { font: "32px Arial", fill: "#ff0044", align: "center", backgroundColor: "#ffff00" };

    for (var i = 0; i < bubblePoints.x.length; i++) {
    	var bubbles = game.add.sprite(bubblePoints.x[i],bubblePoints.y[i],'bubbles');
    	bubbles.scale.setTo(game_scale * 0.6, game_scale * 0.6);
      bubbles.inputEnabled=true;
      bubbles.name = i;
      bubbles.events.onInputDown.add(function(bubble){
          _this.alphaJuice.bubbleClickListener(bubble.name);
      });

    }

    //Score
    var multiplerstyle = { font: "20px Quenda", fill: "#FFD700", align: "center"};
    var multiplerText = game.add.text(0,0,this.alphaJuice.multipler+" X ",multiplerstyle);
    multiplerText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

    var scorestyle =  { font: "50px Quenda", fill: "#FFD700", align: "center" };
    var scoreText = game.add.text(multiplerText.width,0,this.alphaJuice.score,scorestyle);
    scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

    multiplerText.position.y = scoreText.height - multiplerText.height - 9

    // this.alphaJuice.updateScore("Sunit");
    // this.alphaJuice.updateScore("Camera");
    // this.alphaJuice.updateScore('Computer');

    //scoreText.setText(this.alphaJuice.multipler+" X "+this.alphaJuice.score,style);
},
  update: function(){
  	setInterval(function(){
  		leftSpotlight.tint = Math.random() * 0xffffff;
  		rightSpotlight.tint = Math.random() * 0xffffff;
  		middleSpotlight.tint = Math.random() * 0xffffff;
  	},1200);

  	// for (var i = 0; i < points.x.length; i++) {
    	
    // }
    for (var i = 0; i < this.alphaJuice.audience.request.length; i++) {
    	if (this.alphaJuice.audience.request[i] === undefined) {
    		// console.log(this.alphaJuice.audience.request[i]);
    	// 	break;
    	} else{
    		bubbles = game.add.sprite(bubblePoints.x[i]*game_scale*0.8,game.height-bubblePoints.y[i]*game_scale*0.8,'bubbles');
	    	bubbles.scale.setTo(game_scale * 0.7, game_scale * 0.7);
	    	bubbles.anchor.setTo(0.5,0.5);
    		// console.log(this.alphaJuice.audience.request[i]);
    		bubbleText = game.add.text(bubblePoints.x[i]*game_scale*0.8,game.height-(bubblePoints.y[i]*game_scale*0.825), this.alphaJuice.audience.request[i], style);
	    	bubbleText.anchor.setTo(0.5,0.5);
    		// console.log(this.alphaJuice.audience.request[i]);
    	}

    	
    }

  }


}
