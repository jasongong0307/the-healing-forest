class Trees {
    constructor() {
        this.x;
        this.y;
        this.densityX = tileWidth * 0.8;
        this.densityY = tileHeight * 0.8;
        this.offsetX = [];
        this.offsetY = [];

        for(let i = 0; i < worldWidth; i += this.densityX) {
            treeType[i] = [];
            this.offsetX[i] = [];
            this.offsetY[i] = [];
            for(let j = 0; j < worldHeight; j += this.densityY){
                treeType[i][j] = random(treeTypes);
                this.offsetX[i][j] = int(random(-400,400));
                this.offsetY[i][j] = int(random(-200,200));
            }
          }
    }

    show() {
         
        for(let i = 0; i < worldWidth; i += this.densityX) {
            for(let j = 0; j < worldHeight; j += this.densityY){
                if(treeType[i][j] == 'A') {
                    drawTreeA(i + this.offsetX[i][j], j + this.offsetY[i][j]);
                } else if(treeType[i][j] == 'B') {
                    drawTreeB(i + this.offsetX[i][j], j + this.offsetY[i][j]);
                } else if(treeType[i][j] == 'C') {
                    drawTreeC(i + this.offsetX[i][j], j + this.offsetY[i][j]);
                }
            }
        }

    }
}

function drawTreeA(_x, _y) {

/*     push();
    shearX(-PI / 6);
    translate(_x, _y);
    fill(0, 50);
    beginShape();
    vertex(0, 0);
    vertex(65, -300);
    vertex(130, 0);
    endShape();
    pop(); */

    push();
    translate(_x, _y);
    scale(1.2);
    fill(85, 95, 25);
    triangle(0, 0, 65, -300, 130, 0);

    fill(30, 19, 10);
    quad(45, 100, 62, -265, 68, -265, 85, 100);
    quad(65, -140, 85, -190, 80, -195, 65, -160);
    quad(65, -65, 35, -115, 40, -120, 65, -85);
    quad(65, -10, 105, -60, 100, -65, 65, -30);
    pop();
  
  }

function drawTreeB(_x, _y) {

    push();
    translate(_x, _y);
    scale(1.8);
    fill(60, 64, 1);
    triangle(0, 0, 65, -300, 130, 0);

    fill(38, 29, 1);
    quad(45, 100, 62, -265, 68, -265, 85, 100);
    quad(65, -140, 85, -190, 80, -195, 65, -160);
    quad(65, -65, 35, -115, 40, -120, 65, -85);
    quad(65, -10, 105, -60, 100, -65, 65, -30);
    pop();
    
    }

function drawTreeC(_x, _y) {

push();
translate(_x, _y);
scale(1.2);
fill(115, 107, 2);
beginShape();
vertex(135, -40);
quadraticVertex(65, 35, 20, -40);
vertex(20, -40);
quadraticVertex(-90, -60, -45, -165);
vertex(-45, -165);
quadraticVertex(-100, -250, -15, -300);
vertex(-15, -300);
quadraticVertex(95, -420, 165, -265);
vertex(165, -265);
quadraticVertex(235, -225, 165, -140);
vertex(165, -140);
quadraticVertex(200, -65, 135, -40);
endShape();

fill(65, 33, 19);
quad(45, 100, 62, -265, 68, -265, 85, 100);
quad(65, -25, -34, -117, -30, -120, 65, -45);
quad(65, -72, 150, -165, 146, -168, 65, -95);
quad(65, -110, -10, -197, -7, -200, 65, -128);
quad(65, -165, 120, -225, 117, -228, 65, -180);
quad(65, -195, 28, -250, 30, -253, 65, -210);
pop();

}