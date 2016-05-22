const Sidewalk = require('./SidewalkDrawer')

const sidewalk = new Sidewalk(13,62)
sidewalk.fullFill([0,0,255], 1)

point = {x: 10, y:10}

var colours = [
  [255,0,0],
  [0,0, 255]
];
var i = 0
setInterval( ()=>{
  sidewalk.fullFill(colours[i%2], 1);
  i++;
}, 12000);
