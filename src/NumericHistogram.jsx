import d3 from "d3"
import React from "react"
import ReactDOM from "react-dom"

import createHistogram from "./HistogramFactory"
import Coordinate from "./coordinate"
import { MedianAxisFormatter } from "./numericUtils"

class NumericHistogram extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.binNum = 31
    this.formatter = new MedianAxisFormatter({ median: props.median, limit: props.limit })
  }

  render() {
    var props = this.props
    var bins = this.formatter.bins(this.binNum)
    var xDomain = [bins[0], bins[this.binNum]]
    var firstIdx = Math.floor(this.binNum/3)
    var secondIdx = Math.floor(this.binNum*2/3)
    var binaryIdx = Math.floor(this.binNum/2)

    // Generate a histogram using twenty uniformly-spaced bins.
    // data should be [ [ 1, x: 1, dx: 0.33333333333333326, y: 1 ] ]
    // x is the position on xAxis, y is the count (position on yAxis)
    // and dx is the width of each histogram bar
    var data = d3.layout.histogram()
        .bins(bins)
        (props.results);

    // 0, 10, 15, 20, 30
    var xtickValues = [0, firstIdx, binaryIdx, secondIdx, this.binNum - 1].map(x => bins[x] + this.formatter.binStep(this.binNum)/2)

    var xScale = d3.scale.linear().domain(xDomain).range([0, props.width]);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.y; })])
        .range([props.height, 0]);

    var shadowWidth = xScale(data[firstIdx].x)
    var shadowOffset = xScale(data[secondIdx + 1].x)

    props.parentComponent.commonData = { xScale: xScale, yScale: yScale, data: data }

    return (
      <g>
        <rect
          width={shadowWidth - 1}
          height={props.height}
          className="histoShadow" />
        <rect
          transform={`translate(${shadowOffset}, 0)`}
          width={xScale(data[firstIdx].x)}
          height={props.height}
          className="histoShadow" />

        <Coordinate
          xScale={xScale}
          xTop={props.height}
          xtickFormat={this.formatter.tickFormat}
          xtickValues={xtickValues}
          gxtickValues={[xScale.invert(shadowWidth - 1), data[secondIdx + 1].x, d3.max(xScale.domain())]}
          showXGrid={true}

          yScale={yScale}
          showYGrid={true}
          normalizeYAxis={true} />
      </g>
    )
  }
}

export default createHistogram(NumericHistogram)