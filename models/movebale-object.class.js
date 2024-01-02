class MovabaleObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    offset = {
        top: 190,
        left: 50,
        right: 50,
        buttom: 120,
    };
    energy = 100;
    money = 0;
    mana = 0;
    lastHit = 0;
    currentImage = 0;
    deadCounterImg = 0;
    statusBarCounterImg = 0;
    bottleCounterImg = 0;
    endbossCounterImg = 0;
    IntervalForDelete = [];

    /**
     * Checks if the character is colliding with another object.
     *
     * @param {Object} obj - The object to check for collision.
     * @returns {boolean} - Returns true if a collision is detected, otherwise false.
     */
    isColliding (obj) {
        return  this.x + this.width - this.offset.right + 30 > obj.x + obj.offset.left &&  
                this.y + this.height - this.offset.buttom + 40 > obj.y + obj.offset.top && 
                this.x + this.offset.left < obj.x + obj.width - obj.offset.right + 30 &&
                this.y + this.offset.top < obj.y + obj.height - obj.offset.buttom + 90
    }

    isDead(energy){
        return energy == 0;
    }

    /**
     * Inflicts damage to the character's energy and records the time of the last hit.
     *
     * @param {number} damage - The amount of damage to be inflicted.
     */
    hit(damage){
        this.energy -= damage;
        if(this.energy <= 0){
            this.energy = 0;
        }
        else{
            this.lastHit = new Date().getTime()
        }
    }

    /**
     * Inflicts damage to a chicken enemy's energy and records the time of the last hit.
     *
     * @param {Object} enemy - The chicken enemy to be attacked.
     */
    killChicken(enemy){
        if(enemy.energy >= 20){
            enemy.energy -= 25;
            enemy.lastHit = new Date().getTime()
        }
        else{
            enemy.energy -= 5;
        }
        if(enemy.energy <= 0){
            enemy.energy = 0;
        }
    } 

    /**
     * Increases the collection value for a specific element and ensures it does not exceed the maximum limit.
     *
     * @param {string} collectingElement - The element for which the collection value is increased.
     */
    collect(collectingElement){
        this[`${collectingElement}`] += 20;
        if(this[`${collectingElement}`] >= 100){
            this[`${collectingElement}`] = 100;
        }
    }

    /**
     * Checks if the character is currently in a hitting state based on the time passed since the last hit.
     *
     * @returns {boolean} - Returns true if the character is hitting, otherwise false.
     */
    isHitting(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /**
     * Applies gravity to the Object, causing it to fall when in the air.
     */
    applyGarvity(){
        let Interval1 = setInterval(() => {
            if(this.isInAir() || this.speedY > 0){
                this.y -= this.speedY;
                if(this.y > 100 && this instanceof Character){
                    this.y = 100;
                }
                this.speedY -= this.acceleration = 1;
            }
        }, 1000 / 25);
        this.IntervalForDelete.push(Interval1);
    }

    /**
     * Checks if the character or throwable object is currently in the air.
     *
     * @returns {boolean} - Returns true if the object is in the air, otherwise false.
     */
    isInAir(){
        if(this instanceof throwableObject){
            return true;
        }
        else{
            return this.y < 100 
        }
    }

    /**
     * Plays an animation by cycling through a series of images.
     * @param {string[]} images - An array of image paths representing the animation frames.
     */
    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.ImageCache[path];
        this.currentImage++;
    }

    /**
     * Plays a sequence of dead animation images, with the last image specified as the final state.
     *
     * @param {string[]} images - An array of paths to dead animation images.
     * @param {string} lastImg - The path to the last image representing the final state.
     */
    playDeadAnimation(images, lastImg){
        let i = this.deadCounterImg % images.length;
        let path = images[i];
        this.img = this.ImageCache[path];
        this.deadCounterImg++;

        if (this.deadCounterImg >= images.length) {
            this.img = this.ImageCache[lastImg]
        }
    }

    /**
     * Plays a sequence of bottle animation images.
     *
     * @param {string[]} images - An array of paths.
     */
    playBottleAnimation(images){
        let i = this.bottleCounterImg % images.length;
        let path = images[i];
        this.img = this.ImageCache[path];
        this.bottleCounterImg++;
    }

    /**
     * Plays a sequence of attack animation images.
     *
     * @param {string[]} images - An array of paths.
     */
    playAttackAnimation(images){
        let i = this.endbossCounterImg % images.length;
        let path = images[i];
        this.img = this.ImageCache[path];
        this.endbossCounterImg++;
    }

    /**
     * Initiates a jump with a specified vertical speed or defaults to a predefined speed if not provided.
     *
     * @param {number} [speedY] - Optional parameter representing the vertical speed of the jump.
     */
    jump(speedY){
        if(speedY == undefined){
            this.speedY = 15;  
        }
        else{
            this.speedY = speedY;
        }
    }

    /**
     * Moves the character to the right based on its current speed.
     */
    moveRight(){
        this.x += this.speed
        this.otherDirection = false;
    }

    /**
     * Moves the character to the left based on its current speed.
     */
    moveLeft(){
        this.x -= this.speed
        this.otherDirection = true;
    }
}