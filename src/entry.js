import React from "react"
import ReactDOM from "react-dom"
import d3 from "d3"

import Page from "./page"
import NumericHistogram from "./NumericHistogram"
import NumericYouden from "./NumericYouden"
import Layout from "./layout"

var width = 250, height = 100;

ReactDOM.render(
  <Page>
    <Layout top="20">
      <NumericHistogram
        left="80" top="70" target="16.5" limit="0.1"
        width={width} height={height} />

      <NumericHistogram
        left="800" top="70" target="26.6" limit="0.1"
        width={width} height={height} />

      <NumericYouden
        left="80" top="270"
        xmedian="16.5" xlimit="0.1"
        ymedian="26.6" ylimit="0.1"
        width={150} height={150} />
    </Layout>
  </Page>,
  document.getElementById('container'))