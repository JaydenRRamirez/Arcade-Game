const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 650,
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: [TitleScene, GameScene, GameOverScene]
};

const game = new Phaser.Game(config);