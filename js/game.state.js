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
  	var game = this.game;
    var background = game.add.sprite(game.width/2,game.height/2,'background');
    var game_scale = game.world.height / background.height;
    background.anchor.setTo(0.5,0.5);
    background.scale.setTo(game_scale, game_scale);

    this.game.world.setBounds(0, 0, game.width, game.height);

    var leftSpotlight = game.add.sprite(0,0,'left-spotlight');
    leftSpotlight.scale.setTo(game_scale, game_scale);

    var middleSpotlight = game.add.sprite(game.width/2,0,'middle-spotlight');
    middleSpotlight.anchor.setTo(0.5,0);
    middleSpotlight.scale.setTo(game_scale, game_scale);

    var rightSpotlight = game.add.sprite(game.width,0,'right-spotlight');
    rightSpotlight.anchor.setTo(1,0);
    rightSpotlight.scale.setTo(game_scale, game_scale);

  var bubblePoints = {
    	'x' : [80,120,160,200,240,280,320,360,400,440,480,520,560,600,640,680,720,760],
    	'y' : [300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300]
    }

    var sumtest = 40;
    for (var i = 0; i <  18; i++) {
    	sumtest += 65;
    	bubblePoints.x[i] = sumtest;
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

  }


}
