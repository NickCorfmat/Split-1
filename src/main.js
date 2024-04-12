'use strict'

const config = {
    parent: 'phaser-game',
    type: Phaser.AUTO,
    width: 960,
    height: 640,
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
    scene: [ Load, Cutscene, Intro, ActOne, ActTwo, ActThree ]
}

const game = new Phaser.Game(config)

let cursors
let { height, width } = game.config