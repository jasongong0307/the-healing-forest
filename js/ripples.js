class Ripples {
    constructor() {

        this.ripples = [];
        this.density = 500;
        for (let i = 0; i < this.density; i++) {
            this.ripples[i] = new Ripple();
        }
      
    }


    show() {

        for (let j = 0; j < this.density; j++) {
            this.ripples[j].update();
            this.ripples[j].show();
        }
        
    }

}

function Ripple() {
    this.px = random(0, worldWidth);
    this.py = random(0, worldHeight);
    this.sx = 15;
    this.sy = 5;

    this.show = function() {
       
        push();
        fill(255, 3);
        stroke(255, 30);
        strokeWeight(2)
        ellipse(this.px, this.py, this.sx / 4, this.sy / 4);
        pop();

    }

    this.update = function() {

        this.speed = int(random(10, 20));
        this.sx += this.speed * 1.3;
        this.sy += this.speed;
        if(this.sx > random(worldWidth * 0.05, worldWidth * 0.1) || this.sy > random(worldWidth * 0.05, worldWidth * 0.1)) {
            this.px = random(0, worldWidth);
            this.py = random(0, worldHeight);
            this.sx = 15;
            this.sy = 5;
        }
    }
}
