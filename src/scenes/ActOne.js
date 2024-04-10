class ActOne extends Phaser.Scene {
    constructor() {
        super('actOneScene')
    }

    init() {
        this.PLAYER_VELOCITY = 350
    }

    create() {
        // background
        this.cameras.main.setBackgroundColor(0x000000)
        this.store = this.add.rectangle(50, 50, width - 100, height - 200, 0x80A689).setOrigin(0)

        // set custom world bounds
        this.physics.world.setBounds(50, 50, width - 100, height - 200)

        // create player
        this.player = this.physics.add.sprite(width/2, height/2, 'player', 1).setScale(2)
        this.player.body.setCollideWorldBounds(true)
        this.player.body.setSize(32, 32).setOffset(8, 16)

        // set up keyboard input
        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
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

        // handle up/down
        if (cursors.up.isDown) {
            playerVector.y = -1
            playerDirection = 'up'
        } else if (cursors.down.isDown) {
            playerVector.y = 1
            playerDirection = 'down'
        }

        playerVector.normalize()

        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)

        let playerMovement
        playerVector.length() ? playerMovement = 'walk' : playerMovement = 'idle'

    }
}