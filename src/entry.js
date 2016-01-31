import React from "react"
import ReactDOM from "react-dom"
import d3 from "d3"

import NumericHistogram from "./NumericHistogram"
import Layout from "./layout"

var width = 250, height = 100;

ReactDOM.render(
  <Layout top="20">
    <NumericHistogram
      left="80" top="70" target="26.6" limit="0.1"
      width={width} height={height} />

    <NumericHistogram
      left="800" top="70" target="16.5" limit="0.1"
      width={width} height={height} />
  </Layout>,
  document.getElementById('container'))