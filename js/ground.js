class Ground {
    constructor() {

        for (let i = 0; i < mapSize; i++) {
            x_screen[i] = [];
            y_screen[i] = [];
            tileType[i] = [];
            //tileNoise[i] = [];

            for (let j = 0; j < mapSize; j++) {
                x_screen[i][j] = x_start + j * tileWidth / 2;
                y_screen[i][j] = y_start + i * tileHeight / 2;
                tileType[i][j] = random(tileTypes);
                //tileNoise[i][j] = noise(randomNoise);
                //randomNoise += 0.1;
            }
        }
    }

    show() {

        for (let i = 0; i < mapSize; i++) {
            for (let j = 0; j < mapSize; j++) {

                if (tileType[i][j] == 'A') {
                    drawtilesA(x_screen[i][j], y_screen[i][j]);
                } else if (tileType[i][j] == 'B') {
                    drawtilesB(x_screen[i][j], y_screen[i][j]);
                } else if (tileType[i][j] == 'C') {
                    drawtilesC(x_screen[i][j], y_screen[i][j]);
                }

            }
        }

        /*  Using Perlin noise to randomize terrain generation     

            for(let i = 0; i < mapSize; i ++) {
                for(let j = 0; j < mapSize; j ++) {

                if(tileNoise[i][j] < 0.33) {
                    drawtilesA(x_screen[i][j], y_screen[i][j]);
                } else if(tileNoise[i][j] < 0.66) {
                    drawtilesB(x_screen[i][j], y_screen[i][j]);
                } else if(tileNoise[i][j] >= 0.66) {
                    drawtilesC(x_screen[i][j], y_screen[i][j]);
                }
            
            }
        } */

    }
}

function drawtilesA(_x, _y) {

    push();
    fill(6, 38, 26);
    translate(_x, _y);
    beginShape();
    vertex(tileWidth / 2, 0);
    vertex(tileWidth, tileHeight / 2);
    vertex(tileWidth / 2, tileHeight);
    vertex(0, tileHeight / 2);
    endShape();
    pop();

}

function drawtilesB(_x, _y) {

    push();
    fill(11, 56, 33);
    translate(_x, _y);
    beginShape();
    vertex(tileWidth / 2, 0);
    vertex(tileWidth, tileHeight / 2);
    vertex(tileWidth / 2, tileHeight);
    vertex(0, tileHeight / 2);
    endShape();
    pop();

}

function drawtilesC(_x, _y) {

    push();
    fill(12, 65, 35);
    translate(_x, _y);
    beginShape();
    vertex(tileWidth / 2, 0);
    vertex(tileWidth, tileHeight / 2);
    vertex(tileWidth / 2, tileHeight);
    vertex(0, tileHeight / 2);
    endShape();
    pop();

}