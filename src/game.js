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

function preload ()
{
}

function create ()
{
}

function update ()
{
}
