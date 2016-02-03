import _ from "lodash"
import decimalAdjust from "./decimalRounding"

// 5.4999 is used in QDS
// it is for 31 bins
export const histFactor = 5
export const sFactor = 2.637

export class MedianAxisFormatter {
  // expect median and limit
  constructor(options) {
    this.median = +options.median
    this.limit = options.limit * this.median

    _.bindAll(this, 'xtickFormat')
  }

  binStep(binNum) {
    //HISTFACTOR is 5.4999 when binNum is 31
    return this.limit/(Math.floor(binNum/3)/2)
  }

  bins(binNum) {
    return d3.range(binNum + 1).map(x => this.median + (x - Math.floor(binNum/2)) * this.binStep(binNum))
  }

  fixMaxMin(sign = 1) {
    return this.median + sign * this.limit * sFactor
  }

  xtickFormat(x, i){
    var label = null

    switch(i) {
      case 0:
        label = this.fixMaxMin(-1)
        break
      case 1:
      case 2:
      case 3:
        // (-1, 0, +1) * limit
        label= this.median + (i - 2) * this.limit
        break
      case 4:
        label= this.fixMaxMin()
        break
    }

    if (label)
    {
      label = Math.round10(label, -1)
    }

    if (i === 0)
    {
      label = "<" + label
    }

    if (i === 4)
    {
      label = ">" + label
    }

    return label
  }
}