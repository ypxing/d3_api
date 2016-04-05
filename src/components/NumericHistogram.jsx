import d3 from "d3"
import React from "react"
import ReactDOM from "react-dom"
import _ from "lodash"

import createHistogram from "./HistogramFactory"
import Coordinate from "./coordinate"

class NumericHistogram extends React.Component {
  constructor(props, context) {
    super(props, context)
    // this.histFactor = 5 //5.4999 in QDS
    this.sFactor = 2.637
    this.binNum = 31

    _.bindAll(this, 'xtickFormat')
  }

  target() {
    return +this.props.target
  }

  limit() {
    return this.target()*this.props.limit
  }

  step() {
    //HISTFACTOR is 5.4999 when binNum is 31
    return this.limit()/(Math.floor(this.binNum/3)/2)
  }

  bins() {
    return d3.range(this.binNum + 1).map(x => this.target() + (x - Math.floor(this.binNum/2)) * this.step())
  }

  fixMaxMin(sign = 1) {
    return this.target() + sign * this.limit() * this.sFactor
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
        label= this.target() + (i - 2) * this.limit()
        break
      case 4:
        label= this.fixMaxMin()
        break
    }

    if (label)
    {
      label = label.toFixed(1)
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

  render() {
    var props = this.props
    var bins = this.bins()
    var xDomain = [bins[0], bins[this.binNum]]
    var firstIdx = Math.floor(this.binNum/3)
    var secondIdx = Math.floor(this.binNum*2/3)
    var binaryIdx = Math.floor(this.binNum/2)

    // 0, 10, 15, 20, 30
    var xtickValues = [0, firstIdx, binaryIdx, secondIdx, this.binNum - 1].map(x => bins[x] + this.step()/2)

    //var values = d3.range(1000).map(d3.random.bates(10));
    var values = d3.range(1000).map((i)=>(d3.random.bates(10)(i) * (xDomain[1] - xDomain[0]) + xDomain[0]));

    //var xScale = d3.scale.linear().domain([0, 1]).range([0, width]);
    var xScale = d3.scale.linear().domain(xDomain).range([0, props.width]);

    // Generate a histogram using twenty uniformly-spaced bins.
    // data should be [ [ 1, x: 1, dx: 0.33333333333333326, y: 1 ] ]
    // x is the position on xAxis, y is the count (position on yAxis)
    // and dx is the width of each histogram bar
    var data = d3.layout.histogram()
        .bins(bins)
        (values);

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
          xtickFormat={this.xtickFormat}
          xtickValues={xtickValues}
          gxtickValues={[xScale.invert(shadowWidth - 1), data[secondIdx + 1].x, d3.max(xScale.domain())]}
          yScale={yScale} />
      </g>
    )
  }
}

export default createHistogram(NumericHistogram)