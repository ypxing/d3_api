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

class QAPReport extends React.Component {
  componentDidMount() {
    console.log(htmlString());
  }

  render() {
    return (
      <g transform={"translate(" + margin.left + ", " + margin.top + ")"}>
        <Axis
          orient="bottom"
          tickValues={[.1, .2, .3, .4]}
          scale={xScale} innerTickSize="-50"
          topOffset="200"
          leftOffset="0"
          textAnchor="middle" />
        <Axis
          orient="left"
          tickValues={[.1, .2, .3, .4]}
          scale={yScale} innerTickSize="-50"
          topOffset="100"
          leftOffset="0"
          textAnchor="middle" />
      </g>
    )
  }
}

// console.log(ReactDOMServer.renderToString(<QAPReport />));
ReactDOM.render(<QAPReport />, jsContainer)

