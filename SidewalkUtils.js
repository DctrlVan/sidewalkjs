

const Sidewalk = require('./Sidewalk');

class Utils extends Sidewalk{

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

    drawPoint(point){
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
    }

    vertGradient(startColour, endColour, startRow, endRow) {
    }

    horizontalGradient(startColour, endColour, startColumn, endColumn) {
    }

    writeCharacter(character, centerPoint, orientation, size){

    }
      

}
