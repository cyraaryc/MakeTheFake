class MainMenu extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }
    preload(){
        this.load.audio('boop', './assets/click.wav')
        this.load.audio('blep', './assets/click2.wav')


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

      const go = this.input.keyboard.on('keydown', function (event) {
        this.sound.play('boop')
        this.scene.start('controllerScene')     }, this);




}

}