class Hole {
    constructor() {
        
        this.holes = [];
        this.density = 50;
        for (let i = 0; i < this.density; i++) {
            this.holes[i] = new Holes();
        }
    }

    show() {
        
        for (let j = 0; j < this.density; j++) {
            this.holes[j].show();
        }
    
    }
}

function Holes() {
    this.px = random(0, worldWidth);
    this.py = random(0, worldHeight);

    this.show = function() {
       
        push();
        fill(10);
        ellipse(this.px, this.py, 200, 100);
        pop();

    }
}