import d3 from "d3"
import React from "react"
import ReactDOM from "react-dom"
import ReactDOMServer from "react-dom/server"

import Coordinate from "./coordinate"

export default class Histogram extends React.Component {
  _d3_render() {
    // A formatter for counts.
    var formatCount = d3.format(",.0f");
    var svg = d3.select(this.refs.histogram);
    var props = this.props;
    var height = d3.max(props.yScale.range());
    var data = props.data;

    var bar = svg.selectAll(".bar")
        .data(data)
      .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(" + props.xScale(d.x) + "," + props.yScale(d.y) + ")"; });

    bar.append("rect")
        .attr("x", 1)
        .attr("width", props.xScale(data[0].dx) - 1)
        .attr("height", function(d) { return height - props.yScale(d.y); });

    // bar.append("text")
    //     .attr("dy", ".75em")
    //     .attr("y", 6)
    //     .attr("x", props.xScale(data[0].dx) / 2)
    //     .attr("text-anchor", "middle")
    //     .text(function(d) { return formatCount(d.y); });
  }

  componentDidMount() {
    this._d3_render();
  }

  render() {
    var props = this.props;

    return (
      <g ref="histogram" transform={`translate(${props.left || 0}, ${props.top || 0})`}>
        <Coordinate
          xScale={props.xScale} yScale={props.yScale} xTopOffset="100" />
      </g>
    )
  }
}