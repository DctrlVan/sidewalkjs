const Sidewalk = require('./Sidewalk')
const colours = [
  [244, 30, 50],
  [200, 100, 200],
  [233, 40, 100],
  [200, 60, 120],
  [255, 100, 0]
];

const bcolours = [
  [20, 30, 250],
  [20, 100, 200],
  [20, 232, 0],
  [20, 255, 144],
  [20, 100, 200]
];



const sidewalk = new Sidewalk(13,62)
sidewalk.fillDance(colours, 300);
//sidewalk.arrowShow(bcolours, 100);
sidewalk.bounceBall([0, 0 , 255]);

setTimeout(()=>{sidewalk.bounceBall([0, 255 , 0]);}, 5000)
setTimeout(()=>{sidewalk.bounceBall([0, 100 , 200]);}, 13000)
setTimeout(()=>{sidewalk.bounceBall([100, 0 , 200]);}, 20000)
setTimeout(()=>{sidewalk.bounceBall([150, 240 , 2]);}, 30000)
setTimeout(()=>{sidewalk.bounceBall([0, 0 , 0]);}, 40000)
setTimeout(()=>{sidewalk.bounceBall([0, 0 , 255]);}, 50000)
setTimeout(()=>{sidewalk.bounceBall([0, 250 , 5]);}, 57000)
