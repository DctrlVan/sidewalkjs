const Sidewalk = require('./SidewalkDrawer')
const sidewalk = new Sidewalk(13,62);

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval( () => {
  for (i = 0; i < 62; i++) {
    for (y = 0; y < 13; y++) {
      var randColour = [0, getRandomInt(1, 255), getRandomInt(1, 255)];
      sidewalk.drawPoint(randColour, {'x': y, 'y': i});
    }
  }
  sidewalk.update();
}, 500);

function delayBall(colour, x){
  return setTimeout(()=>{
    sidewalk.bounceBall(colour)
  },x);
}


let red = [255,0,0]
let i = 0
while(i<5){
  delayBall(red, 5000*i)
  i++
}
