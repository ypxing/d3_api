import d3 from "d3"
import React from "react"
import ReactDOM from "react-dom"

import { MedianAxisFormatter } from "./numericUtils"
import Coordinate from "./coordinate"

// median/limit
export default class NumericYouden extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.xFormatter = new MedianAxisFormatter({ median: props.xmedian, limit: props.xlimit })
    this.yFormatter = new MedianAxisFormatter({ median: props.ymedian, limit: props.ylimit })
  }

  prepareScale(formatter, range) {
    var tickOffset = 5 // on range
    var axis = {}

    // -3, -1, 1, 3
    var marks = d3.range(4).map((i)=>((i - 1.5) * formatter.limit * 2 + formatter.median))
    var domain = [marks[0], marks[3]]
    axis.scale = d3.scale.linear().domain(domain).range(range)

    axis.tickValues = [axis.scale.invert(tickOffset),
          marks[1], formatter.median, marks[2],
          axis.scale.invert(d3.max(range) - tickOffset)]

    axis.gtickValues = marks

    return axis
  }

  _d3_render() {
    this._d3_clear()

    var youden = d3.select(this.refs.youden);
    this.youdenResults =  youden.selectAll("text.youden-results")
                                .data(this.props.results)
                                .enter()
                                .append("text")
                                  .attr("class", "youden-results")
                                  .attr("x", (d) => (this.xAxis.scale(d.results[0])))
                                  .attr("y", (d) => (this.yAxis.scale(d.results[1])))
                                  .text("*")

    this.youdenResult = youden.append("text")
                                .attr("class", "youden-result")
                                .attr("x", this.xAxis.scale(this.props.result.results[0]))
                                .attr("y", this.yAxis.scale(this.props.result.results[1]))
                                .text("x")
  }

  _d3_clear() {
    if (this.youdenResults) {
      this.youdenResults.remove()
    }

    if (this.youdenResult) {
      this.youdenResult.remove()
    }
  }

  componentDidUpdate() {
    this._d3_render();
  }

  componentDidMount() {
    this._d3_render()
  }

  render() {
    var props = this.props
    var xAxis = this.xAxis = this.prepareScale(this.xFormatter, [0, props.width])
    var yAxis = this.yAxis = this.prepareScale(this.yFormatter, [props.height, 0])

    return (
      <g className="youden" ref="youden" transform={`translate(${props.left || 0}, ${props.top || 0})`}>
        <Coordinate
          xScale={xAxis.scale}
          xTop={props.height}
          xtickFormat={this.xFormatter.tickFormat}
          xtickValues={xAxis.tickValues}
          gxtickValues={xAxis.gtickValues}
          showXGrid={true}

          yScale={yAxis.scale}
          ytickFormat={this.yFormatter.tickFormat}
          ytickValues={yAxis.tickValues}
          gytickValues={yAxis.gtickValues}
          showYGrid={true} />

          <text transform={`translate(${props.width}, ${props.height})`} className="median">
            <tspan x="0" y="0" dy="-1.6em" dx="-2.5em">Median</tspan>
            <tspan x="0" y="0" dy="-0.5em" dx="-2.5em">{props.xmedian}</tspan>
          </text>

          <text className="median">
            <tspan x="0" y="0" dy="1.2em" dx="2.5em">Median</tspan>
            <tspan x="0" y="0" dy="2.3em" dx="2.5em">{props.ymedian}</tspan>
          </text>
      </g>
    )
  }
}

