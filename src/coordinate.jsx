import d3 from "d3"
import React from "react"
import ReactDOM from "react-dom"

import IntervalNormalizer from "./IntervalNormalizer"

import { Axis } from "./axis"

export default class Coordinate extends React.Component {
  constructor(props, context) {
    super(props, context);
    if (props.normalizeYAxis) {
      this.IntervalNormalizer = new IntervalNormalizer(props.yScale)
    }
  }

  yScale() {
    if (this.IntervalNormalizer) {
      return this.props.yScale.domain(this.IntervalNormalizer.domain())
    }
    else
    {
      return this.props.yScale
    }
  }

  ytickValues() {
    return this.props.ytickValues || (this.IntervalNormalizer && this.IntervalNormalizer.tickValues())
  }

  xgrid() {
    var props = this.props;

    if (props.showXGrid) {
      return (
        <Axis
          orient="bottom"
          outerTickSize="0"
          innerTickSize={-d3.max(this.yScale().range())}
          scale={props.xScale}
          top={props.xTop}
          tickValues={props.gxtickValues || props.xtickValues}
          tickFormat="" />
      )
    }
  }

  ygrid() {
    var props = this.props;

    if (props.showYGrid) {
      return (
        <Axis
          orient="left"
          tickValues={props.gytickValues || this.ytickValues()}
          outerTickSize="0"
          innerTickSize={-d3.max(props.xScale.range())}
          scale={this.yScale()}
          top={this.yTop()}
          tickFormat="" />
      )
    }
  }

  yTop() {
    // need to handle < 0 case
    return this.props.xTop - d3.max(this.props.yScale.range());
  }

  render() {
    var props = this.props;

    return (
      <g transform={`translate(${props.left || 0}, ${props.top || 0})`}>
        <Axis
          orient="bottom"
          outerTickSize="0"
          scale={props.xScale}
          top={props.xTop}
          tickValues={props.xtickValues}
          tickFormat={props.xtickFormat}
          textAnchor={props.xtextAnchor || "middle"}
          titlePadding="25"
          label="Median Value" />

        {this.xgrid()}

        <Axis
          orient="left"
          tickValues={this.ytickValues()}
          tickFormat={props.ytickFormat}
          outerTickSize="0"
          scale={this.yScale()}
          top={this.yTop()}
          titlePadding="45"
          textAnchor={props.xtextAnchor || "end"}
          label="No. of Laboratories" />

        {this.ygrid()}
      </g>
    )
  }
}