var app = angular.module('alphaJuice', []);

app.controller('appCtrl2',['$scope','$interval','$log','$http',function($scope,$interval,$log,$http){
	 game = new Phaser.Game(1280,720);

   game.state.add('GameState',GameState);
   game.state.start('GameState');
}])
