//Name:Cyra Witten
//Citations here:
//https://chatgpt.com/share/67cbe801-f2b4-8000-8349-d0cba8c9b96b
//https://sonniss.com/gameaudiogdc - audio source
//https://freesound.org/people/Druminfected/sounds/250551/ cc-by 0 - audio source 2
//I made the music tracks with my GF Amanda Nguyen, who gave me permission.
//This is based the Slime-World Master.
//My tilt is that I  styled my playing area off a handheld controller.
//I used the cameras, text, a timer, a tilmap, physics for collision, and using scene lauch the have multiple scenes loaded at once.
//Do not leave the browser it breaks physics,just restart the page, I assume this is a phaser thing as I have no idea how to fix it.

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
    audio: {
        disableWebAudio: true,
      },    
    zoom: 2,
    backgroundColor: '#FFF',
    scene: [  MainMenu ,Controller, Overworld, GMenu, ],
} 

const game = new Phaser.Game(config)