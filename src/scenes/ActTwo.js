class ActTwo extends Phaser.Scene {
    constructor() {
        super('actTwoScene')
    }

    create() {
        this.wall = this.add.sprite(width/2, height/2, 'street-wall').setOrigin(0.5).setScale(1.9, 2.2)
        this.wall.play('wall-animate')

        // code adapted from Phaser Example: https://labs.phaser.io/view.html?src=src/game%20objects/render%20texture/paint.js
        const paintStroke = this.add.renderTexture(480, 245, 960, 490)

        this.input.on('pointermove', pointer => {
            if (pointer.isDown) {
                paintStroke.draw('paint', pointer.x - 32, pointer.y - 32)
            }
        }, this)

        // set up keyboard input
        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start("actOneScene")
        }
    }
}