class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bullet');
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  update() {
    if (this.x > this.scene.scale.width + 50) {
      if (this.trackIndex !== undefined) {
        this.scene.bulletArray[this.trackIndex] = null;
      }
      this.destroy();
    }
  }
}