class DrawableObject{
    img;
    ImageCache = {};
    x = 120;
    y = 100;
    height = 350;

    /**
     * Loads an image from the specified path and assigns it to the character's img property.
     * @param {string} path - The path to the image.
     */
    loadImg(path){
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the character's image on the canvas using the provided 2D rendering context.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx){
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        } catch (error) {
            
        }
    }

    /**
     * Loads images from an array of paths and stores them in the character's ImageCache.
     * @param {string[]} arr - An array of image paths.
     */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.ImageCache[path] = img;
        });
    }

    //     drawBorder(ctx){
    //     if(this instanceof Chicken || this instanceof Endboss || this instanceof Character || this instanceof collectingObject || this instanceof throwableObject){
    //         ctx.beginPath();
    //         ctx.lineWidth = "5";
    //         ctx.strokeStyle = "blue";
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //         ctx.beginPath();
    //         ctx.lineWidth = "5";
    //         ctx.strokeStyle = "red";
    //         ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.offset.right, this.offset.buttom);
    //         ctx.stroke();
    //     }
    //     if(this instanceof Chicken || this instanceof Endboss || this instanceof Character || this instanceof collectingObject){
    //         ctx.beginPath();
    //         ctx.lineWidth = "5";
    //         ctx.strokeStyle = "blue";
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //         ctx.beginPath();
    //         ctx.lineWidth = "5";
    //         ctx.strokeStyle = "red";
    //         ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.offset.right, this.offset.buttom);
    //         ctx.stroke();
    //     }
    // }
    

}