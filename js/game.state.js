var rightSpotlight, leftSpotlight, middleSpotlight;
var bubblePoints, bubbles, bubbleText;
var game, game_scale;
var style = { font: "48px Arial", fill: "#ff0044", align: "center"};

var gameState = {
  preload: function(){
  	this.alphaJuice = new game('letter-frequency.json','wordlist.json');
	this.alphaJuice.init();
    this.load.image('background','../assets/images/background.png');
    this.load.image('left-spotlight','../assets/images/left-spotlight.png');
    this.load.image('middle-spotlight','../assets/images/middle-spotlight.png');
    this.load.image('right-spotlight','../assets/images/right-spotlight.png');
    this.load.image('bubbles','../assets/images/bubble.png');
  },
  create: function(){
	this.alphaJuice.startRequest();

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

    // var test = [];
    

    bubblePoints = {
    	'x' : [165,275,514,638,824,1091,1281,1501,1610,1710],
    	'y' : [545,701,572,761,694,644,588,660,400,547]
    }




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
