class Controller extends Phaser.Scene {
    constructor() {
        super('controllerScene');
    }

    preload() {
        this.load.image('Pad', './assets/T.png');
    }

    create() {
        this.scene.launch('GMenuScene', { startX: 100, startY: 100 });
        // this.scene.pause('overworldScene');
        this.overworld = this.scene.get('overworldScene');
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown-ESC', () => this.toggleMenu());

        this.graphics = this.add.graphics();


        this.graphics.fillStyle(0xa63a43, 1);

        this.graphics.fillRoundedRect(0, 0, 270, 444, 32);

        this.graphics.fillStyle(0x000, 1);

        this.graphics.fillRoundedRect(30-15, 32-10, 230+10, 260+20, 48);

        this.graphics.fillStyle(0x6e9463, 1);

        this.graphics.fillRect(20+10+10+5-5, 32+10+5, 230-40, 260-30, 32);
                
        this.graphics.fillStyle(0x000000, 1);

        this.graphics.fillRect(20+10+10+10-5, 32+10+10, 230-50, 260-40, 32);

        this.add.image(70, 370, 'Pad').setScale(1.3);
        this.createButtons();

        this.events.on('update', () => {
            if (this.scene.isActive('overworldScene')) {
                this.updateMovement();
            }
        });
        this.input.on('pointerup', () => {
            this.downButtonPressed = false
            this.upButtonPressed = false
            this.leftButtonPressed = false
            this.rightButtonPressed = false

        });
        // this.toggleMenu()
    }

    updateMovement() {
        if (!this.overworld.slime || this.overworld.moving) return;
        
        let SX = 0, SY = 0;
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

        if (this.overworld.map.getTileAtWorldXY(this.overworld.slime.x + SX, this.overworld.slime.y + SY + 32) == null) return;
        
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
    }

    createButtons() {
        this.leftButton = this.add.text(29, 350, ' <', { fontSize: '32px', backgroundColor: '#000' }).setAlpha(.001)
            .setInteractive().on('pointerdown', () => this.leftButtonPressed = true).on('pointerup', () => this.leftButtonPressed = false);
        
        this.rightButton = this.add.text(75, 350, '> ', { fontSize: '32px', backgroundColor: '#000' }).setAlpha(.001)
            .setInteractive().on('pointerdown', () => this.rightButtonPressed = true).on('pointerup', () => this.rightButtonPressed = false);

        this.upButton = this.add.text(60, 325, '^', { fontSize: '32px', backgroundColor: '#000' }).setAlpha(.001)
            .setInteractive().on('pointerdown', () => this.upButtonPressed = true).on('pointerup', () => this.upButtonPressed = false);

        this.downButton = this.add.text(60, 390, 'v', { fontSize: '32px', backgroundColor: '#000' }).setAlpha(.001)
            .setInteractive().on('pointerdown', () => this.downButtonPressed = true).on('pointerup', () => this.downButtonPressed = false);
    }

    toggleMenu() {
        //breaks physics idk why
        // if (this.scene.isActive('GMenuScene')) {
        //     this.scene.stop('GMenuScene');
        //     this.scene.resume('overworldScene');
        // } else {
        //     this.scene.pause('overworldScene');
        //     this.scene.launch('GMenuScene');
        // }
    }
}
