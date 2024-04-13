class Cutscene extends Phaser.Scene {
    constructor() {
        super('cutscene')
    }

    init() {//data) {
        //this.gunUpgrade = data
    }

    create() {
        // background
        this.cameras.main.setBackgroundColor(0x000000)

        this.cameras.main.fadeIn(3000, 0, 0, 0)

        // set up keyboard input
        cursors = this.input.keyboard.createCursorKeys()

        this.pistol = this.add.sprite(width/2, height/2 - 40, 'pistol').setAlpha(0.5)

        this.instructionText = this.add.bitmapText(width/2, 410, 'pixel-gray', '', 24).setOrigin(0.5)

        this.tweens.add({
            targets: this.pistol,
            scale: {
                from: 0.25,
                to: 0.75
            },
            duration: 5000,
            ease: 'Linear',
            onComplete: () => {
                this.instructionText.text = 'will you do it...?'
                this.time.delayedCall((2000), () => {
                    this.add.bitmapText(width/2, height - 80, 'pixel-gray', 'Continue [Space]', 14).setOrigin(0.5)
                    this.input.keyboard.on('keydown-SPACE', function() {
                        this.scene.start('actOneScene')
                    }, this)
                })
            }
        })
    }

    update() {

    }
}