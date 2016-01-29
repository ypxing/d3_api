import React from "react"
import ReactDOM from "react-dom"
import d3 from "d3"

import NumericHistogram from "./NumericHistogram"

var width = 500, height = 100;

var HISTFACTOR = 5//5.4999;
var SFACTOR = 2.637;
var binNum = 31;
var target = 26.6//25.5;
var limit = 0.1;
limit = target * limit;
var step = limit / HISTFACTOR;
var fixMin = target - limit * SFACTOR;
var fixMax = target + limit * SFACTOR;

var ticks = d3.range(32).map(x => target + (x - 15) * step);
var min = ticks[0];
var max = ticks[31];
var tickValues = [0, 10, 15, 20, 30].map(x => ticks[x] + step/2)
var format = (x, i) => {
  let label = null

  switch(i) {
    case 0:
      label = fixMin;
      break
    case 1:
      label= target - limit
      break
    case 2:
      label= target;
      break
    case 3:
      label= target + limit;
      break
    case 4:
      label= fixMax
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

//var values = d3.range(1000).map(d3.random.bates(10));
var values = d3.range(1000).map((i)=>(d3.random.bates(10)(i) * (max - min) + min));

//var xScale = d3.scale.linear().domain([0, 1]).range([0, width]);
var xScale = d3.scale.linear().domain([min, max]).range([0, width]);

// Generate a histogram using twenty uniformly-spaced bins.
// data should be [ [ 1, x: 1, dx: 0.33333333333333326, y: 1 ] ]
// x is the position on xAxis, y is the count (position on yAxis)
// and dx is the width of each histogram bar
var data = d3.layout.histogram()
    // .bins(xScale.ticks(20))
    .bins(ticks)
    (values);

var yScale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.y; })])
    .range([height, 0]);

ReactDOM.render(<NumericHistogram
  left="40" top="20"
  data={data} width={width} height={height}
  xScale={xScale} yScale={yScale} xTopOffset="100" data={data} xtickValues={tickValues} xtickFormat={format} />,
  document.getElementById('container'))