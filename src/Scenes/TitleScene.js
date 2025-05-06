class TitleScene extends Phaser.Scene {
    constructor() {
      super('TitleScene');
    }
  
    create() {
      this.add.text(100, 100, 'Track This!', { fontSize: '45px', fill: '#f0f8ff' });
      this.add.text(100, 160, 'Cycle between 3 tracks using Up or Down', { fontSize: '15px', fill: '#f0ffff' });
      this.add.text(100, 190, 'To Shoot, press the SPACE key.', { fontSize: '15px', fill: '#f0ffff' });
      this.add.text(100, 240, 'Press SPACE to Start', { fontSize: '20px', fill: '#8a2be2' });
  
      this.input.keyboard.once('keydown-SPACE', () => {
        this.scene.start('GameScene');
      });
    }
  }