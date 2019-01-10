var config = {
  type: Phaser.AUTO, // renderer
  width: 800, // dimensions
  height: 600,
  physics: {
    default: 'arcade', // Arcade Physics system
    arcade: {
        gravity: {y: 300 },
        debug: false
    }
  },
  scene: { // default scene
      preload: preload,
      create: create,
      update: update
  }
};

var platforms;
var player;
var stars;
var score = 0;
var scoreText;
var bombs;

var game = new Phaser.Game(config); // "starts" Phaser

function preload () // calls to Phaser Loader inside of the Scene function 'preload'
{
  this.load.image('sky', 'assets/sky.png'); // asset key 'sky'; string link to the loaded assets
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet('dude', // loaded as a spritesheet
      'assets/dude.png',
      { frameWidth: 32, frameHeight: 48 }
  );
}

function create ()
{
  this.add.image(0, 0, 'sky').setOrigin(0, 0); // new Image Game Object; adds to the current Scenes display list

  // platforms
  platforms = this.physics.add.staticGroup(); // static Group; physics: automatically create physics enabled children

  // backdrop platform
  platforms.create(400, 568, 'ground').setScale(2).refreshBody(); // create Game Objects // refreshBody() is required because of scaling a static physics body

  // floating platforms
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  // player Physics Sprite
  player = this.physics.add.sprite(100, 450, 'dude'); // through Physics Game Object Factory: this.physics.add // has a Dynamic Physics body by def

  player.setBounce(0.2);
  player.setCollideWorldBounds(true); // prevent from the player to 'run' out of the screen
  // player.body.setGravityY(300); // adds Gravity to player

  // player animations
  // Animation Manager is a global system -> animations are globally available to all Game Objects
  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3}),
      frameRate: 10,
      repeat: -1 // looping
  });

  this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
  });

  this.physics.add.collider(player, platforms); // collider object => It takes two objects and tests for collision and performs separation against them

  // stars
  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  stars.children.iterate( child => {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  this.physics.add.collider(stars, platforms);
  this.physics.add.overlap(player, stars, collectStar, null, this);

  // score text
  scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

  // bombs
  bombs = this.physics.add.group();
}

function update ()
{
  var cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true)
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  }
  else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down){
    player.setVelocityY(-330);
  }

}

function collectStar (player, star){
  star.disableBody(true, true);

  score += 10;
  scoreText.setText('Score: ' + score);
}
