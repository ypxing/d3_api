import React from "react"
import ReactDOM from "react-dom"
import d3 from "d3"

import NumericHistogram from "./NumericHistogram"

var width = 500, height = 100;

ReactDOM.render(<NumericHistogram
  left="40" top="20" target="26.6" limit="0.1"
  width={width} height={height} />,
  document.getElementById('container'))