// Code Practice: Scrolling States
// Name:
// Date: 

'use strict'

const config = {
    parent: 'phaser-game',  // for info text
    type: Phaser.AUTO,
    width: 400,
    height: 300,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [ Load, ActOne, ActTwo, ActThree ]
}

const game = new Phaser.Game(config)