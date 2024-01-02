class Screen extends DrawableObject{
    x = 0;
    y = 0;
    width = 720;
    height = 500;
    gameStarted = false;
    gameEnd = false;

    constructor(screenImg){
        super();
        if(screenImg == undefined){

        }
        else{
            this.loadImg(screenImg);
        }
    
    }
}