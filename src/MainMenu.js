class MainMenu extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }
    //used to load in stuff, mostly here for debugging
    preload(){

        this.load.path = './assets/';
        this.load.spritesheet('slime', 'slime.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image('T', 'greeniso2.png');
        this.load.tilemapTiledJSON('T2', 'overworld3.json');
        this.load.spritesheet('enemy', 'b1.png', {
            frameWidth: 32,
            frameHeight: 64

        });
        this.load.audio('boop', 'click.wav')
        this.load.audio('blep', 'click2.wav')
        this.load.audio('music', 'meimei.wav')

    }
    
      create() {
        let menuConfig = {
          fontFamily: 'test',
          fontSize: '10px',
          backgroundColor: '#FFFFFFF',
          color: '#FFFFFF',
          align: 'center',
          padding: {
          top: 5,
          bottom: 5,
          },
          fixedWidth: 0
      }      
        this.add.text(25,50, 'Firestarter\nPress any key to start',menuConfig)

        this.scene.start('controllerScene')



}

}