class Controller extends Phaser.Scene {
    graphics;

    constructor() {
        super('controllerScene');
    }

    create() {
        this.scene.launch('overworldScene', { startX: 100, startY: 100 });       
         this.overworld = this.scene.get('overworldScene');
        this.cursors = this.input.keyboard.createCursorKeys();



        this.createButtons();
        this.graphics = this.add.graphics();

        this.graphics.fillStyle(0x000000, 1);

        this.graphics.fillRoundedRect(20, 32, 230, 200, 32);



        this.events.on('update', () => {
            this.blep = this.sound.add('blep', {volume: 0.25});
            this.blep.play()

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
        this.leftButton = this.add.text(10, 300, '<', { fontSize: '32px', backgroundColor: '#000' })
            .setInteractive()
            .on('pointerdown', () => this.leftButtonPressed = true)
            .on('pointerup', () => this.leftButtonPressed = false);

        this.rightButton = this.add.text(50, 300, '>', { fontSize: '32px', backgroundColor: '#000' })
            .setInteractive()
            .on('pointerdown', () => this.rightButtonPressed = true)
            .on('pointerup', () => this.rightButtonPressed = false);

        this.upButton = this.add.text(30, 260, '^', { fontSize: '32px', backgroundColor: '#000' })
            .setInteractive()
            .on('pointerdown', () => this.upButtonPressed = true)
            .on('pointerup', () => this.upButtonPressed = false);

        this.downButton = this.add.text(30, 340, 'v', { fontSize: '32px', backgroundColor: '#000' })
            .setInteractive()
            .on('pointerdown', () => this.downButtonPressed = true)
            .on('pointerup', () => this.downButtonPressed = false);
    }
}