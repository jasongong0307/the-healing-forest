let px;
let py;
let e1, e2;

class Player {
    constructor() {

        // Initial object position
        this.px = width / 2;
        this.py = height / 2;
        this.c = 20;

        // Initial mouse position
        mouseX = width / 2;
        mouseY = height / 2;

        e1 = new Eye(5, 3, -33, 70);
        e2 = new Eye(-5, 3, 33, 70);
    }

    show() {

        // For consistent sizing regardless of portrait/landscape
        this.dim = min(width, height);

        // Get delta time in seconds
        this.dt = deltaTime / 1000;

        // Spring toward mouse position
        this.power = 1.5;
        this.px = spring(constrain(this.px, margin, width - margin), constrain(mouseX, margin, width - margin), this.power, this.dt);
        this.py = spring(constrain(this.py, 0, height - margin * persp), constrain(mouseY, 0, height - margin * persp), this.power, this.dt);

        // Draw the circle
        push();
        scale(1, persp);
        translate(0, ((height / 2) * persp) / 2);
        drawingContext.shadowOffsetX = 0;
        drawingContext.shadowOffsetY = 0;
        drawingContext.shadowBlur = 50;
        drawingContext.shadowColor = 'white';
        fill(this.c);
        noStroke();
        this.r0 = this.dim * mult;
        this.r1 = this.r0 * 0.5;
        ellipse(this.px, this.py, this.r1, this.r1);
        pop();

        // Draw the eyes
        push();
        scale(1, persp);
        translate(0, ((height / 2) * persp) / 2);
        e1.update(mouseX, mouseY);
        e1.display();
        e2.update(mouseX, mouseY);
        e2.display();
        pop();



    }
}

function Eye(offsetX, offsetY, offsetAngle, ts) {

    this.size = ts;
    this.angle = 0;

    this.update = function (mx, my) {
        this.angle = atan2(my - player.py, mx - player.px);
    };

    this.display = function () {
        push();
        translate(player.px, player.py);
        rotate(this.angle + offsetAngle);
        fill(255);
        ellipse(player.r1 / 3.5, 0, this.size / 2, this.size / 2);
        fill(20);
        ellipse(player.r1 / 3.5 + offsetY, offsetX, this.size / 4, this.size / 4);
        pop();
    };
}

// Springs A toward B with a power, accepting deltaTime
function spring(a, b, power, dt) {
    return lerp(a, b, 1 - exp(-power * dt));
}