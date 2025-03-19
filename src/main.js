//Name:Cyra
//Future Citations here:
//https://chatgpt.com/share/67cbe801-f2b4-8000-8349-d0cba8c9b96b
//https://sonniss.com/gameaudiogdc - audio source
//https://freesound.org/people/Druminfected/sounds/250551/ cc-by 0 - audio source 2
//This is based the Slime-World Master.

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    height: 148*3,
    width: 90*3,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    zoom: 2,
    backgroundColor: '#FFF',
    scene: [  MainMenu ,Controller, Overworld,],
} 

const game = new Phaser.Game(config)