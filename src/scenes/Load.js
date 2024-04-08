class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // load assets
        this.load.path = './assets/'

    }

    create() {
        // proceed once loading completes
        this.scene.start('actOneScene')
    }
}