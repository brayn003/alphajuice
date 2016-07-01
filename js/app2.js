
var  phaserGame = new Phaser.Game(1280,720);

phaserGame.state.add('GameState',GameState);
phaserGame.state.start('GameState');
