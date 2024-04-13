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
        cursors = this.input.keyboard.createCursorKeys()

        // this.wall = this.add.rectangle(0, 0, width, height - 150, 0xABCA).setOrigin(0)

        // set custom world bounds
        this.physics.world.setBounds(0, 380, width, 200)

        // this.add.rectangle(700, 415, 110, 150, 0x000000)

        this.player = this.physics.add.sprite(200, 500, 'player').setOrigin(0.5).setScale(0.5)
        this.player.body.setCollideWorldBounds(true)
        this.player.body.setSize(100, 200)

        this.enterStoreText = this.add.bitmapText(710, 340, 'pixel-white', 'Enter Store [Space]', 18).setOrigin(0.5)
    }

    update() {
        if (this.player.x >= 650 && this.player.x <= 730) {
            this.enterStoreText.setAlpha(1)

            if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
                this.scene.start("actOneScene")
            }
        } else {
            this.enterStoreText.setAlpha(0)
        }

        // player movement
        let playerVector = new Phaser.Math.Vector2(0, 0)

        // handle left/right
        if (cursors.left.isDown) {
            playerVector.x = -1
            this.player.flipX = true
        } else if (cursors.right.isDown) {
            playerVector.x = 1
            this.player.flipX = false
        }

        // handle up/down
        if (cursors.up.isDown) {
            playerVector.y = -1
        } else if (cursors.down.isDown) {
            playerVector.y = 1
        }

        playerVector.normalize()

        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)
    }
}