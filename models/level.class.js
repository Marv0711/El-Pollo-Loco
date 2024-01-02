class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectingObject;
    coins;
    statusbar;
    levelEndX = 2700;

    constructor(enemies, clouds, backgroundObjects, collectingObject, statusbar){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectingObject = collectingObject;
        this.statusbar = statusbar;
    }
}