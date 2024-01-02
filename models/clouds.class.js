class Cloud extends MovabaleObject{
    y = 50;
    height = 250;
    width = 500;

    constructor(){
        super().loadImg('img/5_background/layers/4_clouds/1.png')
        this.x = Math.random() * 500;

        this.animate()
    }
    animate(){
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60)
    }
}