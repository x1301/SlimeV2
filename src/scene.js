class scene extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/background.png');
        // At last image must be loaded with its JSON
        this.load.image('tiles', 'assets/tilesets/Test64x64.png');
        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Test64x64.json');
        this.load.image('eclairdash','assets/images/eclair.png')
        this.load.image('shuriken','assets/images/shuriken.png')
        this.load.spritesheet('idlebleu', 'assets/images/slimebleuidle1-Sheet-export.png',{ frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('idlefeu', 'assets/images/idlefeu1-Sheet-export.png',{ frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('walkbleu', 'assets/images/walkbleu1-Sheet-export.png',{ frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('walkfeu', 'assets/images/walk1-Sheet-export.png',{ frameWidth: 48, frameHeight: 48 });
    }

    create() {
        const map = this.make.tilemap({key: 'map'});


        const tileset = map.addTilesetImage('Test64x64', 'tiles');
        this.ciel = map.createLayer('ciel', tileset);
        this.bambou = map.createLayer('Bambou', tileset);
        this.bambou = map.createLayer('Bambou2', tileset);
        this.herb = map.createLayer('herbe', tileset);
        this.platforms = map.createLayer('Sol', tileset);

        this.collider = this.physics.add.group({
            allowGravity: false,
            immovable: true})
        map.getObjectLayer('collide').objects.forEach((collide) => {
             const rect = this.add.rectangle(collide.x+collide.width*0.5,collide.y+collide.height*0.5,collide.width,collide.height)
            this.collider.add(rect)
        });

        this.player = new Player(this);
        this.enemy = new Ennemi(this);

        this.cameras.main.startFollow(this.player.player);
        this.cameras.main.zoomTo(1.2);
        this.cameras.main.setRoundPixels(true);

        this.player.initKeyboard();
        this.enemy.walkEnemy();
    }

    update() {
        this.player.move();
        this.enemy.update();
    }
}