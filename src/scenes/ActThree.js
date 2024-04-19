class ActThree extends Phaser.Scene {
    constructor() {
        super('actThreeScene')
    }

    init() {
        // QTE value
        this.wait = 90
        this.starting_waiting_time = this.wait
        this.barlenght = 300
        this.waiting_time = 0
        this.waiting_time_before_start = 30
        // event value
        this.slow = false;
        this.kill = false;
        this.eventstart = false
        //background 
        this.background_1_speed = 1
        this.background_2_speed = 3
        // dialogue
        this.progress = 0
        // character move speed
        this.speed = 10;
    }

    create() {
        // input
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        //background
        this.cameras.main.setBackgroundColor(0x404040)
        this.background1 = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'scrolling-2').setOrigin(0, 0).setScale(1) // .setDepth(1)
        // source: https://www.deviantart.com/plbeg/art/Street-Pixel-Art-739703149
        this.background2 = this.add.tileSprite(0, 100, this.game.config.width, this.game.config.height, 'scrolling-1').setOrigin(0, 0).setScale(2) // .setDepth(2)

        // clerk
        this.clerk = this.add.image(this.game.config.width + 100, this.game.config.height - 320, 'clerk').setScale(5)
        this.target = this.add.image(this.game.config.width + 100, this.game.config.height - 320, 'target').setScale(2)

        // car windows
        this.add.image(0, 0, 'window').setOrigin(0).setScale(6.4) // .setDepth(3)

        // story text background
        this.textrect = this.add.rectangle(10, this.game.config.height - 120, this.game.config.width - 20, 100, 0x000000).setOrigin(0, 0)
        this.textrect.setStrokeStyle(2, 0xffffff)
        // story text
        this.speakername = this.add.bitmapText(15, this.game.config.height - 110, 'pixel-white',"Unknown : ", 15).setOrigin(0, 0)
        this.speaking = this.add.bitmapText(15, this.game.config.height - 80, 'pixel-white',"Do you still remember the clerk you met before?", 15).setOrigin(0, 0)
        this.space = this.add.bitmapText(this.game.config.width - 120, this.game.config.height - 40, 'pixel-white', "[SPACE]", 15).setOrigin(0, 0)

        // event bar
        this.bar = this.add.graphics()
        this.wait_text = this.add.bitmapText(this.game.config.height / 2 + this.barlenght + 25, this.game.config.width / 2 - 10, 'pixel-white', "", 24)
        // this.bar.x = this.game.config.width / 2
        // this.bar.y = this.game.config.height / 2

        
        

    }

    update() {
        if (this.slow == true){
            this.drawthebar()
            this.wait -= 1;
        }
        if (this.waiting_time > this.waiting_time_before_start && this.eventstart == true){
            this.speed = 1;
            this.slow = true;
            this.target.x = this.clerk.x - 20
            this.target.y = this.clerk.y - 90
            
        }
        if (this.clerk.x <= this.game.config.width / 2){
            this.speed = 1;
        }
        if (this.eventstart == true && this.progress > 2){
            this.clerk.x -= this.speed;
        }
        if (Phaser.Input.Keyboard.JustDown(this.keySPACE)){
            if (this.eventstart == true && this.waiting_time > this.waiting_time_before_start){
                if (this.slow == false && this.kill == false){
                    this.slow = true;
                }else if (this.wait > 0){
                    this.kill = true;
                    this.slow = false;
                    this.eventstart = false

                    this.add.rectangle(this.game.config.width / 2, this.game.config.height /2, this.game.config.width, this.game.config.height, 0xff0000)

                    this.add.bitmapText(this.game.config.width / 4, this.game.config.height /2, 'pixel-white', "YOU KILL HIM", 48)
                }
            }
            this.progress += 1;
        }
        if (this.wait < 0 && this.kill == false){
            this.add.rectangle(this.game.config.width / 2, this.game.config.height /2, this.game.config.width, this.game.config.height, 0x00ff00)
            this.add.bitmapText(50, this.game.config.height /2, 'pixel-white', "YOU NOT KILL HIM", 48)
        }

        // background moving
        this.background1.tilePositionX -= this.background_1_speed;
        this.background2.tilePositionX -= this.background_2_speed;

        // text update
        if (this.progress == 1){
            this.speakername.text = "Ponyboy :"
            this.speaking.text = "I still remember him, so what?"
        }
        if (this.progress == 2){
            this.speakername.text = "Unknown : "
            this.speaking.text = "Kill Him"
            this.eventstart = true
        }
        // story end
        if (this.progress > 2){
            // remove text box
            this.speakername.destroy()
            this.speaking.destroy()
            this.textrect.destroy()
            this.space.destroy()
            // make background move slow
            this.background_1_speed = 0.1
            this.background_2_speed = 1
            this.eventstart = true
            this.waiting_time += 1
        }

    }


    // QTE bar
    drawthebar(){
        // clear
        this.bar.clear();
        //  stroke
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.game.config.height / 2, this.game.config.width / 2, this.barlenght, 16);
        //  background
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.game.config.height / 2, this.game.config.width / 2 + 2, this.barlenght, 12);

        // color change
        if (this.wait < this.starting_waiting_time * 0.3)
        {
            this.bar.fillStyle(0xff0000);
        }
        else
        {
            this.bar.fillStyle(0x00ff00);
        }
        // fill color
        this.bar.fillRect(this.game.config.height / 2, this.game.config.width / 2 + 2, this.wait / this.starting_waiting_time * this.barlenght, 12);
        // text for remain time
        var remain = Math.round(((this.starting_waiting_time +this.waiting_time_before_start) / 6 - (this.waiting_time / 6))) / 10
        if (remain > 0.1){
            this.wait_text.text = remain
            if (Number.isInteger(remain)){
                this.wait_text.text += ".0"
            }
        }else{
            this.wait_text.text = 0 + ".0"
        }
    }

}
