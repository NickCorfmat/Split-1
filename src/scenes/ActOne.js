class ActOne extends Phaser.Scene {
    constructor() {
        super('actOneScene')
    }

    init() {
        this.beerAcquired = false
    }

    create() {
        // set up keyboard input
        this.keys = this.input.keyboard.createCursorKeys()

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
        this.player = new Player(this, width - 200, 500, 'player', 0, 'down')

        this.physics.add.collider(this.player, this.shelves)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keys.space)) {
            this.scene.start("introScene")
        }

        if (this.player.y >= 420) {
            this.player.setDepth(6)
        } else if (this.player.y < 420 && this.player.y >= 280) {
            this.player.setDepth(4)
        } else {
            this.player.setDepth(2)
        }

        this.playerFSM.step()
    }
}