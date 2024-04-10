'use strict'

const config = {
    parent: 'phaser-game',
    type: Phaser.AUTO,
    width: 900,
    height: 700,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Load, ActOne, ActTwo, ActThree ]
}

const game = new Phaser.Game(config)

let cursors
let { height, width } = game.config