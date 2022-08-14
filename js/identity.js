class Identity {
    constructor() {
        this.px = [];
        this.py = [];
        this.offX = [];
        this.offY = [];
        this.rotation = [];
        this.xStep = [];
        this.yStep = [];
        this.rStep = [];
        this.xNoise = [];
        this.yNoise = [];
        this.rNoise = [];
        this.identity = [];
        this.c = [];
        this.c[0] = color(191, 54, 4);
        this.c[1] = color(191, 186, 23);
        this.c[2] = color(86, 13, 191);
        this.c[3] = color(217, 7, 105);
        this.c[4] = color(4, 191, 75);
        this.collided = [];
        this.collided[0] = false;
        this.collided[1] = false;
        this.collided[2] = false;
        this.collided[3] = false;
        this.collided[4] = false;

        for (let i = 0; i < 5; i++) {
            this.px[i] = worldWidth / 2;
            this.py[i] = worldHeight / 2;
            this.rotation[i] = random(-360, 360);
            this.xStep[i] = 0;
            this.yStep[i] = 0;
            this.rStep[i] = 0;
            this.offX[i] = random(-worldWidth / 2, worldWidth / 2);
            this.offY[i] = random(-worldHeight / 2, worldHeight / 2);
        }
    }

    show() {

        if (this.collided[0] === false) {
            drawIdentityA(this.px[0] + this.offX[0], this.py[0] + this.offY[0], this.rotation[0]);
        }
        if (this.collided[1] === false) {
            drawIdentityB(this.px[1] + this.offX[1], this.py[1] + this.offY[1], this.rotation[1]);
        }
        if (this.collided[2] === false) {
            drawIdentityC(this.px[2] + this.offX[2], this.py[2] + this.offY[2], this.rotation[2]);
        }
        if (this.collided[3] === false) {
            drawIdentityD(this.px[3] + this.offX[3], this.py[3] + this.offY[3], this.rotation[3]);
        }
        if (this.collided[4] === false) {
            drawIdentityE(this.px[4] + this.offX[4], this.py[4] + this.offY[4], this.rotation[4]);
        }

        for (let i = 0; i < 5; i++) {
            this.xNoise[i] = noise(this.xStep[i]);
            this.yNoise[i] = noise(this.yStep[i]);
            this.rNoise[i] = noise(this.rStep[i]);
            this.px[i] = map(this.xNoise[i], 0, 1, 0, worldWidth - this.offX[i]);
            this.py[i] = map(this.yNoise[i], 0, 1, 0, worldHeight - this.offY[i]);
            this.rotation[i] = map(this.rNoise[i], 0, 1, -360, 360);
            this.xStep[i] += 0.0015 + (i * 0.0005);
            this.yStep[i] += 0.003 + (i * 0.001);
            this.rStep[i] += 0.01 + (i * 0.001);
        }
    }
}


function drawIdentityA(_x, _y, offsetAngle) {

    this.px = _x;
    this.py = _y;
    this.angle = 33;
    this.dim = min(width, height);
    this.size = 70;

    // Draw the circle
    push();
    scale(1, persp);
    translate(0, ((height / 2) * persp) / 2);
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 50;
    drawingContext.shadowColor = 'white';
    fill(identity.c[0]);
    noStroke();
    this.r0 = this.dim * mult;
    this.r1 = this.r0 * 0.5;
    ellipse(this.px, this.py, this.r1, this.r1);
    pop();

    // Draw the eye 1
    push();
    scale(1, persp);
    translate(0, ((height / 2) * persp) / 2);
    translate(this.px, this.py);
    rotate(this.angle + offsetAngle);
    fill(255);
    ellipse(this.r1 / 3.5, 0, this.size / 2, this.size / 2);
    fill(20);
    ellipse(this.r1 / 3.5 + 5, -3, this.size / 4, this.size / 4);
    pop();

    // Draw the eye 2
    push();
    scale(1, persp);
    translate(0, ((height / 2) * persp) / 2);
    translate(this.px, this.py);
    rotate((this.angle * -1) + offsetAngle);
    fill(255);
    ellipse(this.r1 / 3.5, 0, this.size / 2, this.size / 2);
    fill(20);
    ellipse(this.r1 / 3.5 + 5, 3, this.size / 4, this.size / 4);
    pop();

}

function drawIdentityB(_x, _y, offsetAngle) {

    this.px = _x;
    this.py = _y;
    this.angle = 33;
    this.dim = min(width, height);
    this.size = 70;

    // Draw the circle
    push();
    scale(1, persp);
    translate(0, ((height / 2) * persp) / 2);
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 50;
    drawingContext.shadowColor = 'white';
    fill(identity.c[1]);
    noStroke();
    this.r0 = this.dim * mult;
    this.r1 = this.r0 * 0.5;
    ellipse(this.px, this.py, this.r1, this.r1);
    pop();

    // Draw the eye 1
    push();
    scale(1, persp);
    translate(0, ((height / 2) * persp) / 2);
    translate(this.px, this.py);
    rotate(this.angle + offsetAngle);
    fill(255);
    ellipse(this.r1 / 3.5, 0, this.size / 2, this.size / 2);
    fill(20);
    ellipse(this.r1 / 3.5 + 5, -3, this.size / 4, this.size / 4);
    pop();

    // Draw the eye 2
    push();
    scale(1, persp);
    translate(0, ((height / 2) * persp) / 2);
    translate(this.px, this.py);
    rotate((this.angle * -1) + offsetAngle);
    fill(255);
    ellipse(this.r1 / 3.5, 0, this.size / 2, this.size / 2);
    fill(20);
    ellipse(this.r1 / 3.5 + 5, 3, this.size / 4, this.size / 4);
    pop();

}

function drawIdentityC(_x, _y, offsetAngle) {

    this.px = _x;
    this.py = _y;
    this.angle = 33;
    this.dim = min(width, height);
    this.size = 70;

    // Draw the circle
    push();
    scale(1, persp);
    translate(0, ((height / 2) * persp) / 2);
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 50;
    drawingContext.shadowColor = 'white';
    fill(identity.c[2]);
    noStroke();
    this.r0 = this.dim * mult;
    this.r1 = this.r0 * 0.5;
    ellipse(this.px, this.py, this.r1, this.r1);
    pop();

    // Draw the eye 1
    push();
    scale(1, persp);
    translate(0, ((height / 2) * persp) / 2);
    translate(this.px, this.py);
    rotate(this.angle + offsetAngle);
    fill(255);
    ellipse(this.r1 / 3.5, 0, this.size / 2, this.size / 2);
    fill(20);
    ellipse(this.r1 / 3.5 + 5, -3, this.size / 4, this.size / 4);
    pop();

    // Draw the eye 2
    push();
    scale(1, persp);
    translate(0, ((height / 2) * persp) / 2);
    translate(this.px, this.py);
    rotate((this.angle * -1) + offsetAngle);
    fill(255);
    ellipse(this.r1 / 3.5, 0, this.size / 2, this.size / 2);
    fill(20);
    ellipse(this.r1 / 3.5 + 5, 3, this.size / 4, this.size / 4);
    pop();

}

function drawIdentityD(_x, _y, offsetAngle) {

    this.px = _x;
    this.py = _y;
    this.angle = 33;
    this.dim = min(width, height);
    this.size = 70;

    // Draw the circle
    push();
    scale(1, persp);
    translate(0, ((height / 2) * persp) / 2);
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 50;
    drawingContext.shadowColor = 'white';
    fill(identity.c[3]);
    noStroke();
    this.r0 = this.dim * mult;
    this.r1 = this.r0 * 0.5;
    ellipse(this.px, this.py, this.r1, this.r1);
    pop();

    // Draw the eye 1
    push();
    scale(1, persp);
    translate(0, ((height / 2) * persp) / 2);
    translate(this.px, this.py);
    rotate(this.angle + offsetAngle);
    fill(255);
    ellipse(this.r1 / 3.5, 0, this.size / 2, this.size / 2);
    fill(20);
    ellipse(this.r1 / 3.5 + 5, -3, this.size / 4, this.size / 4);
    pop();

    // Draw the eye 2
    push();
    scale(1, persp);
    translate(0, ((height / 2) * persp) / 2);
    translate(this.px, this.py);
    rotate((this.angle * -1) + offsetAngle);
    fill(255);
    ellipse(this.r1 / 3.5, 0, this.size / 2, this.size / 2);
    fill(20);
    ellipse(this.r1 / 3.5 + 5, 3, this.size / 4, this.size / 4);
    pop();

}

function drawIdentityE(_x, _y, offsetAngle) {

    this.px = _x;
    this.py = _y;
    this.angle = 33;
    this.dim = min(width, height);
    this.size = 70;

    // Draw the circle
    push();
    scale(1, persp);
    translate(0, ((height / 2) * persp) / 2);
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 50;
    drawingContext.shadowColor = 'white';
    fill(identity.c[4]);
    noStroke();
    this.r0 = this.dim * mult;
    this.r1 = this.r0 * 0.5;
    ellipse(this.px, this.py, this.r1, this.r1);
    pop();

    // Draw the eye 1
    push();
    scale(1, persp);
    translate(0, ((height / 2) * persp) / 2);
    translate(this.px, this.py);
    rotate(this.angle + offsetAngle);
    fill(255);
    ellipse(this.r1 / 3.5, 0, this.size / 2, this.size / 2);
    fill(20);
    ellipse(this.r1 / 3.5 + 5, -3, this.size / 4, this.size / 4);
    pop();

    // Draw the eye 2
    push();
    scale(1, persp);
    translate(0, ((height / 2) * persp) / 2);
    translate(this.px, this.py);
    rotate((this.angle * -1) + offsetAngle);
    fill(255);
    ellipse(this.r1 / 3.5, 0, this.size / 2, this.size / 2);
    fill(20);
    ellipse(this.r1 / 3.5 + 5, 3, this.size / 4, this.size / 4);
    pop();

}