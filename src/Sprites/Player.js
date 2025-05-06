class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'player');
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setAngle(90);
  
      this.setCollideWorldBounds(true);
      this.speed = 200;
  
      this.tracksY = [
        scene.scale.height / 2 - 100,
        scene.scale.height / 2,
        scene.scale.height / 2 + 100
      ];
      this.currentTrack = 1;
      this.setY(this.tracksY[this.currentTrack]);
    }
  
    moveUp() {
      if (this.currentTrack > 0) {
        this.currentTrack--;
        this.setY(this.tracksY[this.currentTrack]);
      }
    }
  
    moveDown() {
      if (this.currentTrack < this.tracksY.length - 1) {
        this.currentTrack++;
        this.setY(this.tracksY[this.currentTrack]);
      }
    }
  
    shoot(bullets) {
        const bullet = bullets.get(this.x + 20, this.y);
        if (bullet) {
          bullet.setActive(true);
          bullet.setVisible(true);
          bullet.setVelocityX(300);
          return bullet;
        }
        return null;
      }
      getTrackIndex() {
        const centerY = this.scene.scale.height / 2;
        if (this.y < centerY - 50) return 0; // Top
        if (this.y > centerY + 50) return 2; // Bottom
        return 1; // Middle
      }
  }