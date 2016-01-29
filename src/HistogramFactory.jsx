import d3 from "d3"
import React from "react"
import ReactDOM from "react-dom"
import ReactDOMServer from "react-dom/server"

export default function createHistogram(Component) {
  return class Histogram extends React.Component {
    constructor(props, context) {
      super(props, context)
    }

    fromSubComponent(attr) {
      return this.props[attr] || this.commonData[attr]
    }

    _d3_render() {
      if (this.bar) {
        this.bar.remove();
      }

      var xScale = this.fromSubComponent("xScale")
      var yScale = this.fromSubComponent("yScale")
      var data = this.fromSubComponent("data")

      // A formatter for counts.
      var svg = d3.select(this.refs.histogram);
      var props = this.props;
      var height = d3.max(yScale.range());
      var barWidth = xScale(data[0].dx + d3.min(xScale.domain()));

      this.bar = svg.selectAll(".bar")
          .data(data)
        .enter().append("g")
          .attr("class", "bar")
          .attr("transform", function(d) { return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"; });

      this.bar.append("rect")
          .attr("x", 1)
          .attr("width", barWidth - 3)
          .attr("height", function(d) { return height - yScale(d.y); });

      // var formatCount = d3.format(",.0f");
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
          <Component parentComponent={this} {...this.props} {...this.state} />
        </g>
      )
    }
  }
}