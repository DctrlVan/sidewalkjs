const config = require("./sidewalk")
const sidewalk = config(13, 62, "192.168.1.51", 7890)
sidewalk.animateRand([true, 0, true], 850)
