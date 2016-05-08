const createOPCStream = require("opc");
const createStrand = require("opc/strand");
const Socket = require("net").Socket;
const stream = createOPCStream();
const socket = new Socket().setNoDelay().connect(7890, '192.168.1.230');
stream.pipe(socket);


class Sidewalk {

  constructor(width, height){
    this.width = width;
    this.height = height;
    this.strand = createStrand(width * height);
    this.columns = [];
    var i = 0; while (i < width) {
      this.columns.push(this.strand.slice(height * i, height * (i + 1)));
      i++;
    }
    console.log("Constructed Sidewalk Controller Class into Object", width, 'x', height);
  }

  _update(){
    stream.writePixels(0, this.strand.buffer);
  }

  fillDance(colours, ms){
    const interval = setInterval(()=>{
      let aColour = colours[Math.floor(Math.random()*colours.length)];
      this.fill(aColour, Math.random() );
    }, ms )
    return interval
  }

  fillDance2(colours, ms){
    const interval = setInterval(()=>{
      this.fillByColumn(colours, Math.random() );
    }, ms )
    return interval
  }

  fill(colour, fillPercent){
    console.log("Attempting full fill:", {colour})
    var di, results, x, y;
    y=0;
    while (y < this.height) {
      x = 0;
      while (x < this.width) {
        if (Math.random() < fillPercent){ this.columns[x].setPixel(y, colour[1], colour[0], colour[2]);}
        else{this.columns[x].setPixel(y, 0, 0, 0);}
      x++}
    y++}
    this._update()
  }

  fillByColumn(colours, fill){
    var ci, y, x, l, results;
    l = colours.length;
    y = 0;
    while (y < this.height) {
      x = 0;
      while (x < this.width) {
        if (Math.random() < fill) {
          let colour = colours[x % l]
          this.columns[x].setPixel(y, colour[1], colour[0], colour[2]);
        } else {
          this.columns[x].setPixel(y, 0, 0, 0);
        }
        x++;}
    y++}
    this._update()
  }

  bounceBall(color){
    var drawBall, ballsize, blue, cushion, green, red, x, xacc, xvect, y, yacc, yvect;
    x = 4.5;
    y = 4.5;
    cushion = 4;
    ballsize = 6;
    green = color[1];
    red = color[0];
    blue = color[2];
    drawBall = ()=> {
      var c, clrgradient, dist, i, j;
      i = 0;
      while (i < this.height) {
        j = 0;
        while (j < this.width) {
          if (Math.abs(y - i) > (ballsize / 2) || Math.abs(x - j) > (ballsize / 2)) {
            c = [0, 0, 0];
          } else {
            dist = Math.sqrt(Math.pow(x - j, 2) + Math.pow(y - i, 2));
            if (dist <= (ballsize / 4)) {
              c = [green, red, blue];
            } else if (dist <= (ballsize / 2)) {
              clrgradient = (dist - (ballsize / 4)) / (ballsize / 4);
              c = [green - green * clrgradient, red - red * clrgradient, blue - blue * clrgradient];
              this.columns[j].setPixel(i, c[0], c[1], c[2]);
            } else {
              c = [0, 0, 0];
            }
          }

          j++;
        }
        i++;
      }
    };
    xvect = 0.4;
    yvect = 0.4;
    xacc = 0;
    yacc = 0;
    return setInterval(()=> {
      console.log("drawing ball")
      var r;
      drawBall();
      this._update();
      if (x < cushion) {
        xvect = xvect * -1;
        xacc = xacc * -1;
      } else if (x > this.width - cushion) {
        xvect = xvect * -1;
        xacc = xacc * -1;
      }
      if (y < cushion) {
        yvect = yvect * -1;
        yacc = yacc * -1;
      } else if (y > this.height - cushion) {
        yvect = yvect * -1;
        yacc = yacc * -1;
      }
      x = x + xvect;
      y = y + yvect;
      xvect = xvect + xacc;
      yvect = yvect + yacc;
      r = Math.random();
      if (r < 0.5) {
        return ballsize = ballsize + 0.05;
      } else {
        return ballsize = ballsize - 0.05;
      }
    }, 50);
  }

  arrowShow(colors, speed) {
    var c, drawArrow, j, l;
    l = colors.length;
    j = 0;
    c = 0;

    drawArrow = ()=> {
      var ci, position;
      position = j % this.height;
      if (position === this.height - 1) {
        c++;
      }
      ci = c % l;
      this._arrow(colors[ci], position);
      this._update();
      j++;
    };
    return setInterval(drawArrow, speed);
  }

  _arrow(color, position) {
    var di, rel, results, x, y;
    y = 0;
    while (y < this.height) {
      x = 0;
      while (x < this.width) {
        di = color;
        rel = y - position;
        if (rel < 0) {
          this.columns[parseInt(this.width / 2)].setPixel(y, di[1], di[0], di[2]);
        }
        if (x > rel && this.width - x > rel && rel > 0) {
          this.columns[x].setPixel(y, di[1], di[0], di[2]);
        }
        x++;
      }
    }
  }
}

module.exports = Sidewalk;
