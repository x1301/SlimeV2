class Player {
    
    constructor(scene) {
        this.scene = scene
        this.player = this.scene.physics.add.sprite(50, 1000, 'idlebleu');
        this.player.setBounce(0.1,0.1);
        this.player.setCollideWorldBounds(false);
        this.scene.physics.add.collider(this.player, this.scene.collider);
        this.scene.physics.add.overlap(this.player, this.scene.enemy);
        this.lockDash=0

        this.scene.anims.create(
            {
                key: 'idlebleu',
                frames: this.scene.anims.generateFrameNumbers('idlebleu', { start: 1, end: 6 }),
                frameRate: 12,
                repeat: 0,
            });

        this.scene.anims.create(
            {
                key: 'walkbleu',
                frames: this.scene.anims.generateFrameNumbers('walkbleu', { start: 1, end: 7 }),
                frameRate: 16,
                repeat: 0,
            });

        this.scene.anims.create(
            {
                key: 'wallkbleu',
                frames: this.scene.anims.generateFrameNumbers('walkbleu', { start: 1, end: 7 }),
                frameRate: 24,
                repeat: 0,
            });


        this.scene.input.on('pointerdown', (pointer)=> {
            if (pointer.leftButtonDown()){
                new Shuriken(this.scene,pointer.worldX,pointer.worldY);
            }
        });

        this.saut=0;
        this.player.eclair=1;

    }

    bipbip(){
        const startColor = Phaser.Display.Color.ValueToColor(0xffffff)
        const endColor = Phaser.Display.Color.ValueToColor(0xff0000)

        this.scene.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 100,
            repeat: 2,
            ease: Phaser.Math.Easing.Sine.InOut,
            yoyo:true,
            onUpdate: tween => {
                const value = tween.getValue()
                const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
                    startColor,
                    endColor,
                    100,
                    value
                )
                const color = Phaser.Display.Color.GetColor(
                    colorObject.r,
                    colorObject.g,
                    colorObject.b
                )
                this.player.setTint(color)
            }
        })
    }

    jump(){
        if(this.pokemon){
        }
        else{
            this.pokemon = true
            if(this.player.body.onFloor()){
                this.player.setVelocityY(-600)
                this.saut =1 ;
            }
            if(this.saut === 1 && !this.player.body.onFloor()){
                this.player.setVelocityY(-800)
                this.saut = 0;
            }
        }
    }

    moveRight(){
        this.player.setVelocityX(400*this.player.eclair);
        this.player.setFlipX(false);
        if(this.shiftDown){
            this.player.play('wallkbleu',true)
            this.player.setVelocityX(this.player.body.velocity.x*2);
        }
        else {
            this.player.play('walkbleu',true)
        }
    }

    dashL(){
        if(this.qDown && this.spaceDown) {
            if (this.lockDash === 0) {
                this.lockDash = 1
                let me = this;
                this.tween = this.scene.tweens.add({
                    targets: this.player,
                    eclair: '+=8',
                    ease: 'Circ.easeInOut',
                    duration: 250,
                    onStart: function () {
                        //me.player.play('eclairdash', true)
                    },
                    onComplete: function () {
                        me.player.eclair = 1
                        me.spaceDown = false;
                        me.lockDash = 0
                        me.scene.cameras.main.shake()
                    }
                });
            }
        }
    }

    dashR(){
        if(this.dDown && this.spaceDown) {
            if (this.lockDash === 0) {
                this.lockDash = 1
                let me = this;
                this.tween = this.scene.tweens.add({
                    targets: this.player,
                    eclair: '+=8',
                    ease: 'Circ.easeInOut',
                    duration: 250,
                    onStart: function () {
                        //me.player.play('eclairdash', true)
                    },
                    onComplete: function () {
                        me.player.eclair = 1
                        //me.player.play('idle', true)
                        me.spaceDown = false;
                        me.lockDash = 0
                        me.scene.cameras.main.shake()
                    }
                });
            }
        }
    }


    moveLeft(){
        this.player.setVelocityX(-400*this.player.eclair);
        if(this.shiftDown){
            this.player.play('wallkbleu',true)
            this.player.setVelocityX(this.player.body.velocity.x*2);
        }
        else {
            this.player.play('walkbleu',true)
        }
        this.player.setFlipX(true);
    }


    stop(){
        this.player.setVelocityX(0);
        this.player.play('idlebleu',true)
    }

    move(){
        if(this.qDown && this.zDown ){
            this.jump();
            return;
        }
        if(this.dDown && this.zDown ){
            this.jump();
            return;
        }
        if(this.qDown && this.spaceDown ){
            this.dashL();
            return;
        }
        if(this.dDown && this.spaceDown ){
            this.dashR();
            return;
        }
        switch (true) {
            case this.qDown:
                this.moveLeft();
                break;
            case this.dDown:
                this.moveRight();
                break;
            case this.zDown :
                this.jump();
                break;
            case this.eDown :
                this.bipbip();
                break;
            case this.player.body.onFloor():
                this.stop();
                break;
        }
    }

    initKeyboard() {
        let me = this;
        this.scene.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.Z:
                    me.zDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.qDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.dDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    me.shiftDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    me.spaceDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.E:
                    me.eDown=true;
                    break;
            }
        });
        this.scene.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.Z:
                    me.zDown=false;
                    me.pokemon=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.qDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.dDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    me.shiftDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    me.spaceDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.E:
                    me.eDown=false;
                    break;
            }
        });
    }
    initKeyboardQWERTY() {
        let me = this;
        this.scene.input.on('pointerup', function (pointer) {
            if (pointer.leftButtonReleased()) {

                me.leftMouseDown = true;

            }
        });
    }

}



