class MainMenu extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }
    preload(){
        this.load.audio('boop', './assets/click.wav')
        this.load.audio('blep', './assets/click2.wav')


    }
    
      create() {
        this.add.text(25,50, 'Press any key to start')

      const go = this.input.keyboard.on('keydown', function (event) {
        this.sound.play('boop')
        this.scene.start('controllerScene')     }, this);




}

}