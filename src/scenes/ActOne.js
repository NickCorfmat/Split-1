class ActOne extends Phaser.Scene {
    constructor() {
        super('actOneScene')
    }

    init() {
        this.beerAcquired = false
        this.screenWidth = 720
        this.screenHeight = 480
    }

    create() {
        game.scale.resize(this.screenWidth, this.screenHeight)
        // set up keyboard input
        this.keys = this.input.keyboard.createCursorKeys()

        // set custom world bounds
        this.physics.world.setBounds(20, 140, this.screenWidth - 40, this.screenHeight - 140)

        // store setup
        this.add.sprite(0, 0, 'store').setOrigin(0).setScale(3.2)
        let aisle1 = this.physics.add.sprite(300, 140, 'aisle-1').setOrigin(0.5).setScale(1.5).setImmovable(true).setDepth(1)
        aisle1.body.setSize(90, 30).setOffset(5, 20)
        let aisle2 = this.physics.add.sprite(620, 140, 'aisle-2').setOrigin(0.5).setScale(1.5).setImmovable(true).setDepth(1)
        aisle2.body.setSize(90, 30).setOffset(5, 20)
        let aisle3 = this.physics.add.sprite(150, 270, 'aisle-3').setOrigin(0.5).setScale(1.5).setImmovable(true).setDepth(3)
        aisle3.body.setSize(90, 30).setOffset(5, 20)
        let aisle4 = this.physics.add.sprite(150, 380, 'aisle-2').setOrigin(0.5).setScale(1.5).setImmovable(true).setDepth(5)
        aisle4.body.setSize(90, 30).setOffset(5, 20)
        let aisle5 = this.physics.add.sprite(380, 380, 'aisle-1').setOrigin(0.5).setScale(1.5).setImmovable(true).setDepth(5)
        aisle5.body.setSize(90, 30).setOffset(5, 20)

        let liquorStand1 = this.physics.add.sprite(85, 140, 'liquor-stand-2').setOrigin(0.5).setScale(1.5).setImmovable(true).setDepth(1)
        liquorStand1.body.setSize(59, 30).setOffset(0, 20)
        let liquorStand2 = this.physics.add.sprite(500, 140, 'liquor-stand-1').setOrigin(0.5).setScale(1.5).setImmovable(true).setDepth(1)
        liquorStand2.body.setSize(59, 30).setOffset(0, 20)
        let liquorStand3 = this.physics.add.sprite(350, 270, 'liquor-stand-2').setOrigin(0.5).setScale(1.5).setImmovable(true).setDepth(3)
        liquorStand3.body.setSize(59, 30).setOffset(0, 20)

        let stand1 = this.physics.add.sprite(410, 140, 'stand-1').setOrigin(0.5).setScale(1.5).setImmovable(true).setDepth(1)
        stand1.body.setSize(37, 30).setOffset(5, 20)
        let stand2 = this.physics.add.sprite(430, 270, 'stand-2').setOrigin(0.5).setScale(1.5).setImmovable(true).setDepth(3)
        stand2.body.setSize(37, 30).setOffset(5, 20)
        let stand3 = this.physics.add.sprite(570, 270, 'stand-1').setOrigin(0.5).setScale(1.5).setImmovable(true).setDepth(3)
        stand3.body.setSize(37, 30).setOffset(5, 20)

        let beerKeg = this.physics.add.sprite(180, 150, 'beer-keg').setOrigin(0.5).setScale(1.7).setImmovable(true)
        beerKeg.body.setSize(35, 30).setOffset(2, 0)
        let beer = this.physics.add.sprite(180, 100, 'beer').setOrigin(0.5).setScale(1.7).setImmovable(true)

        let cashRegister = this.physics.add.sprite(620, 400, 'cashier').setOrigin(0.5).setScale(1.3).setImmovable(true)

        this.shelves = this.add.group([aisle1, aisle2, aisle3, aisle4, aisle5, liquorStand1, liquorStand2, liquorStand3, stand1, stand2, stand3, beerKeg, cashRegister])

        // create player
        this.player = new Player(this, this.screenWidth - 200, this.screenHeight - 50, 'player', 0, 'up')

        this.physics.add.collider(this.player, this.shelves)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keys.space)) {
            this.scene.start("introScene")
        }

        if (this.player.y >= 380) {
            this.player.setDepth(6)
        } else if (this.player.y < 380 && this.player.y >= 270) {
            this.player.setDepth(4)
        } else {
            this.player.setDepth(2)
        }

        this.playerFSM.step()
    }
}