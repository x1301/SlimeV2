class Ennemi {


    constructor(scene) {
        this.scene = scene
        this.enemy = this.scene.physics.add.sprite(400, 300, 'walkfeu');
        this.scene.physics.add.collider(this.enemy, this.scene.collider);
        this.scene.physics.add.collider(this.enemy, this.scene.player.player);
        this.enemy.setVelocityX(-200, 200)

        this.sprite=this.scene.physics.add.sprite(500,200,'idlefeu')
        this.scene.physics.add.collider(this.sprite,this.scene.collider)
        this.projectil=false

        this.scene.anims.create(
            {
                key: 'walkfeu',
                frames: this.scene.anims.generateFrameNumbers('walkfeu', { start: 1, end: 7 }),
                frameRate: 16,
                repeat: -1,
            });
        this.enemy.play('walkfeu')

        this.scene.anims.create(
            {
                key: 'idlefeu',
                frames: this.scene.anims.generateFrameNumbers('idlefeu', { start: 1, end: 7 }),
                frameRate: 12,
                repeat: -1
            });
        this.sprite.play('idlefeu')
    }

    update(){
        if(Phaser.Math.Distance.Between(this.scene.player.player.x,this.scene.player.player.y,this.sprite.x,this.sprite.y)<500){
            this.fire()
        }
    }
    fire(){
        if(this.projectil===false) {
            this.projectil = true
            this.shurikenE = this.scene.physics.add.sprite(this.sprite.x, this.sprite.y, 'shuriken').setSize(50, 50).setDisplaySize(60, 60)
            this.shurikenE.body.setAllowGravity(false)
            this.scene.physics.moveTo(this.shurikenE, this.scene.player.player.x,this.scene.player.player.y)
            this.shurikenE.setVelocityX(this.shurikenE.body.velocity.x*5)
            this.shurikenE.setVelocityY(this.shurikenE.body.velocity.y*5)
            const life=this.scene.time.delayedCall(4000,()=>{
                this.shurikenE.destroy()
                this.projectil=false
                console.log('yolo')
            })
            this.scene.physics.add.collider(this.shurikenE, this.scene.player.player, (shurikenE, player) => {
                shurikenE.destroy()
                // player.body.enable=false
                // player.visible=false
                this.projectil=false
            }, null, this)
        }
    }

    walkEnemy() {
        this.tween = this.scene.tweens.add({
            targets: this.enemy,
            x: 600,
            duration: 3000,
            ease: 'Linear',
            delay: 1000,
            flipX: true,
            yoyo: true,
            repeat: -1
        });
        this.enemy.play('walkfeu')
        this.scene.physics.add.collider(this.enemy, this.scene.player.player);
    };

}