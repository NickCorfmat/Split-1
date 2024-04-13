class ActOne extends Phaser.Scene {
    constructor() {
        super('actOneScene')
    }

    init() {
        this.PLAYER_VELOCITY = 150
    }

    create() {
        // set up keyboard input
        cursors = this.input.keyboard.createCursorKeys()

        // set custom world bounds
        this.physics.world.setBounds(20, 50, width - 40, height - 50)

        // store setup
        this.add.sprite(0, 0, 'store').setOrigin(0).setScale(3.2)
        let aisle1 = this.physics.add.sprite(200, 300, 'aisle-1').setOrigin(0.5).setScale(1.5).setImmovable(true)
        let aisle2 = this.physics.add.sprite(400, 300, 'aisle-2').setOrigin(0.5).setScale(1.5).setImmovable(true)
        let aisle3 = this.physics.add.sprite(600, 300, 'aisle-3').setOrigin(0.5).setScale(1.5).setImmovable(true)

        let aisle4 = this.physics.add.sprite(200, 450, 'aisle-3').setOrigin(0.5).setScale(1.5).setImmovable(true)
        let aisle5 = this.physics.add.sprite(400, 450, 'aisle-1').setOrigin(0.5).setScale(1.5).setImmovable(true)

        let beerKeg = this.physics.add.sprite(180, 150, 'beer-keg').setOrigin(0.5).setScale(1.7).setImmovable(true)
        let beer = this.physics.add.sprite(180, 100, 'beer').setOrigin(0.5).setScale(1.7).setImmovable(true)

        let cashRegister = this.physics.add.sprite(850, 500, 'cashier').setOrigin(0.5).setScale(1.5).setImmovable(true)

        this.shelves = this.add.group([aisle1, aisle2, aisle3, aisle4, aisle5, beerKeg, cashRegister])

        // create player
        this.player = this.physics.add.sprite(width - 200, 500, 'player').setOrigin(0.5).setScale(0.4)
        this.player.body.setCollideWorldBounds(true)
        this.player.body.setSize(50, 50)

        this.physics.add.collider(this.player, this.shelves)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start("actTwoScene")
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