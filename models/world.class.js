class World{
    ctx;
    canvas;
    keyboard;
    cameraX = 0;
    character = new Character();
    chicken = new Chicken();
    endboss = new Endboss();
    icon = new Icon();
    screen = new Screen('img/9_intro_outro_screens/start/startscreen_1.png');
    throwableObjects = [];
    level;
    firstRun = true;
    gameWantedRestart = false;
    gameMusic = new Audio('audio/game_Music.mp3');
    bossMusic = new Audio('audio/boss_Fight.mp3');
    winMusic = new Audio('audio/winning.mp3');


    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.checkGameStart();
        this.checkGameEnd();
    }


    run(){
        this.checkCollision();
        this.checkCollecting();
        this.checkThrowing();
        this.checkCharacterPosition();
    }

    /**
     * Periodically checks for the start of the game and renders the start screen or initializes the game accordingly.
     */
    checkGameStart(){
        setInterval(() => {
            if(!this.screen.gameStarted){
                this.renderStartScreen();
            }
            else{
                if(this.firstRun){
                    this.StartGame();
                }
            }
        }, 200);
    }

    /**
     * Renders the start screen on the game canvas, sets a clickable cursor, and listens for a click event to start the game.
     */
    renderStartScreen(){
        this.addToMap(this.screen);
        this.canvas.style.cursor = 'pointer'
        this.canvas.addEventListener("click", (event) => {
            this.screen.gameStarted = true;
        });
    }

    /**
     * Initiates the game by playing music, setting cursor style, initializing the level, and starting the game loop.
     */
    StartGame(){
        this.gameMusic.play();
        this.canvas.style.cursor = 'default'
        this.firstRun = false;
        initLevel();
        this.level = level1;
        this.draw();
        this.run();
        this.screen.width = 0;
        this.screen.height = 0;
    }

    /**
     * Periodically checks for the end of the game, rendering the lose or win screen accordingly.
     */
    checkGameEnd(){
        setInterval(() => {
            if(this.character.isDead(this.character.energy)){
                this.renderLoseScreen();
            }
            if(this.endboss.isDead(this.endboss.energy)){
                this.renderWinScreen();
            }
        }, 50);
    }

    /**
     * Renders the lose screen overlay, stops game-related intervals, and handles a click event to reload the game.
     */
    renderLoseScreen(){
        let gameOverOverlay = document.getElementById('gameOverOverlay')
        gameOverOverlay.style.display = 'block';
        gameOverOverlay.style.cursor = 'pointer'
        this.screen.gameEnd = true;
        this.clearAllIntervals();
        this.gameMusic.pause();
        this.bossMusic.pause();
        if(this.screen.gameEnd){
            gameOverOverlay.addEventListener("click", (event) => {
                location.reload();
            });
        }
    }

    /**
     * Renders the win screen overlay, displays winning text, stops game-related intervals, plays win music, and handles a click event to reload the game.
     */
    renderWinScreen(){
        document.getElementById('winningText').style.display = 'flex';
        let gameOverOverlay = document.getElementById('gameOverOverlay')
        gameOverOverlay.src = 'img/9_intro_outro_screens/game_over/game over!.png';
        gameOverOverlay.style.display = 'block';
        gameOverOverlay.style.cursor = 'pointer'
        this.bossMusic.pause();
        this.winMusic.play();
        this.screen.gameEnd = true;
        this.clearAllIntervals();
        if(this.screen.gameEnd){
            gameOverOverlay.addEventListener("click", (event) => {
                location.reload();
            });
        }
    }

    clearAllIntervals(){
        setTimeout(() => {
            for (let i = 1; i < 9999; i++) window.clearInterval(i);
        }, 6000);
    }
    

    /**
     * Periodically checks the position of the main character and triggers events based on its position.
     */
    checkCharacterPosition(){
        setInterval(() => {
            if(this.character.x >= 2000 && !this.endboss.isDead(this.endboss.energy)){
                this.level.statusbar[3].y = 0;
                this.icon.y = 5;
                this.gameMusic.pause();
                this.bossMusic.play();
            }
        }, 200);

    }

    /**
     * Checks for the throwing action and creates a throwable object when conditions are met.
     */
    checkThrowing(){
        setInterval(() => {
            if(this.keyboard.throw && this.character.mana > 0 && !this.character.isDead(this.character.energy)){
                let bottle = new throwableObject(this.character.x + 100, this.character.y + 150, this.character.otherDirection);
                this.throwableObjects.push(bottle);
                this.character.mana -= 20;
                this.level.statusbar[1].setPrecentage(this.character.mana, 'chilli');
            }
        }, 200);
    }

    /**
     * Checks for collecting actions and updates character resources based on collisions with collectible objects.
     */
    checkCollecting(){
        setInterval(() => {
            this.level.collectingObject.forEach((item) => {
                if(this.character.isColliding(item)){
                    if(item.y < 340){
                        this.character.collect('money');
                        this.level.statusbar[2].setPrecentage(this.character.money, 'coin')
                    }
                    else{
                        this.character.collect('mana');
                        this.level.statusbar[1].setPrecentage(this.character.mana, 'chilli');
                    }
                    this.deleteItemFromWorld(item, 'collectingObject');
                }
            });
        }, 50);
    }

    /**
     * Deletes a specific item from the world based on its x-coordinate and type.
     *
     * @param {Object} item - The item object to be deleted.
     * @param {string} name - The type or category of the item to be deleted.
     */
    deleteItemFromWorld(item, name){
        let itemX = item.x;
        let allCollectItems = this.level[`${name}`]

        for (let index = 0; index < allCollectItems.length; index++) {
            let element = allCollectItems[index];
            if(element.x == itemX){
                allCollectItems.splice(index, 1);
            }
        }
    }

    /**
     * Deletes a specific bottle (throwable object) from the world based on its x-coordinate.
     *
     * @param {Object} bottle - The bottle (throwable object) to be deleted.
     */
    deleteBottleFromWorld(bottle){
        let itemX = bottle.x;
        let throwableObjects = this.throwableObjects;

        for (let index = 0; index < throwableObjects.length; index++) {
            let element = throwableObjects[index];
            if(element.x == itemX){
                throwableObjects.splice(index, 1);
            }
        }
    }

    checkCollision(){
        this.EndbossCollision();
        this.ChickenCollision();
        this.CharacterCollision();
    }

    /**
     * Periodically checks for collisions between the main character, thrown bottles, and the end boss.
     * Triggers events based on collisions with the end boss.
     */
    EndbossCollision(){
        setInterval(() => {
            if(this.character.isColliding(this.endboss) && !this.endboss.isDead(this.endboss.energy)){
                this.collidingWithEndboss();
            }
            this.throwableObjects.forEach((bottle) => {
                if(bottle.isColliding(this.endboss) && !bottle.splash && !this.endboss.isDead(this.endboss.energy)){
                    this.bottleCollidingWithEndboss(bottle);
                }
            });
        }, 200);
    }

    /**
     * Periodically checks for collisions between the main character, thrown bottles, and chickens (enemies).
     * Triggers events based on collisions with chickens.
     */
    ChickenCollision(){
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if(this.character.isColliding(enemy) && this.character.isInAir() && !this.character.isDead(this.character.energy) && !enemy.isDead(enemy.energy) && !this.character.isHitting() && !this.character.isColliding(this.endboss)){
                    this.CharacterAttackChicken(enemy);
                }
                this.throwableObjects.forEach((bottle) => {
                    if(bottle.isColliding(enemy) && !bottle.splash  && !enemy.isDead(enemy.energy)){
                        this.bottleCollidingWithChicken(enemy, bottle);
                    }
                });
            });
        }, 50);
    }

        /**
     * Periodically checks for collisions between the main character, endboss and chickens (enemies).
     * Triggers events based on collisions with enemies.
     */
    CharacterCollision(){
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if(this.character.isColliding(enemy) && !enemy.isDead(enemy.energy) && !this.endboss.isDead(this.endboss.energy)){
                    this.character.hit(5);
                    this.level.statusbar[0].setPrecentage(this.character.energy, 'health');
                }
            });
        }, 200);
    }

    /**
     * Initiates the character's attack on a chicken (enemy), resulting in the chicken's death and character's jump.
     *
     * @param {Object} enemy - The chicken (enemy) object being attacked by the character.
     */
    CharacterAttackChicken(enemy){
        this.chicken.killChicken(enemy);
        this.character.jump();
        setTimeout(() => {
            this.deleteItemFromWorld(enemy, 'enemies')
        }, 5000);
    }

    /**
     * Handles the collision between a thrown bottle and a chicken (enemy).
     * Moves the bottle to the last known position of the chicken, initiates the chicken's death, triggers bottle splash, and handles the deletion of the bottle and chicken.
     *
     * @param {Object} enemy - The chicken (enemy) object colliding with the thrown bottle.
     * @param {Object} bottle - The thrown bottle object colliding with the chicken.
     */
    bottleCollidingWithChicken(enemy, bottle){
        bottle.lastX = enemy.x;
        bottle.lastY = 340;
        this.chicken.killChicken(enemy);
        bottle.splash = true;
        setTimeout(() => {
            this.deleteBottleFromWorld(bottle)
        }, 600);
        if(enemy.energy == 0){
            setTimeout(() => {
                this.deleteItemFromWorld(enemy, 'enemies')
            }, 5000);
        }
    }

    /**
     * Handles the collision between the main character and the end boss.
     * Initiates an attack from the end boss on the character, reduces character's health, updates the health status bar, and sets a timeout to end the end boss attack animation.
     */
    collidingWithEndboss(){
        this.endboss.attackCharacter = true;
        this.character.hit(10);
        this.level.statusbar[0].setPrecentage(this.character.energy, 'health');
        setTimeout(() => {
            this.endboss.attackCharacter = false;
        }, 1601);
    }

    /**
     * Handles the collision between a thrown bottle and the end boss.
     * Moves the bottle to the last known position of the end boss, triggers bottle splash, reduces end boss health, updates the boss status bar, and deletes the bottle from the world.
     *
     * @param {Object} bottle - The thrown bottle object colliding with the end boss.
     */
    bottleCollidingWithEndboss(bottle){
        bottle.lastX = this.endboss.x;
        bottle.lastY = bottle.y;
        bottle.splash = true;
        this.endboss.hit(20);
        this.level.statusbar[3].setPrecentage(this.endboss.energy, 'boss')
        setTimeout(() => {
            this.deleteBottleFromWorld(bottle)
        }, 600);
    }

    setWorld(){
        this.character.world = this;
    }

    /**
     * Clears the canvas and draws various game elements including background, clouds, status bar, and movable objects.
     */
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawBackground();
        this.addObjectsToMap(this.level.clouds);
        this.drawStatusBar()
        this.drawMovableObjects();

        this.ctx.translate(-this.cameraX, 0);
        this.repeatDraw();
    }

    /**
     * Repeats the drawing process by requesting the next animation frame.
     */
    repeatDraw(){
        //Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        })
    }

    drawBackground(){
        this.ctx.translate(this.cameraX, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
    }

    drawStatusBar(){
        this.ctx.translate(-this.cameraX, 0);
        this.addObjectsToMap(this.level.statusbar);
        this.addToMap(this.icon);
    }

    drawMovableObjects(){
        this.ctx.translate(this.cameraX, 0);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectingObject);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * Adds an array of objects to the game map.
     * @param {Array} object - An array of objects to be added to the map.
     */
    addObjectsToMap(object){
        object.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a movable object to the game map, handling the drawing and flipping of images if necessary.
     * @param {movableObject} mO - The movable object to be added to the map.
     */
    addToMap(mO){
        if(mO.otherDirection){
            this.flipImage(mO);
        }
        mO.draw(this.ctx)
        //mO.drawBorder(this.ctx)

        if(mO.otherDirection){
            this.flipImageBack(mO)
        }
    }

    /**
     * Flips an image horizontally using canvas transformation.
     *
     * @param {Object} mO - The object representing the image to be flipped.
     */
    flipImage(mO){
        this.ctx.save();
        this.ctx.translate(mO.width, 0);
        this.ctx.scale(-1, 1);
        mO.x = mO.x * -1;
    }

    /**
     * Flips an image back horizontally using canvas transformation.
     *
     * @param {Object} mO - The object representing the image to be flipped.
     */
    flipImageBack(mO){
        mO.x = mO.x * -1;
        this.ctx.restore();
    }
}