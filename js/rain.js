class Rain {
    constructor() {

        this.drop = [];
        for (var i = 0; i < 500; i++) {
            this.drop[i] = new Drop();
          }
    }

    show() {
        push();
        angleMode(DEGREES);
        shearX(15);
        for (var i = 0; i < this.drop.length - (score * 100); i++) {
            this.drop[i].fall();
            this.drop[i].show();
          }
        pop();
    }
}

function Drop() {
    this.x = random(-width / 6, width);
    this.y = random(-500, -50);
    this.z = random(0, 150);
    this.len = map(this.z, 0, 20, 10, 20);
    this.yspeed = map(this.z, 0, 20, 1, 20);
  
    this.fall = function() {
      this.y = this.y + this.yspeed;
      var grav = map(this.z, 0, 20, 0, 0.2);
      this.yspeed = this.yspeed + grav;
  
      if (this.y > height) {
        this.y = random(-200, -100);
        this.yspeed = map(this.z, 0, 20, 4, 10);
      }
    }
  
    this.show = function() {
      var thick = map(this.z, 0, 20, 1, 3);
      stroke(255, 50);
      strokeWeight(2);
      line(this.x, this.y, this.x, this.y + this.len);
    }
  }

// Rain v2
/* class Rain {
    constructor() {

        this.drop = [];
        for (let i = 0; i < 600; i++) {
            this.drop[i] = new Drop();
      }
      
    }


    show() {

        push();
        translate(width * 0.5, height * 0.5);
        for (let i = 0; i < this.drop.length; i++) {
            this.drop[i].move();
            this.drop[i].play();
        }
        pop();
    }

}

function Drop() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.speed = width / 18;
    this.pz = this.z;

    // Move rain drops
    this.move = function() {

        this.z = this.z + this.speed;
        if(this.z > width * 2) {
            this.x = random(-width, width);
            this.y = random(-height, height);
            this.z = width;
            this.pz = this.z;

        }
    }

    // Show rain drops
    this.play = function() {

        push();
        this.sx = map(this.x / this.z, 0, 1, 0, width);
        this.sy = map(this.y / this.z, 0, 1, 0, height);
        this.px = map(this.x / this.pz, 0, 1, 0, width);
        this.py = map(this.y / this.pz, 0, 1, 0, height);
        this.pz = this.z;
        stroke(255, 100);
        strokeWeight(2);
        line(this.px, this.py, this.sx, this.sy);
        pop();

    }
} */