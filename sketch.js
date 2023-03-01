const numCircles = 5,
  vertexes = [];
let circles;

function setup() {
  createCanvas(windowWidth, windowHeight);

  circles = getCircles(numCircles);
}

function draw() {
  background(255);

  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
    circles[i].show();
  }

  circles[circles.length - 1].getVertexes(vertexes);

  noFill();
  stroke(255, 0, 0);
  strokeWeight(1);

  line(circles[circles.length - 1].dot.x, circles[circles.length - 1].dot.y, vertexes[0].x, vertexes[0].y);

  beginShape();
  for (let i = 0; i < vertexes.length; i++) {
    vertex(vertexes[i].x + i, vertexes[i].y);
    if (vertexes[i].x + i > width) {
      vertexes.pop(vertexes[i]);
    }
  }
  endShape();
}

function getCircles(n) {
  const seq = [];
  for (let i = 0; i < n; i++) {
    seq.push(new circleObject(i));
  }
  return seq;
}

class circleObject {
  constructor(index) {
    this.ind = index;
    this.pos = createVector(width / 4, height / 2);
    this.ang = 0;
    this.dot = createVector();
    this.rad = (min(width, height) / 6) * (4 / ((this.ind * 2 + 1) * PI));
  }
  update() {
    if (this.ind != 0) {
      this.pos.x = circles[this.ind - 1].dot.x;
      this.pos.y = circles[this.ind - 1].dot.y;
    }

    this.ang += PI / 180;

    const x = this.pos.x + (this.rad) * cos((this.ind * 2 + 1) * this.ang),
      y = this.pos.y + (this.rad) * sin((this.ind * 2 + 1) * this.ang);

    this.dot.x = x;
    this.dot.y = y;
  }
  show() {
    noFill();
    stroke(0, 100);
    strokeWeight(2);

    circle(this.pos.x, this.pos.y, this.rad * 2);

    strokeWeight(8);

    point(this.dot.x, this.dot.y);
  }
  getVertexes(arr) {
    arr.unshift(createVector(circles[0].pos.x + circles[0].rad * 2, this.dot.y));
  }
}