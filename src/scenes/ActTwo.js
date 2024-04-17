class ActTwo extends Phaser.Scene {
    constructor() {
        super('actTwoScene')
    }

    create() {
        this.wall = this.add.sprite(width/2, height/2, 'street-wall').setOrigin(0.5).setScale(1.9, 2.2)
        this.wall.play('wall-animate')

        this.palette = this.add.sprite(120, height - 100, 'cardboard').setScale(2).setOrigin(0.5).setDepth(3)

        this.paintColor = 'purple'

        // code adapted from Phaser Example: https://labs.phaser.io/view.html?src=src/game%20objects/render%20texture/paint.js
        const paintStroke = this.add.renderTexture(480, 245, 960, 490)

        this.input.on('pointermove', pointer => {
            if (pointer.isDown) {
                paintStroke.draw(`${this.paintColor}-paint`, pointer.x - 32, pointer.y - 32)
            }
        }, this)

        this.purplePaint = this.add.sprite(150, height - 130, 'purple-paint').setScale(1.5).setDepth(4).setInteractive()
        this.purplePaint.on('pointerdown', () => {
            this.paintColor = 'purple'
        })

        this.bluePaint = this.add.sprite(150, height - 70, 'blue-paint').setScale(1.5).setDepth(4).setInteractive()
        this.bluePaint.on('pointerdown', () => {
            this.paintColor = 'blue'
        })

        this.input.on('pointermove', pointer => {
            if (pointer.isDown && pointer.x) {

            }
        }, this)

        // set up keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keys.space)) {
            this.scene.start("actOneScene")
        }
    }
}