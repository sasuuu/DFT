const DRAWING = 0;
const FOURIER = 1;
let state = DRAWING;
let drawing = false;
let next = 0;
let fourier = [];
let time=0;
let drawingPath;
let path;

class Path{
  constructor(){
    this.path = [];
  }

  add(c){
    this.path.push(c);
  }
  
  clear(){
    this.path = [];
  }

  drawPath(){
    if(this.path.length>0){
      stroke(255);
      fill(255);
      for(let i=0;i<this.path.length-1;i++){
        ellipse(this.path[i].re, this.path[i].im,3);
        line(this.path[i].re, this.path[i].im, this.path[i+1].re, this.path[i+1].im);
      }
      ellipse(this.path[this.path.length-1].re, this.path[this.path.length-1].im,3);
    }
  }
}

function setup() {
  createCanvas(800, 500);
  drawingPath = new Path();
  path = new Path();
}

function drawCycles(x, y,rotation, vals){
  for(let i = 1; i<vals.length; i++){
    let prevx=x;
    let prevy=y;
    let radius = vals[i].amp;
    let freq = vals[i].freq;
    let phase = vals[i].phase;
    x += radius * cos(time*freq+rotation+phase);
    y += radius * sin(time*freq+rotation+phase);

    noFill();
    stroke(100);
    ellipse(prevx, prevy, 2*radius);
    line(prevx,prevy,x,y);
  }
  let c = new Complex(x, y);
  return c;
}

function mousePressed(){
  state = DRAWING;
  drawing = true;
  drawingPath = new Path();
}

function mouseReleased(){
  state = FOURIER;
  drawing = false;
  fourier = [];
  path = new Path();
  fourier = dft(drawingPath.path);
  fourier.sort((a,b) => b.amp-a.amp);
  path = new Path();
  time = 0;
}
  
function draw() {
  background(0);
  if(state == DRAWING){
    if(millis()>next && drawing){
      drawingPath.add(new Complex(mouseX,mouseY));
      next = millis() + 50;
    }
    drawingPath.drawPath();
  }else{
    let v=drawCycles(width/2, height/2, 0, fourier);
    path.add(v);
    path.drawPath();
    const dt = TWO_PI / fourier.length;
    time += dt;

    if (time > TWO_PI) {
      time = 0;
      path.clear();
    }
  }
}