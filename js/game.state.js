var gameState = {
  preload: function(){
    this.load.image('background','../assets/images/background.png');
  },
  create: function(){
    this.background = this.game.add.sprite(0,0,'background');
  },
  update: function(){

  }
}
