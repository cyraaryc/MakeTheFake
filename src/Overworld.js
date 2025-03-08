class Overworld extends Phaser.Scene {
    constructor() {
        super('overworldScene');
    }

    init() {
        this.TILE_SIZE = 32; 
        this.MOVE_DELAY = 10;
        this.moving = false; 
    }

    preload() {
        this.load.path = './assets/';
        this.load.spritesheet('slime', 'slime.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image('T', 'firestarter-2.png.png');  
        this.load.tilemapTiledJSON('T2', 'overworld3.json');
    }

    create() {
        this.cameras.main.setViewport(55,60);
        this.cameras.resize(160, 144);
  

        const map = this.add.tilemap('T2');
        const tileset = map.addTilesetImage('iso', 'T');
        const bglayer = map.createLayer('Tile Layer 1', tileset, 0, 0);

        this.slime = this.physics.add.sprite(64, 256, 'slime', 0);
        this.slime.play('j');

        this.anims.create({
            key: 'j',
            frameRate: 18,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('slime', {
                start: 0,
                end: 1
            })
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.startFollow(this.slime, true, 0.25, 0.25);
    }
}
