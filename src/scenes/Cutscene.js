class Cutscene extends Phaser.Scene {
    constructor() {
        super('cutscene')
    }

    init(data) {
        this.gunStage = data.gunStage
        this.nextScene = data.nextScene
        this.text = ''
    }

    create() {
        game.scale.resize(960, 640)

        switch (this.gunStage) {
            case 1:
                this.text = 'will you do it...?'
                this.bgColor = 0x1c1c1c
                break
            case 2:
                this.text = 'you\'re nervous...'
                this.bgColor = 0x241a17
                break
            case 3:
                this.text = '\t\tI\'m unforgiving...'
                this.bgColor = 0x730000
                break
            default:
                break
        }

        // background
        this.cameras.main.setBackgroundColor(this.bgColor)
        this.cameras.main.fadeIn(3000, 0, 0, 0)

        // set up keyboard input
        this.keys = this.input.keyboard.createCursorKeys()

        this.pistol = this.add.sprite(width/2, height/2 - 40, `gun-${this.gunStage}`).setAlpha(0.5)

        this.instructionText = this.add.bitmapText(width/2, 410, 'pixel-gray', '', 24).setOrigin(0.5)

        this.tweens.add({
            targets: this.pistol,
            scale: {
                from: 2,
                to: 4
            },
            duration: 5000,
            ease: 'Linear',
            onComplete: () => {
                this.instructionText.text = this.text
                this.time.delayedCall((2000), () => {
                    this.add.bitmapText(width/2, height - 80, 'pixel-gray', 'Continue [Space]', 14).setOrigin(0.5)
                    this.input.keyboard.on('keydown-SPACE', function() {
                        this.scene.start(this.nextScene)
                    }, this)
                })
            }
        })
    }

    update() {

    }
}