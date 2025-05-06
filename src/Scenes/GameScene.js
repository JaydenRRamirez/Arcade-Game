class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  init(data) {
    this.Level = data.Level || 1;
    this.cycle = data.cycle ?? 1;
    this.score = data.score ?? 0;
    this.lives = data.lives ?? 3;
    //console.log(`Init GameScene: level=${this.Level}, cycle=${this.cycle}`);
  }

  preload() {
    this.load.image('player', 'assets/playerShip1_blue.png');
    this.load.image('bullet', 'assets/laserBlue02.png');
    this.load.image('enemy', 'assets/enemyBlack2.png');
    this.load.image('tank', 'assets/enemyBlack4.png');
    this.load.image('speedy', 'assets/enemyBlack5.png');
    this.load.image('bg', 'assets/blue.png');
    this.load.audio("bullet_audio", "assets/sfx_laser1.ogg");
    this.load.audio("destroyed", "assets/252202__pepingrillin__powerup.ogg");
  }

  create() {
    this.backgroundScroll = 1 + this.Level * 0.5 + this.cycle * 0.2;
    this.firedShot = 0;
    this.bulletArray = [null, null, null];
    this.levelFlag = false;

    this.currentWaveIndex = 0;
    this.waves = Levels[this.Level].waves;
    this.waveTimer = this.time.addEvent({
      delay: 2000,
      callback: this.spawnWave,
      callbackScope: this,
      loop: true
    });

    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'bg').setOrigin(0);

    this.player = new Player(this, 100, this.scale.height / 2);

    this.bullets = this.physics.add.group({
      classType: Bullet,
      runChildUpdate: true,
      maxSize: 30
    });

    this.enemies = this.physics.add.group();

    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '20px', fill: '#fff' });
    this.livesText = this.add.text(16, 40, 'Lives: 3', { fontSize: '20px', fill: '#fff' });

    this.input.keyboard.on('keydown-UP', () => this.player.moveUp());
    this.input.keyboard.on('keydown-DOWN', () => this.player.moveDown());
    this.input.keyboard.on('keydown-SPACE', () => {
      const trackIndex = this.player.getTrackIndex();
      if (!this.bulletArray[trackIndex] && this.time.now > this.firedShot + 250) {
        const bullet = this.player.shoot(this.bullets);
        this.sound.play("bullet_audio", {
          volume: 1
      });
        if (bullet) {
          bullet.trackIndex = trackIndex;
          this.bulletArray[trackIndex] = bullet;
          this.firedShot = this.time.now;
        }
      }
    });

    this.physics.add.overlap(this.bullets, this.enemies, this.hitDetected, null, this);
    this.physics.add.overlap(this.enemies, this.player, this.playerHit, null, this);
  }

  update() {
    this.background.tilePositionX += this.backgroundScroll;
    this.enemies.getChildren().forEach(enemy => {
      if (enemy.active && enemy.x < -enemy.width) {
        enemy.setActive(false);
        enemy.setVisible(false);
        enemy.destroy();
      }
    });
    
    if (!this.levelFlag &&
        this.currentWaveIndex >= this.waves.length &&
        this.enemies.getChildren().every(e => !e.active)) {
      this.levelFlag = true;
      this.waveTimer.remove();
      this.nextLevel();
    }
  }

  spawnWave() {
    if (this.currentWaveIndex >= this.waves.length) return;

  const wave = this.waves[this.currentWaveIndex];
  const tracks = [this.scale.height / 2 - 100, this.scale.height / 2, this.scale.height / 2 + 100];

  wave.forEach(enemyData => {
    const y = tracks[enemyData.track];
    let hp = 1;
    let speed = -150 * this.cycle;

    if (enemyData.type === 'tank') {
      hp = 3;
      speed = -100 * this.cycle;
    } else if (enemyData.type === 'speedy') {
      hp = 2;
      speed = -250 * this.cycle;
    }

    const enemy = this.enemies.create(this.scale.width + 50, y, enemyData.type).setVelocityX(speed);
    enemy.setAngle(90);
    enemy.hp = hp;
    enemy.type = enemyData.type;
  });

  this.currentWaveIndex++;
  }

  hitDetected(bullet, enemy) {
    bullet.destroy();
    if (bullet.trackIndex !== undefined) {
      this.bulletArray[bullet.trackIndex] = null;
    }

    if (enemy.type === 'tank') {
      enemy.hp -= 1;
      if (enemy.hp <= 0) enemy.destroy();
    } else if (enemy.type === 'speedy') {
      enemy.hp -= 1;
      if (enemy.hp === 1) {
        enemy.setVelocityX(-100);
      } else if (enemy.hp <= 0) {
        enemy.destroy();
      }
    } else {
      enemy.destroy();
    }

    this.score += 1;
    this.combo++;
    if (this.score % 20 === 0) this.lives++;
    this.scoreText.setText('Score: ' + this.score);
    this.livesText.setText('Lives: ' + this.lives);
  }

  playerHit(player, enemy) {
    enemy.destroy();
    this.combo = 0;
    this.lives--;
    this.livesText.setText('Lives: ' + this.lives);

    if (this.lives <= 0) {
      this.scene.start('GameOverScene', { score: this.score });
    }
  }

  nextLevel() {
    let nextLevel = this.Level + 1;

  if (nextLevel > 3) {
    nextLevel = 1;
    this.cycle += 1;
  }

  this.scene.start('GameScene', {
    Level: nextLevel,
    score: this.score,
    lives: this.lives,
    cycle: this.cycle
    
  });
  //console.log(`Level: ${nextLevel}, Cycle: ${this.cycle}`);
  }
}
