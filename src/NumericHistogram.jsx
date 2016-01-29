import d3 from "d3"
import React from "react"
import ReactDOM from "react-dom"

import createHistogram from "./HistogramFactory"
import Coordinate from "./coordinate"

class NumericHistogram extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    var props = this.props
    var shadowWidth = props.xScale(props.data[10].x)
    var shadowOffset = props.xScale(props.data[21].x)

    return (
      <g>
        <rect
          width={shadowWidth - 1}
          height="100"
          className="histoShadow" />
        <rect
          transform={`translate(${shadowOffset}, 0)`}
          width={props.xScale(props.data[10].x)}
          height="100"
          className="histoShadow" />

        <Coordinate
          xScale={props.xScale}
          xTop="100"
          xtickFormat={props.xtickFormat}
          xtickValues={props.xtickValues}
          gxtickValues={[props.xScale.invert(shadowWidth - 1), props.data[21].x, d3.max(props.xScale.domain())]}
          yScale={props.yScale} />
      </g>
    )
  }
}

export default createHistogram(NumericHistogram)