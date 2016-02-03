import d3 from "d3"
import React from "react"
import ReactDOM from "react-dom"

import { MedianAxisFormatter } from "./numericUtils"
import Coordinate from "./coordinate"

// median/limit
export default class NumericYouden extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.xFormatter = new MedianAxisFormatter({ median: props.xmedian, limit: props.xlimit })
    this.yFormatter = new MedianAxisFormatter({ median: props.ymedian, limit: props.ylimit })
  }

  prepareScale(formatter, range) {
    var tickOffset = 5 // on range
    var axis = {}

    // -3, -1, 1, 3
    var marks = d3.range(4).map((i)=>((i - 1.5) * formatter.limit * 2 + formatter.median))
    var domain = [marks[0], marks[3]]
    axis.scale = d3.scale.linear().domain(domain).range(range)

    axis.tickValues = [axis.scale.invert(tickOffset),
          marks[1], formatter.median, marks[2],
          axis.scale.invert(d3.max(range) - tickOffset)].sort()

    console.log(axis.tickValues)

    return axis
  }

  render() {
    var props = this.props
    var xAxis = this.prepareScale(this.xFormatter, [0, props.width])
    var yAxis = this.prepareScale(this.yFormatter, [props.height, 0])

    return (
      <g ref="youden" transform={`translate(${props.left || 0}, ${props.top || 0})`}>
        <Coordinate
          xScale={xAxis.scale}
          xTop={props.height}
          xtickFormat={this.xFormatter.xtickFormat}
          xtickValues={xAxis.tickValues}

          yScale={yAxis.scale}
          ytickFormat={this.yFormatter.xtickFormat}
          ytickValues={yAxis.tickValues} />
      </g>
    )
  }
}

