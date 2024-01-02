class collectingObject extends MovabaleObject{
    height = 100;
    width = 90;
    y;
    offset = {
        top: 10,
        left: 30,
        right: 30,
        buttom: 80,
    };
    
    /**
     * Represents an object with one of two images and an optional y-coordinate.
     *
     * @param {string} img1 - The path to the first image.
     * @param {string} img2 - The path to the second image.
     * @param {number} [y] - Optional y-coordinate for the object. If not provided, a random y-coordinate will be assigned.
     */
    constructor(img1, img2, y){
        super();
        let itemImages = [
            img1, img2
        ]
        this.loadImages(itemImages);
        if(y == undefined){
            this.giveObjectYandX();
        }
        else{
            this.x = 600 + Math.random() * 1000;
            this.y = y;
        }
        this.animate(itemImages);
    }

    /**
     * Assigns random y-coordinate, x-coordinate, and offset values for the object.
     */
    giveObjectYandX(){
        this.y = 240 - Math.random() * 100;
        this.x = 600 + Math.random() * 1000;
        this.offset = {
            top: 10,
            left: 30,
            right: 30,
            buttom: 80,
        };
    }

    animate(itemImages){
        setInterval(() => {
            this.playAnimation(itemImages);
        }, 200);
    }
}