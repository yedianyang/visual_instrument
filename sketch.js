let particles = [];
let defaultColor = 0;
var SHAKER;
var CARIOCA;
var TAMBONZIN;
var PAD;
var PUNCTUAL;
//var BPM = 130;

function preload() {
  SHAKER = loadSound('sample/shaker_cake_single.wav')
  CARIOCA = loadSound('sample/percussion_carioca_short.wav')
  TAMBONZIN = loadSound('sample/percussion_tamborzin_130.wav')
  PUNCTUAL = loadSound('sample/punctual.wav')
  ReversePUNCTUAL = loadSound('sample/punctual.wav')

}

function setup() {
  createCanvas(720, 480);
  //ReversePUNCTUAL.reverseBuffer();
  wave = new Wave();
}

function draw() {
  background(defaultColor);
  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
    particles[i].update();
  }

  if (PUNCTUAL.isPlaying()) {
    wave.show();
    wave.getSoundLevel();
  }
}


function keyPressed() {
  if (keyCode == '38') { //UP_ARROW
    createParticle();
    SHAKER.play();
  } else if (keyCode == '40') { //DOWN_ARROW
    PUNCTUAL.play();
  } else if (keyCode == '13') { //ENTER
    ChangeBackgroundColor();
    CARIOCA.play();
  } else if (keyCode == '32') { //Space Bar
    if (TAMBONZIN.isLooping()) {
      TAMBONZIN.stop();
    } else {
      TAMBONZIN.loop();
    }
  }
}



//-----------Wave Class------------------
class Wave {
  constructor() {
    this.offset = 0;
    this.size = 0;
    this.size = 0;
    this.waveAmplitude = 0;
    this.amplitude = new p5.Amplitude();
    this.count = 0;
    this.alpha = 255;

  }
  getSoundLevel() {
    this.level = this.amplitude.getLevel();
    this.size = map(this.level, 0, 1, 0, 255);
    this.waveAmplitude = 1000 / (this.size * 20);
    //print(this.count ++);
    console.log(this.size);
  }
  show() {
    stroke(255 - defaultColor, this.alpha);
    noFill();
    beginShape();
    //vertex(0, height);
    for (var x = width / 4; x < 3 * width / 4; x++) {
      let angle = x * 0.1;
      var y = map(sin(angle), -this.waveAmplitude, this.waveAmplitude, height / 4, height * 3 / 4);
      vertex(x, y);
    }
    endShape();
    this.offset += 0.1;
  }
  // finished(){
  //   if(this.size < 0.5){
  //     this.alpha = map(this.size,0,1,-4,600);
  //   }
  // }
}


//-------------Invert Color--------------
function ChangeBackgroundColor() {
  defaultColor = 255 - defaultColor;
}


//-----------Particle system-------------

class Particle {

  constructor() {
    this.x = width / 2 + random(-15, 15);
    this.y = height / 2 + random(-15, 15);
    this.vx = random(-15, 15);
    this.vy = random(-15, 15);
    this.alpha = 255;
  }
  show() {
    //stroke(255);
    fill(255 - defaultColor, this.alpha);
    ellipse(this.x, this.y, 10)
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 8;
  }
  finished() {
    return (this.y <= height / 6 || this.y >= height * 5 / 6);
    //console.log(this.x <= width / 4 || this.x >= width * 3 / 4)
  }
}

function createParticle() {
  for (i = 0; i < 50; i++) {
    let p = new Particle();
    particles.push(p);
  }
  for (let i = 0; i < particles.length; i++) {
    //particles[i].update();
    //particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}