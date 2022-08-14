class Grass {
    constructor() {
        this.x;
        this.y;
        this.densityX = tileWidth * 0.7;
        this.densityY = tileHeight * 0.7;
        this.offsetX = [];
        this.offsetY = [];
        this.cpX1 = -5;
        this.cpY = -15;
        this.cpX2 = 0;
        this.tip = 5;
        this.speed = 0.2;


        for (let i = 0; i < worldWidth; i += this.densityX) {
            grassType[i] = [];
            this.offsetX[i] = [];
            this.offsetY[i] = [];
            for (let j = 0; j < worldHeight; j += this.densityY) {
                grassType[i][j] = random(grassTypes);
                this.offsetX[i][j] = int(random(-400, 400));
                this.offsetY[i][j] = int(random(-200, 200));
            }
        }
    }

    show() {

        for (let i = 0; i < worldWidth; i += this.densityX) {
            for (let j = 0; j < worldHeight; j += this.densityY) {
                if (grassType[i][j] == 'A') {
                    drawGrassA(i + this.offsetX[i][j], j + this.offsetY[i][j]);
                } else if (grassType[i][j] == 'B') {
                    drawGrassB(i + this.offsetX[i][j], j + this.offsetY[i][j]);
                } else if (grassType[i][j] == 'C') {
                    drawGrassC(i + this.offsetX[i][j], j + this.offsetY[i][j]);
                }
            }
        }
        this.cpX1 = this.cpX1 + this.speed;
        this.cpX2 = this.cpX2 + this.speed;
        this.tip = this.tip - this.speed;

        if (this.cpX1 > 5) {
            this.speed *= -1;
        } else if (this.cpX1 < -5) {
            this.speed *= -1;
        }


    }
}

function drawGrassA(_x, _y) {

    push();
    translate(_x, _y);
    fill(85, 95, 25);
    beginShape();
    vertex(0, 0);
    quadraticVertex(grass.cpX1, grass.cpY, grass.tip, -40);
    vertex(grass.tip, -40)
    quadraticVertex(grass.cpX2, grass.cpY, 6, 0);
    endShape();

    translate(5, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(grass.cpX1, grass.cpY, grass.tip, -40);
    vertex(grass.tip, -40)
    quadraticVertex(grass.cpX2, grass.cpY, 6, 0);
    endShape();

    translate(5, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(grass.cpX1, grass.cpY, grass.tip, -40);
    vertex(grass.tip, -40)
    quadraticVertex(grass.cpX2, grass.cpY, 6, 0);
    endShape();

    translate(10, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(grass.cpX1, grass.cpY + 15, grass.tip, -25);
    vertex(grass.tip, -25)
    quadraticVertex(grass.cpX2, grass.cpY + 15, 6, 0);
    endShape();

    translate(5, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(grass.cpX1, grass.cpY + 15, grass.tip, -25);
    vertex(grass.tip, -25)
    quadraticVertex(grass.cpX2, grass.cpY + 15, 6, 0);
    endShape();

    translate(-33, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(grass.cpX1, grass.cpY + 10, grass.tip, -15);
    vertex(grass.tip, -15)
    quadraticVertex(grass.cpX2, grass.cpY + 10, 6, 0);
    endShape();

    translate(-3, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(grass.cpX1, grass.cpY + 10, grass.tip, -15);
    vertex(grass.tip, -15)
    quadraticVertex(grass.cpX2, grass.cpY + 10, 6, 0);
    endShape();

    translate(-3, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(grass.cpX1, grass.cpY + 10, grass.tip, -15);
    vertex(grass.tip, -15)
    quadraticVertex(grass.cpX2, grass.cpY + 10, 6, 0);
    endShape();
    pop();

}

function drawGrassB(_x, _y) {

    push();
    translate(_x, _y);
    fill(20, 50, 20);
    beginShape();
    vertex(-70, 0);
    vertex(75, 0);
    quadraticVertex(75, -30, 40, -30);
    vertex(40, -30);
    quadraticVertex(0, -75, -40, -20);
    vertex(-40, -20);
    quadraticVertex(-55, -15, -50, 0);
    endShape();

    fill(85, 95, 25);
    beginShape();
    vertex(0, 0);
    quadraticVertex(grass.cpX1, grass.cpY, grass.tip, -40);
    vertex(grass.tip, -40)
    quadraticVertex(grass.cpX2, grass.cpY, 6, 0);
    endShape();


    translate(5, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(grass.cpX1, grass.cpY, grass.tip, -40);
    vertex(grass.tip, -40)
    quadraticVertex(grass.cpX2, grass.cpY, 6, 0);
    endShape();

    translate(5, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(grass.cpX1, grass.cpY, grass.tip, -40);
    vertex(grass.tip, -40)
    quadraticVertex(grass.cpX2, grass.cpY, 6, 0);
    endShape();

    translate(10, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(grass.cpX1, grass.cpY + 15, grass.tip, -25);
    vertex(grass.tip, -25)
    quadraticVertex(grass.cpX2, grass.cpY + 15, 6, 0);
    endShape();

    translate(5, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(grass.cpX1, grass.cpY + 15, grass.tip, -25);
    vertex(grass.tip, -25)
    quadraticVertex(grass.cpX2, grass.cpY + 15, 6, 0);
    endShape();

    translate(-33, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(grass.cpX1, grass.cpY + 10, grass.tip, -15);
    vertex(grass.tip, -15)
    quadraticVertex(grass.cpX2, grass.cpY + 10, 6, 0);
    endShape();

    translate(-3, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(grass.cpX1, grass.cpY + 10, grass.tip, -15);
    vertex(grass.tip, -15)
    quadraticVertex(grass.cpX2, grass.cpY + 10, 6, 0);
    endShape();

    translate(-3, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(grass.cpX1, grass.cpY + 10, grass.tip, -15);
    vertex(grass.tip, -15)
    quadraticVertex(grass.cpX2, grass.cpY + 10, 6, 0);
    endShape();
    pop();



}

function drawGrassC(_x, _y) {

    push();
    translate(_x, _y);
    fill(20, 50, 20);
    beginShape();
    vertex(-70, 0);
    vertex(75, 0);
    quadraticVertex(75, -30, 40, -30);
    vertex(40, -30);
    quadraticVertex(0, -75, -40, -20);
    vertex(-40, -20);
    quadraticVertex(-55, -15, -50, 0);
    endShape();
    pop();

}