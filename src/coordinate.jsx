import d3 from "d3"
import React from "react"
import ReactDOM from "react-dom"
import ReactDOMServer from "react-dom/server"

import { Axis } from "./axis"

var margin = {top: 250, right: 40, bottom: 250, left: 40}

var xScale = d3.scale.linear().domain([0, 1]).range([0, 500]);
var yScale = d3.scale.linear().domain([0, 1]).range([100, 0]);

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
          tickValues={[.1, .2, .3, .4]}
          innerTickSize="0"
          outerTickSize="0"
          scale={props.xScale}
          topOffset={props.xTopOffset}
          textAnchor="middle" />
        <Axis
          orient="left"
          tickValues={props.tickValues}
          innerTickSize="0"
          outerTickSize="0"
          scale={props.yScale}
          topOffset={yTopOffset}
          labelXOffset="-14"
          textAnchor="middle" />
      </g>
    )
  }
}