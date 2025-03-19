class GMenu extends Phaser.Scene {
    constructor() {
        super('GMenuScene');
    }
    //need seperated menu for lauching in controllter
    preload(){
        this.load.audio('boop', './assets/click.wav')
        this.load.audio('blep', './assets/click2.wav')
        this.load.audio('music', './assets/meimei.wav')


    }
    
      create() {
        //formatting
        let menuConfig = {
          fontFamily: 'test',
          fontSize: '10px',
          backgroundColor: '#FFFFFFF',
          color: '#6e9463',
          align: 'center',
          padding: {
          top: 5,
          bottom: 5,
          },
          fixedWidth: 0
      } 
      let rect = this.add.rectangle(0, 0, 400, 600, 0x000).setScrollFactor(0)

      this.cameras.main.setViewport(50, 60);
      this.cameras.resize(160, 200);
      this.add.text(5,0, 'Firestarter\nPress a Key To Start\nBurn The Buildings\nYou have 60 seconds\nUse D-Pad',menuConfig)
      this.add.text(25,40+40, 'Music made by',menuConfig)
      this.add.text(25,60+40, 'Amanda Nguyen',menuConfig)
      this.add.text(25,80+40, 'SFX from',menuConfig)
      this.add.text(25,100+40, 'GDC Audio',menuConfig)
      this.add.text(25,120+40, 'FreeSound:',menuConfig)
      this.add.text(25,140+40, 'DrumInfected',menuConfig)

      //go to scene
      const go = this.input.keyboard.on('keydown', function (event) {
        this.sound.play('boop')
        this.scene.start('overworldScene')     
    }, this);




}

}