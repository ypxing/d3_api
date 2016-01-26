import d3 from "d3"
import React from "react"
import ReactDOM from "react-dom"
import ReactDOMServer from "react-dom/server"

import { jsDoc, jsContainer, htmlString } from "./jsdom"
import Coordinate from "./coordinate"

var width = 500, height = 100;
// A formatter for counts.
var formatCount = d3.format(",.0f");
var values = d3.range(1000).map(d3.random.bates(10));

var xScale = d3.scale.linear().domain([0, 1]).range([0, width]);

// Generate a histogram using twenty uniformly-spaced bins.
var data = d3.layout.histogram()
    .bins(xScale.ticks(20))
    (values);

var yScale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.y; })])
    .range([height, 0]);

class Histogram extends React.Component {
  _d3_render() {
    var svg = d3.select(this.refs.histogram);

    var bar = svg.selectAll(".bar")
        .data(data)
      .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"; });

    bar.append("rect")
        .attr("x", 1)
        .attr("width", xScale(data[0].dx) - 1)
        .attr("height", function(d) { return height - yScale(d.y); });

    bar.append("text")
        .attr("dy", ".75em")
        .attr("y", 6)
        .attr("x", xScale(data[0].dx) / 2)
        .attr("text-anchor", "middle")
        .text(function(d) { return formatCount(d.y); });
  }

  componentDidMount() {
    this._d3_render();
    console.log(htmlString());
  }

  render() {
    var props = this.props;

    return (
      <g ref="histogram" transform={`translate(${props.left}, ${props.top})`}>
        <Coordinate
          xScale={xScale} yScale={yScale} xTopOffset="100" />
      </g>
    )
  }
}

ReactDOM.render(<Histogram
  left="40" top="20"
  xScale={xScale} yScale={yScale} xTopOffset="100" />,
  jsContainer)

