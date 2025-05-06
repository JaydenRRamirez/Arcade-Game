class GameOverScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameOverScene' });
    }
  
    init(data) {
      this.finalScore = data.score || 0;
    }

    preload() {
      this.load.audio("destroyed", "assets/252202__pepingrillin__powerup.ogg");
    }
  
    create() {
      this.cameras.main.setBackgroundColor('#000');
  
      this.add.text(this.scale.width / 2, this.scale.height / 2 - 80, 'Dead in your tracks.', {
        fontSize: '40px',
        fill: '#FF0000',
      }).setOrigin(0.5);
  
      this.add.text(this.scale.width / 2, this.scale.height / 2, `Current Score: ${this.finalScore}`, {
        fontSize: '15px',
        fill: '#FFFFFF',
      }).setOrigin(0.5);
  
      this.add.text(this.scale.width / 2, this.scale.height / 2 + 80, 'Press SPACE to Warp back to the past level and cycle.', {
        fontSize: '10px',
        fill: '#AAAAAA',
      }).setOrigin(0.5);

      this.GameOvertrack = this.sound.add("destroyed", {
        volume: 1
      });

      this.GameOvertrack.play();
      this.input.keyboard.once('keydown-SPACE', () => {
        this.GameOvertrack.stop();
        this.scene.start('TitleScene');
      });
    }
  }