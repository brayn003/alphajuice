var phaserGame = new Phaser.Game(1280,720);
   	phaserGame.state.add('gameState',gameState);
   	phaserGame.state.start('gameState');
