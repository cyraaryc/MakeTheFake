class Controller extends Phaser.Scene {
    graphics;

    constructor() {
        super('controllerScene');
    }
    preload(){
        this.load.image('Pad', './assets/T.png');
    }

    create() {
        this.scene.launch('overworldScene', { startX: 100, startY: 100 });       
         this.overworld = this.scene.get('overworldScene');
        this.cursors = this.input.keyboard.createCursorKeys();



        this.graphics = this.add.graphics();


        this.graphics.fillStyle(0xa63a43, 1);

        this.graphics.fillRoundedRect(0, 0, 270, 444, 32);

        this.graphics.fillStyle(0x000, 1);

        this.graphics.fillRoundedRect(30-15, 32-10, 230+10, 260+20, 48);

        this.graphics.fillStyle(0x6e9463, 1);

        this.graphics.fillRect(20+10+10+5-5, 32+10+5, 230-40, 260-30, 32);
                
        this.graphics.fillStyle(0x000000, 1);

        this.graphics.fillRect(20+10+10+10-5, 32+10+10, 230-50, 260-40, 32);

        this.createButtons();

        this.add.image(70, 370, 'Pad').scale = 1.3;

        this.events.on('update', () => {
            this.blep = this.sound.add('blep', {volume: 0.25});
            // this.blep.play()

            if (!this.overworld.slime) return; 

            if (this.overworld.moving) return;

            let SX = 0;
            let SY = 0;
            if (this.cursors.left.isDown || this.leftButtonPressed) {
                SX = -this.overworld.TILE_SIZE / 2;
                SY = this.overworld.TILE_SIZE / 2;
            } else if (this.cursors.right.isDown || this.rightButtonPressed) {
                SX = this.overworld.TILE_SIZE / 2;
                SY = -this.overworld.TILE_SIZE / 2;
            } else if (this.cursors.up.isDown || this.upButtonPressed) {
                SX = -this.overworld.TILE_SIZE / 2;
                SY = -this.overworld.TILE_SIZE / 2;
            } else if (this.cursors.down.isDown || this.downButtonPressed) {
                SX = this.overworld.TILE_SIZE / 2;
                SY = this.overworld.TILE_SIZE / 2;
            }

            if(this.overworld.map.getTileAtWorldXY(this.overworld.slime.x + SX,this.overworld.slime.y +
                 SY+32) == null)   return
            

            if (SX !== 0 || SY !== 0) {
                this.overworld.moving = true;
                this.overworld.tweens.add({
                    targets: this.overworld.slime,
                    x: this.overworld.slime.x + SX,
                    y: this.overworld.slime.y + SY,
                    duration: 150,
                    onComplete: () => {
                        this.overworld.moving = false;
                    }
                });
            }
        });

    }

    createButtons() {
        this.leftButton = this.add.text(39, 300+50, ' <', { fontSize: '32px', backgroundColor: '#000', }).setAlpha(.001)

            .setInteractive()
            .on('pointerdown', () => this.leftButtonPressed = true)
            .on('pointerup', () => this.leftButtonPressed = false);
            
            

        this.rightButton = this.add.text(80, 300+50, '> ', { fontSize: '32px', backgroundColor: '#000' }).setAlpha(.001)
            .setInteractive()
            .on('pointerdown', () => this.rightButtonPressed = true)
            .on('pointerup', () => this.rightButtonPressed = false);

        this.upButton = this.add.text(60, 275+50, '^', { fontSize: '32px', backgroundColor: '#000' }).setAlpha(.001)
            .setInteractive()
            .on('pointerdown', () => this.upButtonPressed = true)
            .on('pointerup', () => this.upButtonPressed = false);

        this.downButton = this.add.text(60, 340+50, 'v', { fontSize: '32px', backgroundColor: '#000' }).setAlpha(.001)
            .setInteractive()
            .on('pointerdown', () => this.downButtonPressed = true)
            .on('pointerup', () => this.downButtonPressed = false);

    }
    
}