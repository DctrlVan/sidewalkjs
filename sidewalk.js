const createOPCStream = require("opc")
const createStrand = require("opc/strand")
const Socket = require("net").Socket
const stream = createOPCStream()

const config = (width, height, ip, port) => {
  typeof ip === "undefined"
    ? ip = "192.168.1.51"
    : ip = ip

  typeof port === "undefined"
    ? port = 7890
    : port = port

  const socket = new Socket().setNoDelay().connect(7890, "192.168.1.51")
  stream.pipe(socket)  
  
  const range = max =>
    Array.from(new Array(max), (x, i) => i)

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
    
    return {
      "columns": createColumns(),
      "update": () => stream.writePixels(0, strand.buffer)
    }
  }

  const connect = sidewalkConnector(width, height),
        columns = connect.columns,
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
          let colour = []
          range(colourPreference.length).map(i =>
            typeof colourPreference[i] === "boolean"
              ? colour[i] = getRandInt(1, 255)
              : colour[i] = colourPreference[i]
          )
          fillPoint(colour, {x, y})
        })
      )
      update()
    }, time)
  }

  const drawCircle = (colour, circleDiameter, point) => {
    let c,
        red = colour[0],
        green = colour[1],
        blue = colour[2]
    
    range(height).map(y =>
      range(width).map(x => {
        if (Math.abs(point.y - y) > (circleDiameter / 2) || Math.abs(point.x - x) > (circleDiameter / 2)) {
          c = [0, 0, 0]
        } else {
          let dist = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2))
          
          if (dist <= (circleDiameter / 4)) {
            c = colour
          } else if (dist <= (circleDiameter / 2)) {
            colourGradient = (dist - (circleDiameter / 4)) / (circleDiameter / 4)
            
            c = [green - green * colourGradient,
                 red - red * colourGradient,
                 blue - blue * colourGradient]
            
            columns[x].setPixel(y, c[0], c[1], c[2])
          } else {
            c = [0, 0, 0]
          }
        }
      })
    )
  }

  const animateCircle = (colour, diameter) => {
    let x = 4.5,
        y = 4.5,
        cushion = 4,
        ballsize = 3,
        xvect = 0.4,
        yvect = 0.4,
        xacc = 0,
        yacc = 0
    
    setInterval(() => {
      drawCircle(colour, diameter, {x, y})
      update()
      
      if (x < cushion) {
        xvect = xvect * -1
        xacc = xacc * -1
      } else if (x > width - cushion) {
        xvect = xvect * -1
        xacc = xacc * -1
      }
      
      if (y < cushion) {
        yvect = yvect * -1
        yacc = yacc * -1
      } else if (y > height - cushion) {
        yvect = yvect * -1
        yacc = yacc * -1
      }
      
      x = x + xvect
      y = y + yvect
      xvect = xvect + xacc
      yvect = yvect + yacc
    }, 50)
  }
  
  return {fillFull, fillPoint, drawCircle, animateRand, animateCircle}
}

module.exports = config
