class Overworld extends Phaser.Scene {
    constructor() {
        super('overworldScene');
    }

    init() {
        //basic stuff here
        this.TILE_SIZE = 32;
        this.MOVE_DELAY = 10;
        this.moving = false;
        this.score = 0;
        this.complete = false;
        this.timer = 3600;
    }

    create() {
        this.loop;

            
        if (this.loop != 0){
            this.music = this.sound.add('music', { volume: 0.5, loop: true});
            this.music.play();
            this.loop=0
            }
        let menuConfig = {
            fontFamily: 'test',
            fontSize: '15px',
            backgroundColor: '#FFFFFFF',
            color: '#6e9463',
            align: 'right',
            padding: {
            top: 5,
            bottom: 0,
            },
            fixedWidth: 0
        }      
        this.cameras.main.setViewport(50, 60);
        this.cameras.resize(160, 200);

        this.map = this.add.tilemap('T2');
        const tileset = this.map.addTilesetImage('iso', 'T');
        const bglayer = this.map.createLayer('Tile Layer 1', tileset, 0, 0);
        bglayer.depth = 0;
        this.slime = this.physics.add.sprite(32, 32, 'slime', 0);
        let rect1 = this.add.rectangle(0, 0, 400, 40, 0x000).setScrollFactor(0).depth = 1999;
        let rect2 = this.add.rectangle(0, 200, 400, 40, 0x000).setScrollFactor(0).depth = 1999;

        this.text1 = this.add.text(10, -4, 'SCORE : '+ this.score, menuConfig, { fontSize: '16px', backgroundColor: '#000', color: '#6e9463' }).setScrollFactor(0);
        this.text1.depth = 2000;
        this.text2 = this.add.text(0, 180, (this.timer/60).toFixed(2), menuConfig, { fontSize: '8px', backgroundColor: '#000', color: '#6e9463' }).setScrollFactor(0);
        this.text2.depth = 2000;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.startFollow(this.slime, true, 0.25, 0.25);

        this.enemies = this.physics.add.group();


    }
    update(){


        this.timer--
        this.text2.setText((this.timer/60).toFixed(2)).depth = 2000;       
        if (this.timer == 0){ 
            this.music.stop()
            this.loop = 1;
            this.scene.start('GMenuScene')
        }

        this.spawnEnemies(1); 
        // console.log(this.enemies.getChildren());
        // console.log(this.map.getTileAtWorldXY(this.slime.x, this.slime.y+32), false, this.cameras)

        // console.log("\nx: "+ this.slime.x + " y: "+this.slime.y)
    }

    spawnEnemies(count) {
        for (let i = 0; i < count; i++) {
            let x = Phaser.Math.Between(-30, 30) * this.TILE_SIZE; 
            let y = Phaser.Math.Between(-30, 30) * this.TILE_SIZE + 16;
            let flag = true;
            if(this.map.getTileAtWorldXY(x, y+32) == null) {
                i--
            } else {
                this.enemies.getChildren().forEach(enemy => {
                    if(enemy.x == x && enemy.y == y ) {
                        flag = false
                    }
                });
                if(flag == true){
                    let enemy = this.enemies.create(x, y, 'enemy');
                    enemy.onfire=false;
                    enemy.depth = (enemy.y)
                    enemy.body.setSize(10,10)
                    enemy.body.setOffset(11,41)
                    this.physics.add.collider(this.slime, enemy, this.hitEnemy, null, this);
                }

            }
            
        }
    }
    hitEnemy(player, enemy) {
        if (this.isColliding) return;
    
        this.isColliding = true;
        enemy.setTint(0x000000);
    
        this.time.delayedCall(200, () => {
            let destructionRadius = 50;
            enemy.destroy();
            // this.score++;
            
            this.destroyNearbyEnemies(enemy.x, enemy.y, destructionRadius);
    
            this.text1.setText('SCORE : ' + this.score).depth = 2000;
            this.isColliding = false;
        });
    }
    
    destroyNearbyEnemies(x, y, radius) {
        this.enemies.getChildren().forEach(otherEnemy => {
            let distance = Phaser.Math.Distance.Between(x, y, otherEnemy.x, otherEnemy.y);
            if (distance <= radius && Math.random() < .5) {
                if (otherEnemy.onfire == false){
                otherEnemy.onfire = true;
                otherEnemy.setTint(0x000000);
                this.time.delayedCall(200, () => {
                    otherEnemy.onfire = false;
                    otherEnemy.destroy();
                    this.score++;
    
                    this.destroyNearbyEnemies(otherEnemy.x, otherEnemy.y, radius);
                    
                    this.text1.setText('SCORE : ' + this.score).depth = 2000;
                    otherEnemy.onfire = false;
                });
            }
            }
        });
        
    }
    

}
