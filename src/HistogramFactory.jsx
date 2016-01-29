import d3 from "d3"
import React from "react"
import ReactDOM from "react-dom"
import ReactDOMServer from "react-dom/server"

import Coordinate from "./coordinate"

export default function createHistogram(component) {
  return class Histogram extends React.Component {
    constructor(props, context) {
      super(props, context)
    }

    _d3_render() {
      if (this.bar) {
        this.bar.remove();
      }

      // A formatter for counts.
      var formatCount = d3.format(",.0f");
      var svg = d3.select(this.refs.histogram);
      var props = this.props;
      var height = d3.max(props.yScale.range());
      var data = props.data;
      var barWidth = props.xScale(data[0].dx + d3.min(props.xScale.domain()));

      this.bar = svg.selectAll(".bar")
          .data(data)
        .enter().append("g")
          .attr("class", "bar")
          .attr("transform", function(d) { return "translate(" + props.xScale(d.x) + "," + props.yScale(d.y) + ")"; });

      this.bar.append("rect")
          .attr("x", 1)
          .attr("width", barWidth - 3)
          .attr("height", function(d) { return height - props.yScale(d.y); });

      // this.bar.append("text")
      //     .attr("dy", ".75em")
      //     .attr("y", 6)
      //     .attr("x", barWidth / 2)
      //     .attr("text-anchor", "middle")
      //     .text(function(d) { return formatCount(d.y); });
    }

    componentDidUpdate() {
      this._d3_render();
    }

    componentDidMount() {
      this._d3_render();
    }

    render() {
      var props = this.props;

      return (
        <g ref="histogram" transform={`translate(${props.left || 0}, ${props.top || 0})`}>
          { component.beforeCoordinate ? component.beforeCoordinate(props) : null }
          <Coordinate
            xScale={props.xScale}
            xTopOffset="100"
            xtickFormat={props.xtickFormat}
            xtickValues={props.xtickValues}
            yScale={props.yScale} />
          { component.afterCoordinate ? component.afterCoordinate(props) : null }
        </g>
      )
    }
  }
}