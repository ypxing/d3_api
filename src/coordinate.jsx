import d3 from "d3"
import React from "react"
import ReactDOM from "react-dom"

import IntervalNormalizer from "./IntervalNormalizer"

import { Axis } from "./axis"

export default class Coordinate extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.IntervalNormalizer = new IntervalNormalizer(props.yScale)
  }

  yScale() {

  }

  componentDidMount() {
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
          textAnchor={props.xtextAnchor || "middle"} />
        <Axis
          orient="bottom"
          outerTickSize="0"
          innerTickSize={-d3.max(props.yScale.range())}
          scale={props.xScale}
          top={props.xTop}
          tickValues={props.gxtickValues}
          tickFormat="" />

        <Axis
          orient="left"
          tickValues={props.tickValues || this.IntervalNormalizer.tickValues()}
          outerTickSize="0"
          scale={props.yScale.domain(this.IntervalNormalizer.domain())}
          top={yTop}
          textAnchor={props.xtextAnchor || "end"} />
        <Axis
          orient="left"
          tickValues={props.tickValues || this.IntervalNormalizer.tickValues()}
          outerTickSize="0"
          innerTickSize={-d3.max(props.xScale.range())}
          scale={props.yScale.domain(this.IntervalNormalizer.domain())}
          top={yTop}
          tickFormat="" />
      </g>
    )
  }
}