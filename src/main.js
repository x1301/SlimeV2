const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 600 ,
    heigth: 600,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1500 },
            debug: false,
        },
    },
    scene: new scene(),
};
const game = new Phaser.Game(config);