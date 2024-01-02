class Chicken extends MovabaleObject{
    height = 100;
    width = 70;
    y = 340;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        buttom: 0,
    };
    energy = 5;

    normal_Images_Walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',

    ];

    small_Images_Walking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',

    ];

    /**
     * Represents an enemy character of a specific category with various animations and behaviors.
     *
     * @param {string} category - The category of the enemy character.
     */
    constructor(category){
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.giveChickenSpace();
        this.loadImages(this.normal_Images_Walking);
        this.loadImages(this.small_Images_Walking);
        this.x = window.lastX + 200 + Math.random() * 800;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate(category);
    }

    /**
     * Adjusts the position for the next chicken enemy, providing space based on the last x-coordinate.
     */
    giveChickenSpace(){
        if(!window.lastX){
            window.lastX = 50;
        }
        else{
            window.lastX += 100
        }
    }

    animate(category){
        if(category == undefined){}

        else{
            setInterval(() => {
                this.ChickenMovement();
            }, 1000 / 60)

            setInterval(() => {
                this.playChickenDeadOrWalkAnimation(category);
            }, 200)
        } 
    }

    /**
     * Manages the movement of the chicken enemy to the left if it is not dead.
     */
    ChickenMovement(){
        if(!this.isDead(this.energy)){
            this.moveLeft();
            this.otherDirection = false;
        }
    }

    /**
     * Plays the walking animation for the chicken enemy or displays the dead image based on its energy level.
     *
     * @param {string} category - The category of the chicken enemy.
     */
    playChickenDeadOrWalkAnimation(category){
        if(!this.isDead(this.energy)){
            this.playAnimation(this[`${category}_Images_Walking`]);
        }
        else{
            this.loadImg(`img/3_enemies_chicken/chicken_${category}/2_dead/dead.png`)
        }
    }
}