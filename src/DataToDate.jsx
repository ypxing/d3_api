import React from "react"
import d3 from "d3"
import _ from "lodash"

import ForeignObject from "./ForeignObject"

export default class DataToDate extends React.Component {
  _d3_render() {
    this._d3_clear()

    var tbody4results = d3.select(this.refs.tbody4results);

    this.resultRow = tbody4results.selectAll("tr.result-row")
                                  .data(this.props.results)
                                  .enter()
                                    .append("tr")
                                    .attr("class", "result-row")

    // > is hardcoded now
    var cells = this.resultRow.selectAll("td")
             .data((d) => (['>', d.sampleLabel, d.method, d.median, d.result]))
             .enter()
               .append("td")
               .attr("class", "col")
               .html((d)=>(d))

  }

  _d3_clear() {
    if (this.resultRow) {
      this.resultRow.remove()
    }
  }

  componentDidUpdate() {
    this._d3_render();
  }

  componentDidMount() {
    this._d3_render()
  }

  render() {
    var props = this.props

    return (
      <ForeignObject x={props.x} y={props.y} width={props.width} height={props.height}>
        <table className="data-to-date">
          <thead>
            <tr>
              <th className="col"></th>
              <th className="col">Spec.</th>
              <th className="col">Method</th>
              <th className="col">Median</th>
              <th className="col">Result</th>
            </tr>
          </thead>
          <tbody ref="tbody4results">
          </tbody>
        </table>
      </ForeignObject>
    )
  }
}