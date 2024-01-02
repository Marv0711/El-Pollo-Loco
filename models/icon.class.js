class Icon extends DrawableObject {
    height = 65;
    width = 60;
    otherDirection = false;
    img;
    x = 490;
    y = -60;

    constructor(){
        super().loadImg('img/7_statusbars/3_icons/icon_health_endboss.png');
    }
}