class Character extends MovabaleObject{

    Images_Walking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    Images_Jumping = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    Images_Dead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',

    ];

    Images_Hurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    Images_Idle = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    world;
    speed = 10;
    walkingSound = new Audio('audio/walking_sound.mp3');
    jumpingSound = new Audio('audio/Jump.mp3');
    hitSound = new Audio('audio/hit.mp3');
    width = 150;
    energy = 100;
    firstDeadJump = true;
    lastMove = 0;

    /**
     * Represents a character with various animations and behaviors.
     *
     */
    constructor(){
        super().loadImg('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Jumping);
        this.loadImages(this.Images_Dead);
        this.loadImages(this.Images_Hurt);
        this.loadImages(this.Images_Idle);
        this.applyGarvity();
        this.animate();
    }

    animate(){
            setInterval(() => {
                this.AllMovements();
            }, 1000 / 60)

            setInterval(() => {
                this.playWalkOrHurtAnimation();
            }, 50)

            setInterval(() => {
                this.playDeadOrIdleAnimation();
            }, 210);

            setInterval(() => {
                this.playJumpAnimation();
            }, 180);
    }

    /**
     * Plays the appropriate walking or hurt animation based on the character's state.
     */
    playWalkOrHurtAnimation(){
        if(this.isHitting() && !this.isDead(this.energy)){
            this.lastMove = new Date().getTime();
            this.playAnimation(this.Images_Hurt);
            this.hitSound.play();
        }

        else if(this.world.keyboard.right && !this.isDead(this.energy) && !this.isInAir() || !this.isDead(this.energy) && this.world.keyboard.left && !this.isInAir()) {
            this.playAnimation(this.Images_Walking);
        }
    }

/**
 * Plays the appropriate dead or idle animation based on the character's state.
 */    
    playDeadOrIdleAnimation(){
        if(this.isDead(this.energy)){
            this.playDeadAnimation(this.Images_Dead, 'img/2_character_pepe/5_dead/D-57.png');
            if(this.firstDeadJump){
                this.jump();
                this.firstDeadJump = false;
            }
        }
        else if(!this.updateLastMove() && !this.isInAir()){
            this.playAnimation(this.Images_Idle);
        }
    }

    /**
     * Plays the jump animation if the character is in the air and not dead.
     */
    playJumpAnimation(){
        if(this.isInAir() && !this.isDead(this.energy)){
            this.playAnimation(this.Images_Jumping);
        }
    }

    /**
     * Handles all character movements based on keyboard input and updates the camera position.
     */
    AllMovements(){
        this.walkingSound.pause();
        if(this.world.keyboard.right && this.x < this.world.level.levelEndX && !this.isDead(this.energy)){
            this.movementRight();
        }
        if(this.world.keyboard.left && this.x > 0 && !this.isDead(this.energy)){
            this.movementLeft();
        }
        if(this.world.keyboard.space && !this.isInAir() && !this.isDead(this.energy)){
            this.movementJump();
        }
        this.world.cameraX = -this.x + 100;
    }

    /**
     * Initiates the right movement for the character, updating position, recording the last movement time, and playing walking sound.
     */
    movementRight(){
        this.moveRight();
        this.lastMove = new Date().getTime();
        if(!this.isInAir()){
            this.walkingSound.play();
        }
    }

    /**
     * Initiates the left movement for the character, updating position, recording the last movement time, and playing walking sound.
     */
    movementLeft(){
        this.moveLeft();
        this.lastMove = new Date().getTime();
        if(!this.isInAir()){
            this.walkingSound.play();
        }
    }
    /**
     * Initiates the jump movement for the character, updating position, recording the last movement time, and playing jumping sound.
     */
    movementJump(){
        this.jump();
        this.lastMove = new Date().getTime();
        this.jumpingSound.play();
    }

    /**
     * Checks if a short time has passed since the last recorded movement.
     * @returns {boolean} - True if less than 0.5 seconds have passed since the last movement, otherwise false.
     */
    updateLastMove(){
        let timepassed = new Date().getTime() - this.lastMove;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }
}