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

  render() {
    var props = this.props;
    // need to handle < 0 case
    var yTop = props.xTop - d3.max(props.yScale.range());

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

        {/* grid
        <Axis
          orient="bottom"
          outerTickSize="0"
          innerTickSize={-d3.max(props.yScale.range())}
          scale={props.xScale}
          top={props.xTop}
          tickValues={props.gxtickValues}
          tickFormat="" />
        */}

        <Axis
          orient="left"
          tickValues={this.ytickValues()}
          tickFormat={props.ytickFormat}
          outerTickSize="0"
          scale={this.yScale()}
          top={yTop}
          titlePadding="45"
          textAnchor={props.xtextAnchor || "end"}
          label="No. of Laboratories" />

        {/* grid
        <Axis
          orient="left"
          tickValues={props.tickValues || this.IntervalNormalizer.tickValues()}
          outerTickSize="0"
          innerTickSize={-d3.max(props.xScale.range())}
          scale={props.yScale.domain(this.IntervalNormalizer.domain())}
          top={yTop}
          tickFormat="" />
        */}
      </g>
    )
  }
}