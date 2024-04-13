class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // load assets
        this.load.path = './assets/'

        this.load.image('blue-paint', 'blue_paint.png')
        this.load.image('purple-paint', 'purple_paint.png')
        this.load.image('camera', 'camera.png')
        this.load.image('pistol', 'pistol.png')
        this.load.image('player', 'player.png')
        this.load.image('storefront', 'storefront.png')
        this.load.image('cardboard', 'cardboard.png')

        // Chapter 1 Assets
        this.load.image('store', 'store.png')
        this.load.image('aisle-1', 'aisle1.png')
        this.load.image('aisle-2', 'aisle2.png')
        this.load.image('aisle-3', 'aisle3.png')
        this.load.image('stand-1', 'stand1.png')
        this.load.image('stand-2', 'stand2.png')
        this.load.image('liquor-stand-1', 'liquoestand1.png')
        this.load.image('liquor-stand-2', 'liquorstand2.png')
        this.load.image('cashier', 'cashier.png')
        this.load.image('beer-keg', 'beerkeg.png')
        this.load.image('beer', 'beer.png')




        this.load.spritesheet('street-wall', './wall.png', {
            frameWidth: 512,
            frameHeight: 299
        })

        // font source: https://www.dafont.com/dogica.font
        this.load.bitmapFont('pixel-gray', 'font/pixel-gray.png', 'font/pixel-gray.xml')
        this.load.bitmapFont('pixel-white', 'font/pixel-white.png', 'font/pixel-white.xml')
    }

    create() {
        // create animations
        this.anims.create({
            key: 'wall-animate',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('street-wall', {
                start: 0,
                end: 5
            })
        })

        // proceed once loading completes
        this.scene.start('introScene')
    }
}