class ActTwo extends Phaser.Scene {
    constructor() {
        super('actTwoScene')
    }

    create() {
        this.wall = this.add.rectangle(0, 0, width, height - 150, 0xb5b5b5).setOrigin(0)

        // code adapted from Phaser Example: https://labs.phaser.io/view.html?src=src/game%20objects/render%20texture/paint.js
        const paintStroke = this.add.renderTexture(450, 275, 900, 550)

        this.input.on('pointermove', pointer => {
            if (pointer.isDown) {
                paintStroke.draw('paint', pointer.x - 32, pointer.y - 32)
            }
        }, this)
    }

    update() {

    }
}