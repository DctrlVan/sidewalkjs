'use strict'
const createOPCStream = require("opc");
const createStrand = require("opc/strand");
const Socket = require("net").Socket;
const stream = createOPCStream();
stream.pipe(socket);


class Sidewalk {
  constructor(port, address, width, height){
    this.socket = new Socket().setNoDelay().connect(port, address);
    this.width = width;
    this.height = height;
    this.strand = createStrand(width * height);
    this.columns = [];
    var i = 0; while (i < width) {
      this.columns.push(this.strand.slice(height * i, height * (i + 1)));
      i++;
    }
    console.log("Constructed Sidewalk Controller Class into Object",
      {port, address, width, height});
  }

  update(){
    stream.writePixels(0, this.strand.buffer);
  }
}

module.exports = Sidewalk;
