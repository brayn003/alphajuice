var phaserGame = new Phaser.Game("100","100",Phaser.CANVAS,'game-canvas',null,true,true,null);
   	phaserGame.state.add('gameState',gameState);
   	phaserGame.state.start('gameState');
