class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // load assets
        this.load.path = './assets/'

        this.load.image('paint', 'paint.png')

        this.load.spritesheet('player', './player.png', {
            frameWidth: 48
        })
    }

    create() {
        // create animations
        this.anims.create({
            key: 'idle-down',
            frameRate: 0, // 1 frame idle animation, so 0 framerate
            repeat: -1, // infinitely repeat
            frames: this.anims.generateFrameNumbers('player', {
                start: 1,
                end: 1
            })
        })

        this.anims.create({
            key: 'walk-down',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 2
            })
        })

        // proceed once loading completes
        this.scene.start('actTwoScene')
    }
}