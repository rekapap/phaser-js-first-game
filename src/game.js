var config = {
  type: Phaser.AUTO, // renderer
  width: 800, // dimensions
  height: 600,
  scene: { // default scene
      preload: preload,
      create: create,
      update: update
  }
};

var game = new Phaser.Game(config); // "starts" Phaser

function preload () // calls to Phaser Loader inside of the Scene function 'preload'
{
  this.load.image('sky', 'assets/sky.png'); // asset key 'sky'; string link to the loaded assets
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet('dude',
      'assets/dude.png',
      { frameWidth: 32, frameHeight: 48 }
  );
}

function create ()
{
}

function update ()
{
}
