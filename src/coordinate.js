import d3 from "d3"
import React from "react"
import ReactDOM from "react-dom"
import ReactDOMServer from "react-dom/server"

import { jsDoc, jsContainer, htmlString } from "./jsdom"
import { Axis } from "./axis"

var margin = {top: 250, right: 40, bottom: 250, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var xScale = d3.scale.linear().domain([0, 1]).range([0, 500]);
var yScale = d3.scale.linear().domain([0, 1]).range([100, 0]);

class Coordinate extends React.Component {
  componentDidMount() {
    console.log(htmlString());
  }

  render() {
    var props = this.props;
    // need to handle < 0 case
    var yTopOffset = props.xTopOffset - d3.max(props.yScale.range());

    return (
      <g transform={`translate(${props.left}, ${props.top})`}>
        <Axis
          orient="bottom"
          tickValues={[.1, .2, .3, .4]}
          scale={props.xScale}
          topOffset={props.xTopOffset}
          textAnchor="middle" />
        <Axis
          orient="left"
          tickValues={[.1, .2, .3, .4]}
          scale={props.yScale}
          topOffset={yTopOffset}
          labelXOffset="-14"
          textAnchor="middle" />
      </g>
    )
  }
}

// console.log(ReactDOMServer.renderToString(<QAPReport />));
ReactDOM.render(<Coordinate left={margin.left} top={margin.top} xScale={xScale} yScale={yScale} xTopOffset="200" />, jsContainer)

