

const SidewalkConnector = require('./SidewalkConnector');

class SidewalkDrawer extends SidewalkConnector{

    fullFill(colour, fillPercent){
      console.log("Attempting full fill:", {colour})
      var di, results, x, y;
      y=0;
      while (y < this.height) {
        x = 0;
        while (x < this.width) {
          if ( Math.random() < fillPercent){ this.columns[x].setPixel(y, colour[1], colour[0], colour[2]);}
          else{this.columns[x].setPixel(y, 0, 0, 0);}
        x++}
      y++}
      this.update()
    }

    drawPoint(colour, point){
      this.columns[point.x].setPixel(point.y, colour[1], colour[0], colour[2])
    }

    drawLine(colour, startPoint, endPoint){
    }

    drawBall(colour, ballDiameter, point){
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
        if (r < 0.5) {
          return ballsize = ballsize + 0.05;
        } else {
          return ballsize = ballsize - 0.05;
        }
      }, 50);
    }


    vertGradient(startColour, endColour, startRow, endRow) {
    }

    horizontalGradient(startColour, endColour, startColumn, endColumn) {
    }

    writeCharacter(character, centerPoint, orientation, size){
    }
}

module.exports = SidewalkDrawer;
