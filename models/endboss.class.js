class Endboss extends MovabaleObject{
    height=500;
    width=300;
    y = -20;
    offset = {
        top: 0,
        left: 20,
        right: 0,
        buttom: 0,
    };
    energy = 100;
    attackCharacter = false;
    firstContact = false;
    i = 1;

    Images_Walking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    Images_Hurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    Images_Dead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    Images_Attack = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    Images_Alert = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    /**
     * Represents Endboss with walking, hurt, dead, attack, and alert animations.
     *
     */
    constructor(){
        super();
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Hurt);
        this.loadImages(this.Images_Dead);
        this.loadImages(this.Images_Attack);
        this.loadImages(this.Images_Alert);
        this.x = 2500;
        this.animate()
    }

    animate(){
        setInterval(() => {
            if(this.i < 9){
                this.playAttackAnimation(this.Images_Alert)
            }
            else{
                this.playFightWithCharacter();
            }

            if(this.attackCharacter){
                this.playAttackAnimation(this.Images_Attack);
            }

            if(world.character.x >= 2000 && !this.firstContact){
                this.firstContactWithCharacter();
            }
            this.i++
        }, 200)
    }

    /**
     * Manages the character's actions during a fight, including movement, hurt animation, and dead animation.
     */
    playFightWithCharacter(){
        if(!this.isHitting() && !this.isDead(this.energy) && this.firstContact){
            this.playMovementLeft();
        }
        else if(this.isHitting() && !this.isDead(this.energy)){
            this.playAnimation(this.Images_Hurt);
        }
        else if(this.isDead(this.energy)){
            this.playDeadAnimation(this.Images_Dead, 'img/4_enemie_boss_chicken/5_dead/G26.png');
        }
    }

    /**
     * Initiates left movement animation for the character.
     */
    playMovementLeft(){
        this.playAnimation(this.Images_Walking)
        this.speed = 25; 
        this.moveLeft();
        this.otherDirection = false;
    }

    /**
     * Marks the first contact with the character by initializing a counter and setting a flag.
     */
    firstContactWithCharacter(){
        this.i = 0;
        this.firstContact = true;
    }
}