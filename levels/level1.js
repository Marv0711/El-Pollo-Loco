let level1;

function initLevel(){
    level1 = new Level(
        [
            new Chicken('normal', 50),
            new Chicken('normal', 100),
            new Chicken('normal', 150),
            new Chicken('small', 200),
            new Chicken('small', 250),
            new Chicken('small', 300),
            new Chicken('normal', 350),
            new Chicken('normal', 400),
            new Chicken('normal', 450),
            new Chicken('small', 500),
            new Chicken('small', 550),
            new Chicken('small', 600),
        ],
    
        [
            new Cloud()
        ],
    
        [
            new Backgorund('img/5_background/layers/air.png', -719),
            new Backgorund('img/5_background/layers/3_third_layer/2.png', -719),
            new Backgorund('img/5_background/layers/2_second_layer/2.png', -719),
            new Backgorund('img/5_background/layers/1_first_layer/2.png', -719),
    
            new Backgorund('img/5_background/layers/air.png', 0),
            new Backgorund('img/5_background/layers/3_third_layer/1.png', 0),
            new Backgorund('img/5_background/layers/2_second_layer/1.png', 0),
            new Backgorund('img/5_background/layers/1_first_layer/1.png', 0),
    
            new Backgorund('img/5_background/layers/air.png', 719),
            new Backgorund('img/5_background/layers/3_third_layer/2.png', 719),
            new Backgorund('img/5_background/layers/2_second_layer/2.png', 719),
            new Backgorund('img/5_background/layers/1_first_layer/2.png', 719),
    
            new Backgorund('img/5_background/layers/air.png', 719 * 2),
            new Backgorund('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new Backgorund('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new Backgorund('img/5_background/layers/1_first_layer/1.png', 719 * 2),
    
            new Backgorund('img/5_background/layers/air.png', 719 * 3),
            new Backgorund('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new Backgorund('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new Backgorund('img/5_background/layers/1_first_layer/2.png', 719 * 3),
    
            new Backgorund('img/5_background/layers/air.png', 719 * 4),
            new Backgorund('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new Backgorund('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new Backgorund('img/5_background/layers/1_first_layer/1.png', 719 * 4),
        ],
    
        [
            new collectingObject('img/6_salsa_bottle/1_salsa_bottle_on_ground.png','img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 340),
            new collectingObject('img/6_salsa_bottle/1_salsa_bottle_on_ground.png','img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 340),
            new collectingObject('img/6_salsa_bottle/1_salsa_bottle_on_ground.png','img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 340),
            new collectingObject('img/6_salsa_bottle/1_salsa_bottle_on_ground.png','img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 340),
            new collectingObject('img/6_salsa_bottle/1_salsa_bottle_on_ground.png','img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 340),
            new collectingObject('img/6_salsa_bottle/1_salsa_bottle_on_ground.png','img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 340),
            new collectingObject('img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'),
            new collectingObject('img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'),
            new collectingObject('img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'),
            new collectingObject('img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'),
            new collectingObject('img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'),
            new collectingObject('img/6_salsa_bottle/1_salsa_bottle_on_ground.png','img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 340),
            new collectingObject('img/6_salsa_bottle/1_salsa_bottle_on_ground.png','img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 340),
            new collectingObject('img/6_salsa_bottle/1_salsa_bottle_on_ground.png','img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 340),
        ],
    
        [
            new Statusbar(0, 20, 100, 'health'),
            new Statusbar(50, 20, 0, 'chilli'),
            new Statusbar(100, 20,  0, 'coin'),
            new Statusbar(-60, 500, 100, 'boss'),
        ],
    );
}

