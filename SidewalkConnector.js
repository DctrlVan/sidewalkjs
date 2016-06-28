const createOPCStream = require("opc");
const createStrand = require("opc/strand");
const Socket = require("net").Socket;
const stream = createOPCStream();
const socket = new Socket().setNoDelay().connect(7890, '192.168.1.230');
stream.pipe(socket);

class SidewalkConnector {
  constructor (width, height) {
    this.width = width;
    this.height = height;
    this.strand = createStrand(width * height);
    this.columns = this._createColumns();
    console.log("Constructed Sidewalk Controller Class into Object", {width, height});
  }

  _createColumns () {
    var columns = [];
    var i = 0; while (i < this.width) {
      columns.push(this.strand.slice(this.height * i, this.height * (i + 1)));
      i++;
    }
    return columns;
  }

  update () {
    stream.writePixels(0, this.strand.buffer);
  }
}

module.exports = SidewalkConnector;
