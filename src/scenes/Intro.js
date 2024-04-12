class Intro extends Phaser.Scene {
    constructor() {
        super('introScene')
    }

    init() {
        this.PLAYER_VELOCITY = 350
    }

    create() {
        // set up keyboard input
        cursors = this.input.keyboard.createCursorKeys()

        this.wall = this.add.rectangle(0, 0, width, height - 150, 0xb5b5b5).setOrigin(0)

        // set custom world bounds
        this.physics.world.setBounds(50, 50, width - 100, height - 200)

        this.add.rectangle(700, 430, 80, 120, 0x000000)

        this.player = this.physics.add.sprite(200, 500, 'player', 1).setScale(2)
        this.player.body.setCollideWorldBounds(true)
        this.player.body.setSize(32, 32).setOffset(8, 16)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start("actOneScene")
        }

        let playerVector = new Phaser.Math.Vector2(0, 0)
        let playerDirection = 'down'

        // handle left/right
        if (cursors.left.isDown) {
            playerVector.x = -1
            playerDirection = 'left'
        } else if (cursors.right.isDown) {
            playerVector.x = 1
            playerDirection = 'right'
        }

        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)

        let playerMovement
        playerVector.length() ? playerMovement = 'walk' : playerMovement = 'idle'
    }
}