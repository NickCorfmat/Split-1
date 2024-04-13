class ActOne extends Phaser.Scene {
    constructor() {
        super('actOneScene')
    }

    init() {
        this.PLAYER_VELOCITY = 150
        this.beerAcquired = false
    }

    create() {
        // set up keyboard input
        cursors = this.input.keyboard.createCursorKeys()

        // set custom world bounds
        this.physics.world.setBounds(20, 140, width - 40, height - 120)

        // store setup
        this.add.sprite(0, 0, 'store').setOrigin(0).setScale(3.2)
        let aisle1 = this.physics.add.sprite(200, 300, 'aisle-1').setOrigin(0.5).setScale(1.5).setImmovable(true).setDepth(3)
        aisle1.body.setSize(90, 20).setOffset(5, 40)
        let aisle2 = this.physics.add.sprite(400, 300, 'aisle-2').setOrigin(0.5).setScale(1.5).setImmovable(true).setDepth(3)
        aisle2.body.setSize(90, 20).setOffset(5, 40)
        let aisle3 = this.physics.add.sprite(600, 300, 'aisle-3').setOrigin(0.5).setScale(1.5).setImmovable(true).setDepth(3)
        aisle3.body.setSize(90, 20).setOffset(5, 40)

        let aisle4 = this.physics.add.sprite(200, 450, 'aisle-3').setOrigin(0.5).setScale(1.5).setImmovable(true).setDepth(5)
        aisle4.body.setSize(90, 20).setOffset(5, 40)
        let aisle5 = this.physics.add.sprite(400, 450, 'aisle-1').setOrigin(0.5).setScale(1.5).setImmovable(true).setDepth(5)
        aisle5.body.setSize(90, 20).setOffset(5, 40)

        let beerKeg = this.physics.add.sprite(180, 150, 'beer-keg').setOrigin(0.5).setScale(1.7).setImmovable(true)
        beerKeg.body.setSize(35, 30).setOffset(2, 0)
        let beer = this.physics.add.sprite(180, 100, 'beer').setOrigin(0.5).setScale(1.7).setImmovable(true)

        let cashRegister = this.physics.add.sprite(850, 500, 'cashier').setOrigin(0.5).setScale(1.5).setImmovable(true)

        this.shelves = this.add.group([aisle1, aisle2, aisle3, aisle4, aisle5, beerKeg, cashRegister])

        // create player
        this.player = this.physics.add.sprite(width - 200, 500, 'player').setOrigin(0.5).setScale(0.4).setDepth(6)
        this.player.body.setCollideWorldBounds(true)
        this.player.body.setSize(50, 50).setOffset(300, 400)

        this.physics.add.collider(this.player, this.shelves)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start("actTwoScene")
        }

        if (this.player.y >= 420) {
            this.player.setDepth(6)
        } else if (this.player.y < 420 && this.player.y >= 280) {
            this.player.setDepth(4)
        } else {
            this.player.setDepth(2)
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