class Backgorund extends MovabaleObject{
    width = 720;
    height = 480;
    
    /**
     * Represents an object with an image loaded from the specified path.
     *
     * @param {string} path - The path to the image to be loaded.
     * @param {number} x - The initial x-coordinate of the object.
     */
    constructor(path, x){
        super().loadImg(path);

        this.x = x;
        this.y = 480 - this.height;
    }
}