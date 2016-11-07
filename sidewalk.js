const createOPCStream = require("opc")
const createStrand = require("opc/strand")
const Socket = require("net").Socket
const stream = createOPCStream()
const socket = new Socket().setNoDelay().connect(7890, "192.168.1.51")
stream.pipe(socket)

const config = (width, height) => {
  const range = max => Array.from(new Array(max), (x, i) => i)

  const sidewalkConnector = (width, height) => {
    const strand = createStrand(width * height)
    const createColumns = () => {
      let columns = []
      range(width).map(i =>
        columns.push(strand.slice(
          height * i, 
          height * (i + 1)
        ))
      )
      return columns
    }
    const columns = createColumns()
    const update = () => stream.writePixels(0, strand.buffer)
    return {columns, update}
  }

  const connect = sidewalkConnector(width, height)

  const columns = connect.columns,
        update = connect.update

  const fillPoint = (colour, point) =>
    columns[point.x].setPixel(point.y, colour[1], colour[0], colour[2])
  
  const fillFull = (colour, fillPercent) => {
    range(height).map(y => {
      range(width).map(x =>
        Math.random() < fillPercent
          ? columns[x].setPixel(y, colour[1], colour[0], colour[2])
          : columns[x].setPixel(y, 0, 0, 0)
      )
    })
    update()
  }

  const getRandInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min

  const animateRand = (colourPreference, time) => {
    setInterval(() => {
      range(height).map(y =>
        range(width).map(x => {
          let colour = [colourPreference[0], colourPreference[1], colourPreference[2]]
          if (typeof colourPreference[0] === "boolean") colour[0] = getRandInt(1, 255)
          if (typeof colourPreference[1] === "boolean") colour[1] = getRandInt(1, 255)
          if (typeof colourPreference[2] === "boolean") colour[2] = getRandInt(1, 255)
          drawPoint(colour, {x, y})
        })
      )
      update()
    }, time)
  }

  return {fillFull, fillPoint, animateRand}
}

module.exports = config
