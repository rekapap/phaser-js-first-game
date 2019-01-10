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
}

function update ()
{
}
