class Intro extends Phaser.Scene {
    constructor() {
        super('introScene')
    }

    init() {
        this.PLAYER_VELOCITY = 140
    }

    create() {
        // this.cameras.main.setBackgroundColor(0xbababa)
        this.add.sprite(width/2 + 50, height/2, 'storefront').setOrigin(0.5).setScale(1.4)
        // set up keyboard input
        this.keys = this.input.keyboard.createCursorKeys()

        // this.wall = this.add.rectangle(0, 0, width, height - 150, 0xABCA).setOrigin(0)

        // set custom world bounds
        this.physics.world.setBounds(0, 570, width, 50)

        // this.add.rectangle(700, 415, 110, 150, 0x000000)

        this.player = new Player(this, 200, 580, 'player', 0, 'right')

        this.enterStoreText = this.add.bitmapText(710, 340, 'pixel-white', 'Enter Store [Space]', 18).setOrigin(0.5)
    }

    update() {
        if (this.player.x >= 650 && this.player.x <= 730) {
            this.enterStoreText.setAlpha(1)

            if(Phaser.Input.Keyboard.JustDown(this.keys.space)) {
                this.scene.start("actOneScene")
            }
        } else {
            this.enterStoreText.setAlpha(0)
        }

        this.playerFSM.step()
    }
}