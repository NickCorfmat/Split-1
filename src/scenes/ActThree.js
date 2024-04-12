class ActThree extends Phaser.Scene {
    constructor() {
        super('actThreeScene')
    }

    init() {
        // QTE value
        this.wait = 90
        this.starting_waiting_time = this.wait
        this.barlenght = 200
        this.waiting_time = 0
        this.waiting_time_before_start = 20
        // event value
        this.slow = false;
        this.kill = false;
        this.eventstart = false
        //background 
        this.background_1_speed = 0.5
        this.background_2_speed = 20
        // dialogue
        this.progress = 0
    }

    create() {
        // input
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        //background
        this.background1 = this.add.tileSprite(0, 0, 900, 700, 'scrolling').setOrigin(0, 0)
        this.background2 = this.add.tileSprite(0, 0, 900, 700, 'scrolling2').setOrigin(0, 0)

        // story text background
        this.textrect = this.add.rectangle(10, this.game.config.height - 120, this.game.config.width - 20, 100, 0x000000).setOrigin(0, 0)
        // story text
        this.speakername = this.add.text(15, this.game.config.height - 110, "main character:").setOrigin(0, 0)
        this.speaking = this.add.text(15, this.game.config.height - 80, "something happend?").setOrigin(0, 0)
        this.space = this.add.text(this.game.config.width - 100, this.game.config.height - 40, "[SPACE]").setOrigin(0, 0)

        // event bar
        this.bar = this.add.graphics()
        this.wait_text = this.add.text(this.game.config.height / 2 + 250, this.game.config.width / 2, "", { fontSize: 24 })
        // this.bar.x = this.game.config.width / 2
        // this.bar.y = this.game.config.height / 2

    }

    update() {
        if (this.slow == true){
            this.drawthebar()
            this.wait -= 1;
        }
        if (this.waiting_time > this.waiting_time_before_start && this.eventstart == true){
            this.slow = true;
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)){
            if (this.eventstart == true && this.waiting_time > this.waiting_time_before_start){
                if (this.slow == false && this.kill == false){
                    this.slow = true;
                }else if (this.wait > 0){
                    this.kill = true;
                    this.slow = false;
                    this.eventstart = false

                    this.add.rectangle(this.game.config.width / 2, this.game.config.height /2, this.game.config.width, this.game.config.height, 0xff0000)

                    this.add.text(this.game.config.width / 3, this.game.config.height /2, "YOU KILL HIM", { fontSize: 48 })
                }
            }
            this.progress += 1
        }
        if (this.wait < 0 && this.kill == false){
            this.add.rectangle(this.game.config.width / 2, this.game.config.height /2, this.game.config.width, this.game.config.height, 0x00ff00)
            this.add.text(this.game.config.width / 3, this.game.config.height /2, "YOU NOT KILL HIM", { fontSize: 48 })
        }

        // background moving
        this.background1.tilePositionX -= this.background_1_speed;
        this.background2.tilePositionX -= this.background_2_speed;

        // text update
        if (this.progress == 1){
            this.speakername.text = "unknowen" + ": "
            this.speaking.text = "what?"
        }
        if (this.progress == 2){
            this.speakername.text = "main character" + ": "
            this.speaking.text = "nothing"
            this.eventstart = true
        }
        if (this.progress > 2){
            this.speakername.destroy()
            this.speaking.destroy()
            this.textrect.destroy()
            this.space.destroy()
            this.background_1_speed = 0.1
            this.background_2_speed = 1
            this.eventstart = true
            this.waiting_time += 1
        }

    }


    // QTE bar
    drawthebar(){
        this.bar.clear();
        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.game.config.height / 2, this.game.config.width / 2, this.barlenght, 16);
        //  Health
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.game.config.height / 2, this.game.config.width / 2 + 2, this.barlenght, 12);
        if (this.wait < this.starting_waiting_time * 0.25)
        {
            this.bar.fillStyle(0xff0000);
        }
        else
        {
            this.bar.fillStyle(0x00ff00);
        }

        this.bar.fillRect(this.game.config.height / 2, this.game.config.width / 2 + 2, this.wait / this.starting_waiting_time * this.barlenght, 12);
        var remind = Math.round(((this.starting_waiting_time +this.waiting_time_before_start) / 6 - (this.waiting_time / 6))) / 10
        if (remind > 0.1){
            this.wait_text.text = remind
            if (Number.isInteger(remind)){
                this.wait_text.text += ".0"
            }
        }else{
            this.wait_text.text = 0 + ".0"
        }
    }

    

}