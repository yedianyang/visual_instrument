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
  PAD = loadSound('sample/sad_pad_short.wav')
  PUNCTUAL = loadSound('sample/punctual.wav')
  ReversePUNCTUAL = loadSound('sample/punctual.wav')

}

function setup() {
  createCanvas(400, 400);
  ReversePUNCTUAL.reverseBuffer();
  wave = new Wave();
}

function draw() {
  background(defaultColor);
  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
    particles[i].update();
  }

  wave.show();
  wave.getSoundLevel();


  // if (keyIsDown(13)) { //13 is Return(in Mac)/Enter(in Win)
  //   createParticle();
  //   SHAKER.play();
  // } else if (keyIsDown(68)) {
  //   ChangeBackgroundColor();
  //   PUNCTUAL.play();
  // }
}


function keyPressed() {
  if (keyCode == '38') {
    createParticle();
    SHAKER.play();
  } else if (keyCode == '40') {
    PUNCTUAL.play();
  } else if (keyCode == '13') {
    ChangeBackgroundColor();
    CARIOCA.play();
  }
}



//-----------Key Control Part-----------
// function keyTyped() {
//   if (key == 'a') {
//     blip.play();
//   }
//   if (keyCode == '13') {
//     createParticle();
//     SHAKER.play();
//   }
// }



//-----------Wave Class------------------
class Wave {
  constructor() {
    this.offset = 0;
    this.size = 0;
    this.size = 0;
    this.waveAmplitude = 0;
    this.amplitude = new p5.Amplitude();
    this.count = 0;

  }
  getSoundLevel() {
    this.level = this.amplitude.getLevel();
    this.size = map(this.level, 0, 1, 0, 200);
    this.waveAmplitude = 1000 / (this.size * 20);
    //print(this.count ++);
  }
  show() {
    stroke(255 - defaultColor);
    noFill();
    beginShape();
    //vertex(0, height);
    for (var x = width / 4; x < 3 * width / 4; x++) {
      let angle = x * 0.1;
      var y = map(sin(angle), -this.waveAmplitude, this.waveAmplitude, 150, 250);
      vertex(x, y);
    }
    endShape();
    this.offset += 0.1;
  }
}


//-------------Invert Color--------------
function ChangeBackgroundColor() {
  defaultColor = 255 - defaultColor;
  key = null;
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