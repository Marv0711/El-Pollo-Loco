class throwableObject extends MovabaleObject{

    rotation_Bottle = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    splash_Bottle = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    splash = false;
    lastX = 0;
    lastY = 0;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        buttom: 0,
    };

    /**
     * Represents a rotating bottle that can be thrown, creating a splash animation.
     *
     * @param {number} x - The x-coordinate of the rotating bottle.
     * @param {number} y - The y-coordinate of the rotating bottle.
     * @param {boolean} otherDirection - Flag indicating the direction of the rotating bottle.
     */
    constructor(x, y, otherDirection){
        super().loadImages(this.rotation_Bottle);
        this.otherDirection = otherDirection;
        this.loadImages(this.splash_Bottle);
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.throw(x, y, otherDirection);
        this.animation()
        this.applyGarvity();
    }

    /**
     * Throws the rotating bottle with a specified x-coordinate, y-coordinate, and direction.
     *
     * @param {number} x - The x-coordinate for throwing the rotating bottle.
     * @param {number} y - The y-coordinate for throwing the rotating bottle.
     * @param {boolean} otherDirection - Flag indicating the throwing direction.
     */
    throw(x, y, otherDirection){ 
        this.x = x;
        this.y = y;
        this.speedY = 20;

        this.renderXForThrowDirection(otherDirection);
    }

    animation(){
        setInterval(() => {
            if(!this.splash) {
                this.playAnimation(this.rotation_Bottle)
            }
            if(this.splash) {
                this.playBottleAnimation(this.splash_Bottle)
                this.y = this.lastY;
                this.x = this.lastX;
                this.IntervalForDelete.forEach(clearInterval);
            }
        }, 100);

    }

    /**
     * Renders a horizontal movement animation based on the throw direction.
     * @param {boolean} otherDirection - Indicates whether the throw direction is opposite to the default.
     */
    renderXForThrowDirection(otherDirection){
        let Interval2;
        
        if(!otherDirection){
            Interval2 = setInterval(() => {
                this.x += 5;
            }, 25);
        }
        else{
            this.x -= 100;
            Interval2 = setInterval(() => {
                this.x -= 5;
            }, 25);
        }
        this.IntervalForDelete.push(Interval2);
    }
}