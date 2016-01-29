import d3 from "d3"
import React from "react"
import ReactDOM from "react-dom"

import createHistogram from "./HistogramFactory"

class NumericHistogram {
  beforeCoordinate(props) {
    return (
      <g>
        <rect
          width={props.xScale(props.data[10].x) - 1}
          height="100"
          className="histoShadow" />
        <rect
          transform={`translate(${props.xScale(props.data[21].x)}, 0)`}
          width={props.xScale(props.data[10].x)}
          height="100"
          className="histoShadow" />
      </g>
    )
  }
}

export default createHistogram(new NumericHistogram())