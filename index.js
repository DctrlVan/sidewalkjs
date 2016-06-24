const Sidewalk = require('./SidewalkDrawer')
const sidewalk = new Sidewalk(13,62);
const Kefir = require('kefir')

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Kefir.fromPoll(500, () => {
  return Array.from(Array(62)).map( () => Array.from(Array(13)))
})
.map(arr => {
  return arr.map(sub => sub.map( () => [0, getRandomInt(1, 255), getRandomInt(1, 255)]))
})
.onValue(arr => {
  arr.forEach( (sub, y) => sub.forEach( (color, x) => sidewalk.drawPoint(color, {x,y})))
  sidewalk.update();
})

function delayBall (colour, x) {
  return setTimeout( () => {
    sidewalk.bounceBall(colour)
  }, x);
}

let red = [255, 255, 255]
let i = 0
while(i < 1) {
  delayBall(red, 10000 * i)
  i++
}
