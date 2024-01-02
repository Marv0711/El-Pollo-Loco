class Statusbar extends MovabaleObject {
    height = 60;
    width = 200;
    otherDirection = false;
    img;

    precentage = 100;

    statusbar_health = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ]

    statusbar_chilli = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ]

    statusbar_coin = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ]

    statusbar_boss = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ]

    /**
     * Represents a status bar with health, chilli, coin, and boss indicators.
     *
     * @param {number} y - The y-coordinate of the status bar.
     * @param {number} x - The x-coordinate of the status bar.
     * @param {number} startPercentage - The initial percentage value for the status indicators.
     * @param {string} name - The name associated with the status bar.
     */
    constructor(y, x, startPrecentage, name){
        super();
        this.loadImages(this.statusbar_health);
        this.loadImages(this.statusbar_chilli);
        this.loadImages(this.statusbar_coin);
        this.loadImages(this.statusbar_boss);
        this.setPrecentage(startPrecentage, name);

        this.y = y;
        this.x = x;
    }

    /**
     * Sets the percentage value for a specific status indicator and updates the corresponding image.
     *
     * @param {number} percentage - The percentage value to set for the status indicator.
     * @param {string} [name] - Optional parameter representing the name of the status indicator.
     */
    setPrecentage(precentage, name){
        if(name == undefined){

        }
        else{
            this.precentage = precentage;
            let path = this[`statusbar_${name}`][this.resolveImageIndex()];
            this.img = this.ImageCache[path];
        }
    }

    /**
     * Resolves the index of the image based on the current percentage value.
     *
     * @returns {number} - The index of the image corresponding to the current percentage value.
     */
    resolveImageIndex(){
        if (this.precentage === 100) {
            return 5;
        } else if (this.precentage >= 80) {
            return 4;
        } else if (this.precentage >= 60) {
            return 3;
        } else if (this.precentage >= 40) {
            return 2;
        } else if (this.precentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }


}
