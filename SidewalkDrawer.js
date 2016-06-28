const SidewalkConnector = require('./SidewalkConnector');

class SidewalkDrawer extends SidewalkConnector{
  fullFill (colour, fillPercent) {
    var di, results, x, y;
    y = 0;
    while (y < this.height) {
      x = 0;
      while (x < this.width) {
        if (Math.random() < fillPercent){ 
          this.columns[x].setPixel(y, colour[1], colour[0], colour[2]);
        } else {
          this.columns[x].setPixel(y, 0, 0, 0);
        }
        x++;
      }
      y++;
    }
    this.update();
  }

  drawPoint (colour, point) {
    this.columns[point.x].setPixel(point.y, colour[1], colour[0], colour[2]);
  }

  drawBall (colour, ballDiameter, point) {
    var c, clrgradient, dist, i, j;
    i = 0;
    while (i < this.height) {
      j = 0;
      while (j < this.width) {
        if (Math.abs(y - i) > (ballDiameter / 2) || Math.abs(x - j) > (ballDiameter / 2)) {
          c = [0, 0, 0];
        } else {
          dist = Math.sqrt(Math.pow(x - j, 2) + Math.pow(y - i, 2));
          if (dist <= (ballDiameter / 4)) {
            c = colour;
          } else if (dist <= (ballDiameter / 2)) {
            clrgradient = (dist - (ballDiameter / 4)) / (ballDiameter / 4);
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
  }

  bounceBall (color) {
    var drawBall, ballsize, blue, cushion, green, red, x, xacc, xvect, y, yacc, yvect;
    x = 4.5;
    y = 4.5;
    cushion = 4;
    ballsize = 3;
    green = color[1];
    red = color[0];
    blue = color[2];
    drawBall = () => {
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
    return setInterval( () => {
      var r;
      drawBall();
      this.update();
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
    }, 50);
  }

  random (red, green, blue, time, sideX, sideY) {
    if (typeof sideX === 'undefined') {
      x = 13;
    }
    if (typeof sideY === 'undefined') {
      y = 62;
    }
    function getRandomInt (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    setInterval( () => {
      for (var y = 0; y < sideY; y++) {
        for (var x = 0; x < sideX; x++) {  
          var colour = [red, green, blue];
          if (typeof red === 'boolean') {
            colour[0] = getRandomInt(1, 255); 
          }       
          if (typeof green === 'boolean') {
            colour[1] = getRandomInt(1, 255); 
          }
          if (typeof blue === 'boolean') {
            colour[2] = getRandomInt(1, 255); 
          }
          this.drawPoint(colour, {'x': x, 'y': y});
        }
      }
      this.update();
    }, time);
  }
}

module.exports = SidewalkDrawer;
