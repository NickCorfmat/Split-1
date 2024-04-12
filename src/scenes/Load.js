class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // load assets
        this.load.path = './assets/'

        this.load.image('paint', 'paint.png')
        this.load.image('camera', 'camera.png')
        this.load.image('pistol', 'pistol.png')

        this.load.spritesheet('player', './player.png', {
            frameWidth: 48
        })

        this.load.spritesheet('street-wall', './wall.png', {
            frameWidth: 512,
            frameHeight: 299
        })

        // font source: https://www.dafont.com/dogica.font
        this.load.bitmapFont('pixel-gray', 'font/pixel-gray.png', 'font/pixel-gray.xml')
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

        this.anims.create({
            key: 'wall-animate',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('street-wall', {
                start: 0,
                end: 5
            })
        })

        // proceed once loading completes
        this.scene.start('cutscene')
    }
}