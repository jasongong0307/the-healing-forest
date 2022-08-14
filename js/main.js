/* References: https://p5-demos.glitch.me/, https://compform.net/tiles/, https://editor.p5js.org/ambikajo/sketches/cKu3Gn0Po, 
https://hazzzaa.itch.io/forest, https://www.youtube.com/watch?v=OTNpiLUSiB4, https://pikuma.com/blog/isometric-projection-in-games,
https://www.youtube.com/watch?v=KkyIDI6rQJI, https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowBlur */

let scene1, scene2, winState, scene3;
let gameoverState = false;
let sceneCounter = 0;
let intro, introText, startButton, homeButton, refreshButton;
let ground, grass, player, rain, rocks, identity, trees, birds, ripples, hole;
let bgImg;
let moveX = 0;
let moveY = 0;
let camX = 0;
let camY = 0;
let moveSpeedX, moveSpeedY;
let easeMove = 0.2;
let magX = 0;
let magY = 0;
let persp = 0.75;
let pg;
let mapSize = 25;
let tileWidth = 1000;
let tileHeight = 500;
let worldWidth = mapSize * (tileWidth / 2);
let worldHeight = mapSize * (tileHeight / 2);
let x_screen = [];
let y_screen = [];
let x_start = -tileWidth / 2;
let y_start = -tileHeight / 2;
let tileTypes = ['A', 'B', 'C'];
let tileType = [];
let rockTypes = ['A', 'B', 'C'];
let rockType = [];
let treeTypes = ['A', 'B', 'C'];
let treeType = [];
let grassTypes = ['A', 'B', 'C'];
let grassType = [];
let tiles;
let tilesList1;
let threshold = 0.4;
let blendThreshold = 0.05;
let vignette;
let vignetteSize = 400;
let darkest = 200;
let rainSound, scoreSound, winSound, gameoverSound, birdsSound;
let sampleIsLooping = false;
let winIsLooping = false;
let birdsIsLooping = false;
let gameoverSoundIsLooping = false;
let soundOff, soundOn;
let margin;
let dx, dy, targetX, targetY;
let d = [];
let d2 = [];
let score = 0;
let karla, karlaBold;
let mult = 0.25;


function preload() {

  rainSound = loadSound('data/rain.wav');
  scoreSound = loadSound('data/score.wav');
  winSound = loadSound('data/win.wav');
  gameoverSound = loadSound('data/gameover.wav');
  birdsSound = loadSound('data/birds.wav');
  karla = loadFont('data/Karla-Regular.ttf');
  karlaBold = loadFont('data/Karla-Bold.ttf');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  scene1 = new Scene1();
  scene2 = new Scene2();
  scene3 = new Scene3();
  soundOn = createImg("data/sound-off.png", "Sound on button",
  '',
  () => {
    soundOn.size(50, AUTO);
  });
  soundOff = createImg("data/sound-on.png", "Sound off button",
    '',
    () => {
      soundOff.size(50, AUTO);
    });
  
}

function draw() {

  switch (sceneCounter) {
    case 0:
      scene1.show();
      break;
    case 1:
      scene2.show();
      break;
    case 2:
      scene3.show();
      break;
    default:
      scene1.show();
      break;
  }
}

// Homepage
class Scene1 {
  constructor() {
    cursor(ARROW);
    margin = width * 0.15;
    moveX = -worldWidth / 2;
    moveY = -worldHeight / 2;
    ground = new Ground();
    hole = new Hole();
    grass = new Grass();
    trees = new Trees();
    rocks = new Rocks();
    rain = new Rain();
    ripples = new Ripples();
    intro = new Intro();
    homeButton = new HomeButton();
    startButton = new StartButton();

    // Dims light
    this.vignette = createImage(550, 400);
    this.vignette.loadPixels();
    for (let ii = 0; ii < this.vignette.width; ii++) {
      for (let jj = 0; jj < this.vignette.height; jj++) {
        this.vignette.set(ii, jj, [0, 0, 0, constrain(map(dist(this.vignette.width / 2, this.vignette.height / 2, ii, jj), 20, 50, 0, 100), 0, darkest)]);
      }
    }
    this.vignette.updatePixels();
  }

  show() {
    background(0);
    noStroke();
    ground.show();
    hole.show();
    rocks.show();
    grass.show();
    ripples.show();
    trees.show();
    rain.show();
    push();
    imageMode(CENTER)
    image(this.vignette, width / 2, height / 2, width * 3, height * 3);
    pop();
    intro.show();
    startButton.show();
    soundOn.position(width - 100, 40);
    soundOn.mousePressed(togglePlaying);
  }
}

// Game Scene
class Scene2 {

  constructor() {
    margin = width * 0.15;
    moveX = -worldWidth / 2;
    moveY = -worldHeight / 2;
    ground = new Ground();
    hole = new Hole();
    grass = new Grass();
    trees = new Trees();
    rocks = new Rocks();
    identity = new Identity();
    player = new Player();
    rain = new Rain();
    ripples = new Ripples();
    birds = new Birds();
    winState = new WinState();
    hole = new Hole();

    // Setup torchlight
    this.vignette = createImage(550, 400);
    this.vignette.loadPixels();
    for (let ii = 0; ii < this.vignette.width; ii++) {
      for (let jj = 0; jj < this.vignette.height; jj++) {
        this.vignette.set(ii, jj, [0, 0, 0, constrain(map(dist(this.vignette.width / 2, this.vignette.height / 2, ii, jj), 20, 50, 0, vignetteSize), 0, darkest)]);
      }
    }
    this.vignette.updatePixels();
  }

  show() {

    background(0);
    noStroke();
    push();
    translate(camX, camY);
    ground.show();
    hole.show();
    rocks.show();
    grass.show();
    if (score < 5) {
      ripples.show();
    }
    identity.show();
    pop();
    player.show();
    push();
    translate(camX, camY);
    trees.show();
    pop();
    rain.show();
    moveCamera();
    homeButton.show();

    // Update torchlight
    push();
    imageMode(CENTER)
    image(this.vignette, mouseX, mouseY, width * 3 * (score + 1), height * 3 * (score + 1));
    pop();

    checkCollision();
    showScore();
    soundOn.position(width - 100, 40);
    soundOn.mousePressed(togglePlaying);
    vignetteSize = 400 - (score * 100);
    winState.show();

  }
}

// Game Over Scene
class Scene3 {
  constructor() {
    cursor(ARROW);
    margin = width * 0.15;
    moveX = -worldWidth / 2;
    moveY = -worldHeight / 2;
    ground = new Ground();
    hole = new Hole();
    grass = new Grass();
    trees = new Trees();
    rocks = new Rocks();
    rain = new Rain();
    ripples = new Ripples();
    refreshButton = new RefreshButton();

    // Dims light
    this.vignette = createImage(550, 400);
    this.vignette.loadPixels();
    for (let ii = 0; ii < this.vignette.width; ii++) {
      for (let jj = 0; jj < this.vignette.height; jj++) {
        this.vignette.set(ii, jj, [0, 0, 0, constrain(map(dist(this.vignette.width / 2, this.vignette.height / 2, ii, jj), 20, 50, 0, 100), 0, darkest)]);
      }
    }
    this.vignette.updatePixels();
  }

  show() {
    background(0, 100);
    ground.show();
    hole.show();
    rocks.show();
    grass.show();
    ripples.show();
    trees.show();
    rain.show();
    push();
    imageMode(CENTER)
    image(this.vignette, width / 2, height / 2, width * 3, height * 3);
    pop();
    soundOn.position(width - 100, 40);
    soundOn.mousePressed(togglePlaying);
    push();
    fill(255);
    textAlign(CENTER);
    textSize(60);
    textFont(karlaBold);
    text("Game Over", width / 2, height / 2 - 100);
    pop();

    if (!gameoverSoundIsLooping) {
      gameoverSound.play();
      gameoverSoundIsLooping = true;
    }
    refreshButton.show();
  }
}

class Intro {
  constructor() {
    introText = 'Many people have experienced clinical depression at some point in their lives. Some people could experience anxiety, hopelessness, and the feeling that a part of themselves has disappeared. This project aims to promote awareness and motivate those suffering to seek help or at least feel that there is hope.';
    this.leading = 30;
    this.py = 200;
  }

  show() {

    fill(0, 150);
    noStroke();
    rectMode(CENTER);
    rect(width / 2, 440, 840, 700, 20);

    push();
    fill(255, 220);
    textFont(karlaBold);
    textLeading(this.leading);
    textSize(28);
    textAlign(CENTER);
    text("The Healing Forest", width / 2 + 5, this.py);
    textSize(24);
    text("Instructions", width / 2, this.py + this.leading * 7, 600);
    textSize(18);
    textFont(karla);
    textAlign(LEFT);
    text(introText, width / 2, this.py + this.leading * 2, 670);
    textAlign(CENTER);
    text("- Move your cursor to move around the screen.", width / 2, this.py + this.leading * 8, 600);
    text("- Click or drag your cursor to move the camera.", width / 2, this.py + this.leading * 9, 600);
    text("- Search and collect all five of your identities to win the game.", width / 2, this.py + this.leading * 10, 600);
    text("- A piece of advice for beginners: avoid falling into the dark holes.", width / 2, this.py + this.leading * 11, 600);
    text("Designer: Jason Gong", width / 2 - 245, this.py + this.leading * 13);
    text("Instructor: Matt Martin", width / 2 - 24, this.py + this.leading * 13);
    text("Pratt Institute - MFA ComD", width / 2 + 215, this.py + this.leading * 13);
    pop();
  }
}

class StartButton {
  constructor() {
    this.label = "Start";
    this.leading = 30;
    this.py = 220;
    this.fill1 = 255;
    this.fill2 = 0;
  }

  show() {
    push();
    fill(255, this.fill2);
    stroke(255);
    rectMode(CENTER);
    rect(width / 2, this.py + this.leading * 15 + 24, 155, 50, 15);
    fill(this.fill1);
    noStroke();
    textFont(karlaBold);
    textSize(18);
    textAlign(CENTER);
    text(this.label, width / 2, this.py + this.leading * 16);
    pop();

    if (mouseX > (width / 2 - 80) && mouseX < (width / 2 + 80) && mouseY > this.py + this.leading * 15 && mouseY < this.py + this.leading * 15 + 50) {
      cursor(HAND);
      this.fill1 = 0;
      this.fill2 = 255;
    } else {
      cursor(ARROW);
      this.fill1 = 255;
      this.fill2 = 0;

    }
  }

  startClicked() {
    if (mouseX > (width / 2 - 80) && mouseX < (width / 2 + 80) && mouseY > this.py + this.leading * 15 && mouseY < this.py + this.leading * 15 + 50) {
      return true;
    } else {
      return false;
    }
  }
}

class HomeButton {
  constructor() {
    this.label = "< Home";
  }

  show() {
    push();
    fill(255);
    textFont(karlaBold);
    textSize(24);
    text(this.label, 70, 120);
    pop();

    if (mouseX >= 70 && mouseX <= 70 + textWidth(this.label) * 2 && mouseY >= 120 - 36 && mouseY <= 130) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }
  }

  homeClicked() {
    if (mouseX >= 70 && mouseX <= 70 + textWidth(this.label) * 2 && mouseY >= 120 - 36 && mouseY <= 130) {
      return true;
    } else {
      return false;
    }
  }
}

class RefreshButton {
  constructor() {

    this.label = "Restart";
    this.leading = 30;
    this.py = height / 2;
    this.fill1 = 255;
    this.fill2 = 0;

  }

  show() {
    push();
    fill(255, this.fill2);
    stroke(255);
    rectMode(CENTER);
    rect(width / 2, this.py, 155, 50, 15);
    fill(this.fill1);
    noStroke();
    textFont(karlaBold);
    textSize(18);
    textAlign(CENTER);
    text(this.label, width / 2, this.py + 5);
    pop();

    if (mouseX > (width / 2 - 80) && mouseX < (width / 2 + 80) && mouseY > this.py - 25 && mouseY < this.py + 25) {
      cursor(HAND);
      this.fill1 = 0;
      this.fill2 = 255;
    } else {
      cursor(ARROW);
      this.fill1 = 255;
      this.fill2 = 0;

    }
  }

  refreshClicked() {
    if (mouseX > (width / 2 - 80) && mouseX < (width / 2 + 80) && mouseY > this.py - 25 && mouseY < this.py + 25) {
      return true;
    } else {
      return false;
    }
  }
}

class WinState {

  constructor() {
    this.colorChoice = 0;
    this.counter = 0;
  }
  show() {
    if (score === 5) {
      push();
      fill(255);
      textAlign(CENTER);
      textSize(60);
      textFont(karlaBold);
      text("You Win!", width / 2, height / 2 - 180);
      pop();
      refreshButton.show();

      player.c = identity.c[this.colorChoice];

      if (this.counter > 5) {
        this.colorChoice = round(random(0, 4));
        this.counter = 0;
      }
      this.counter++;

      if (sampleIsLooping) {
        rainSound.stop();
        sampleIsLooping = false;
        if (!birdsIsLooping) {
          birdsSound.loop();
          birdsIsLooping = true;
        }
      }
      if (!winIsLooping) {

        winSound.play();
        winIsLooping = true;

      }
    }
  }
}

function togglePlaying() {
  if (!sampleIsLooping) {

    rainSound.loop();
    sampleIsLooping = true;
    removeElements();
    soundOff = createImg("data/sound-on.png", "Sound off button",
    '',
    () => {
      soundOff.size(50, AUTO);
    });
    soundOff.position(width - 100, 40);
    soundOff.mousePressed(togglePlaying);

  } else {
    rainSound.pause();
    sampleIsLooping = false;
    removeElements();
    soundOn = createImg("data/sound-off.png", "Sound on button",
    '',
    () => {
      soundOn.size(50, AUTO);
    });
    soundOn.position(width - 100, 40);
    soundOn.mousePressed(togglePlaying);
  }
}

// Click to move around the map
function moveCamera() {

  if (mouseIsPressed === true) {

    if (mouseX > width / 2) {
      magX = (mouseX - width / 2) / (width / 2);
      moveSpeedX = int(20 * magX);
      moveX -= moveSpeedX;
    } else {
      magX = 1 - (mouseX / (width / 2));
      moveSpeedX = int(20 * magX);
      moveX += moveSpeedX;
    }

    if (mouseY > height / 2) {
      magY = (mouseY - height / 2) / (height / 2);
      moveSpeedY = int(20 * magY);
      moveY -= moveSpeedY;
    } else {
      magY = 1 - (mouseY / (height / 2));
      moveSpeedY = int(20 * magY);
      moveY += moveSpeedY;
    }

  } else {

    if (moveSpeedX > 0) {
      if (mouseX > width / 2) {
        moveSpeedX -= easeMove;
        moveX -= moveSpeedX;
      } else {
        moveSpeedX -= easeMove;
        moveX += moveSpeedX;
      }
    }
    if (moveSpeedY > 0) {
      if (mouseY > height / 2) {
        moveSpeedY -= easeMove;
        moveY -= moveSpeedY;
      } else {
        moveSpeedY -= easeMove;
        moveY += moveSpeedY;
      }
    }
  }

  if (moveX < -10000) {
    moveX = -10000;
  }
  if (moveX > 600) {
    moveX = 600;
  }
  if (moveY < -5200) {
    moveY = -5200;
  }
  if (moveY > 400) {
    moveY = 400;
  }

  camX = constrain(moveX, -10000, 600);
  camY = constrain(moveY, -5200, 400);

}

function checkCollision() {

  for (let i = 0; i < 5; i++) {
    d[i] = dist((camX - player.px) * -1, (camY - player.py) * -1, identity.px[i] + identity.offX[i],
      (((identity.py[i] + identity.offY[i]) * persp)) + ((height / 2) * persp) / 2);
    if (d[i] < 80) {
      player.c = identity.c[i];
      identity.collided[i] = true;
      scoreSound.play();

    }
  }

  for (let j = 0; j < hole.holes.length; j++) {
    d2[j] = dist((camX - player.px) * -1, (camY - player.py) * -1, hole.holes[j].px, hole.holes[j].py);
    if (d2[j] < 50) {
      gameoverState = true;
      sceneCounter = 2;
    }
  }
}

function showScore() {
  score = identity.collided[0] + identity.collided[1] + identity.collided[2] + identity.collided[3] + identity.collided[4];
  push();
  fill(255);
  textSize(36);
  textFont(karlaBold);
  text('Identities Recovered: ' + score + '/5', 70, 80);
  pop();
}

function touchEnded() {

  if (startButton.startClicked()) {
    sceneCounter = 1;
  }
  if (homeButton.homeClicked()) {
    sceneCounter = 0;
  }
  if (refreshButton.refreshClicked()) {
    window.location.reload(true)
  }
}

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

}