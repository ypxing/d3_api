import React from "react"
import ReactDOM from "react-dom"
import d3 from "d3"

import Histogram from "./histogram"

var width = 500, height = 100;

var values = d3.range(1000).map(d3.random.bates(10));

var xScale = d3.scale.linear().domain([0, 1]).range([0, width]);

// Generate a histogram using twenty uniformly-spaced bins.
// data should be [ [ 1, x: 1, dx: 0.33333333333333326, y: 1 ] ]
// x is the position on xAxis, y is the count (position on yAxis)
// and dx is the width of each histogram bar
var data = d3.layout.histogram()
    .bins(xScale.ticks(20))
    (values);

var yScale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.y; })])
    .range([height, 0]);

ReactDOM.render(<Histogram
  left="40" top="20"
  data={data} width={width} height={height}
  xScale={xScale} yScale={yScale} xTopOffset="100" />,
  document.getElementById('container'))