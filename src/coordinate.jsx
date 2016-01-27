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
    var yTopOffset = props.xTopOffset - d3.max(props.yScale.range());

    return (
      <g transform={`translate(${props.left || 0}, ${props.top || 0})`}>
        <Axis
          orient="bottom"
          outerTickSize="0"
          scale={props.xScale}
          topOffset={props.xTopOffset}
          textAnchor="middle" />
        <Axis
          orient="left"
          tickValues={props.tickValues || this.IntervalNormalizer.tickValues()}
          outerTickSize="0"
          scale={props.yScale.domain(this.IntervalNormalizer.domain())}
          topOffset={yTopOffset}
          labelXOffset="-14"
          textAnchor="middle" />
      </g>
    )
  }
}