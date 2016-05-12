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
sidewalk.rainbow()
