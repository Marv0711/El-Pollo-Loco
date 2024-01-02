let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let musicOn = true;
let fullscreenOn = false;


/**
 * Initializes the application by setting up the canvas, creating a new World instance, and updating the overlay.
 */
function init(){
    canvas = document.getElementById(`canvas`);
    world = new World(canvas, keyboard);
    updateOverlay();
}

/**
 * Retrieves the dimensions (width and height) of the canvas element with the specified ID.
 * @returns {Object} An object containing the width and height of the canvas.
 */
function getCanvasLarge() {
    let canvas = document.getElementById('canvas');

    let WidthHeight = {
        width: canvas.clientWidth,
        height: canvas.clientHeight
    };

    return WidthHeight;
}

/**
 * Periodically updates the dimensions of the overlay element based on the dimensions of the canvas.
 */
function updateOverlay() {
    setInterval(() => {
        let WidthHeight = getCanvasLarge();
        if(WidthHeight){
            document.getElementById('gameOverOverlay').width = WidthHeight.width;
            document.getElementById('gameOverOverlay').height = WidthHeight.height;
        }
    }, 1000);
}

/**
 * Attaches touch event listeners to a specified button, enabling mobile input for a particular movement.
 *
 * @param {string} buttonID - The ID of the button element for touch events.
 * @param {string} movement - The associated movement direction ('left', 'right', 'up', 'down').
 */
function mobilePress(buttonID, movement){
    document.getElementById(buttonID).addEventListener('touchstart', (event) => { 
        event.preventDefault();
        keyboard[movement] = true;
    });
    document.getElementById(buttonID).addEventListener('touchend', (event) => { 
        event.preventDefault();
        keyboard[movement] = false;
    });
}

/**
 * Listens for the 'keydown' event on the window and updates the keyboard object based on the pressed key.
 */
window.addEventListener('keydown', (event) => {
    let key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    switch (key) {
        case 'ArrowUp':
        case 'w':
            keyboard.space = true
        break;
        case 'ArrowLeft':
        case 'a':
            keyboard.left = true
        break;
        case 'ArrowRight':
        case 'd':
            keyboard.right = true
        break;
        case 'ArrowDown':
        case 's':
            keyboard.throw = true
        break;
    
        default:
            break;
    }
});

/**
 * Listens for the 'keyup' event on the window and updates the keyboard object based on the nopressed key.
 */
window.addEventListener('keyup', (event) => {
    let key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    switch (key) {
        case 'ArrowUp':
        case 'w':
            keyboard.space = false
        break;
        case 'ArrowLeft':
        case 'a':
            keyboard.left = false
        break;
        case 'ArrowRight':
        case 'd':
            keyboard.right = false
        break;
        case 'ArrowDown':
        case 's':
            keyboard.throw = false
        break;
    
        default:
            break;
    }
});

function musicOffOn(){
    if(!musicOn){
        musicOff();
    }
    else{
        musicActiv();
    }
}

/**
 * Turns off various audio elements in the game, muting the game music, boss music, and character sounds.
 */
function musicOff(){
    world.gameMusic.muted = true;
    world.bossMusic.muted = true;
    world.character.walkingSound.muted = true;
    world.character.jumpingSound.muted = true;
    world.character.hitSound.muted = true;
    world.winMusic.muted = true;
    musicOn = true;
    document.getElementById('soundOnOff').src = 'img/icons-buttons/mute.png';
}

/**
 * Activates music in the game based on the game state, unmuting relevant audio elements and playing appropriate music.
 */
function musicActiv() {
    if(!world.endboss.firstContact){
        world.gameMusic.muted = false;
        world.bossMusic.muted = false;
        world.gameMusic.play();
    }
    else{
        world.bossMusic.muted = false;
        world.bossMusic.play()
    }
    muteSounds();
}

/**
 * Mutes specific sounds in the game, enabling other audio elements.
 */
function muteSounds(){
    world.character.walkingSound.muted = false;
    world.character.jumpingSound.muted = false;
    world.character.hitSound.muted = false;
    world.winMusic.muted = false;
    musicOn = false;
    document.getElementById('soundOnOff').src = 'img/icons-buttons/soundOn.png';
}

/**
 * Toggles fullscreen mode for the specified HTML element.
 *
 * @param {HTMLElement} element - The HTML element for which fullscreen mode should be toggled.
 */
function enterExitFullscreen(element){
    if(!fullscreenOn){
        enterFullscreen(element)
        fullscreenOn = true;
    }
    else{
        exitFullscreen()
        fullscreenOn = false;
    }
}

/**
 * Enters fullscreen mode and adjusts the styles of specified elements to occupy the entire screen.
 *
 * @param {HTMLElement} element - The HTML element to enter fullscreen mode.
 */
function enterFullscreen(element) {
    document.getElementById('canvas').style.width = '100%';
    document.getElementById('canvas').style.height = '100%';
    document.getElementById('gameOverOverlay').style.width = '100%';
    document.getElementById('gameOverOverlay').style.height = '100%';
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  
      element.webkitRequestFullscreen();
    }
  }

/**
 * Exits fullscreen mode using the appropriate API.
*/
function exitFullscreen() {
if(document.exitFullscreen) {
    document.exitFullscreen();
} else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
}
}