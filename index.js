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
    console.log({columns: this.columns})
    console.log("Constructed Sidewalk Controller Class into Object", width, 'x', height);
  }

  fill(colour, fillPercent){
    console.log("Attempting full fill:")
      var di, results, x, y;
      y=0; while (y < this.height) {
      x = 0; while (x < this.width) {
          if (Math.random() < fillPercent) {
            this.columns[x].setPixel(y, colour[1], colour[0], colour[2]);
          } else {
            this.columns[x].setPixel(y, 0, 0, 0);
          }
          x++
        }
        y++
      }
    stream.writePixels(0, this.strand.buffer);
  }
}


const colours = [
  [244, 30, 50],
  [100, 100, 200],
  [233, 40, 100],
  [200, 60, 120],
  [255, 100, 0]
]
setInterval(()=>{
  let sidewalk = new Sidewalk(13,62)
  let randomColour = colours[Math.floor(Math.random()*colours.length)]
  sidewalk.fill(randomColour, Math.random())
}, 1000 )
