import React from "react"
import d3 from "d3"

import Page from "./page"
import NumericHistogram from "./NumericHistogram"
import NumericYouden from "./NumericYouden"
import Layout from "./layout"
import { MedianAxisFormatter } from "./numericUtils"
import DataToDate from "./DataToDate"
import LeveyJennings from "./LeveyJennings"

var width = 250, height = 100;

//testing data of NumericHistogram
var binNum = 31
var sample1 = { median: 16.5, limit: 0.1 }
var sample2 = { median: 26.6, limit: 0.1 }

var sample1Formatter = new MedianAxisFormatter({ median: sample1.median, limit: sample1.limit })
var sample2Formatter = new MedianAxisFormatter({ median: sample2.median, limit: sample2.limit })
var sample1Bins = sample1Formatter.bins(binNum)
var sample2Bins = sample2Formatter.bins(binNum)

var sample1xDomain = [sample1Bins[0], sample1Bins[binNum]]
var sample2xDomain = [sample2Bins[0], sample2Bins[binNum]]

var sample1Values = d3.range(1000).map((i)=>(d3.random.bates(10)(i) * (sample1xDomain[1] - sample1xDomain[0]) + sample1xDomain[0]));
var sample2Values = d3.range(1000).map((i)=>(d3.random.bates(10)(i) * (sample2xDomain[1] - sample2xDomain[0]) + sample2xDomain[0]));
var results = d3.range(1000).map((i)=>({ labno: i, results: [sample1Values[i], sample2Values[i]] }));

var resultsToDate = [
  { sampleLabel: '26-07a', method: 'B 13X 004 E', median: 16.8, result: 16.1 },
  { sampleLabel: '26-07b', method: '', median: 27.0, result: 26.9 }
]

export default class Report extends React.Component {
  render() {
    return (
      <div className="report">
        <Page>
          <Layout top="20">
            <NumericHistogram
              left="80" top="70"
              median={sample1.median} limit={sample1.limit} results={sample1Values}
              width={width} height={height} />

            <NumericHistogram
              left="800" top="70"
              median={sample2.median} limit={sample2.limit} results={sample2Values}
              width={width} height={height} />

            <NumericYouden
              left="80" top="270"
              xmedian={sample1.median} xlimit={sample1.limit}
              ymedian={sample2.median} ylimit={sample2.limit}
              results={results} result={results[500]}
              width={130} height={150} />

            <NumericYouden
              left="300" top="270"
              xmedian={sample1.median} xlimit={sample1.limit}
              ymedian={sample2.median} ylimit={sample2.limit}
              results={results} result={results[500]}
              width={130} height={150} />

            <NumericYouden
              left="520" top="270"
              xmedian={sample1.median} xlimit={sample1.limit}
              ymedian={sample2.median} ylimit={sample2.limit}
              results={results} result={results[500]}
              width={130} height={150} />

            <NumericYouden
              left="740" top="270"
              xmedian={sample1.median} xlimit={sample1.limit}
              ymedian={sample2.median} ylimit={sample2.limit}
              results={results} result={results[500]}
              width={130} height={150} />

            <NumericYouden
              left="960" top="270"
              xmedian={sample1.median} xlimit={sample1.limit}
              ymedian={sample2.median} ylimit={sample2.limit}
              results={results} result={results[500]}
              width={130} height={150} />

            <DataToDate x="30" y="500" width="250" height="500" results={resultsToDate} />
            <LeveyJennings x="400" y="500" width="250" height="200" sampleCount="2" runCount="6"/>
          </Layout>
        </Page>
        <Page>
          <Layout top="20">
            <NumericHistogram
              left="80" top="70"
              median={sample1.median} limit={sample1.limit} results={sample1Values}
              width={width} height={height} />

            <NumericHistogram
              left="800" top="70"
              median={sample2.median} limit={sample2.limit} results={sample2Values}
              width={width} height={height} />

            <NumericYouden
              left="80" top="270"
              xmedian={sample1.median} xlimit={sample1.limit}
              ymedian={sample2.median} ylimit={sample2.limit}
              results={results} result={results[500]}
              width={130} height={150} />

            <NumericYouden
              left="300" top="270"
              xmedian={sample1.median} xlimit={sample1.limit}
              ymedian={sample2.median} ylimit={sample2.limit}
              results={results} result={results[500]}
              width={130} height={150} />

            <NumericYouden
              left="520" top="270"
              xmedian={sample1.median} xlimit={sample1.limit}
              ymedian={sample2.median} ylimit={sample2.limit}
              results={results} result={results[500]}
              width={130} height={150} />

            <NumericYouden
              left="740" top="270"
              xmedian={sample1.median} xlimit={sample1.limit}
              ymedian={sample2.median} ylimit={sample2.limit}
              results={results} result={results[500]}
              width={130} height={150} />

            <NumericYouden
              left="960" top="270"
              xmedian={sample1.median} xlimit={sample1.limit}
              ymedian={sample2.median} ylimit={sample2.limit}
              results={results} result={results[500]}
              width={130} height={150} />
          </Layout>
        </Page>
      </div>
    )
  }
}
