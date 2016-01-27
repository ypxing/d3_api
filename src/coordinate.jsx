import d3 from "d3"
import React from "react"
import ReactDOM from "react-dom"
import ReactDOMServer from "react-dom/server"

import { Axis } from "./axis"

export default class Coordinate extends React.Component {
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
          tickValues={props.tickValues}
          outerTickSize="0"
          evenInterval={true}
          scale={props.yScale}
          topOffset={yTopOffset}
          labelXOffset="-14"
          textAnchor="middle" />
      </g>
    )
  }
}