import React from "react"
import d3 from "d3"

import Coordinate from "./coordinate"

export default class LeveyJennings extends React.Component {

  _yValue(d) {
    return (d.result - d.median)/(d.median * d.limit)
  }

  _d3_render() {
    this._d3_clear();
    this.d3LeveyJennings = d3.select(this.refs.leveyJennings).append("g");

    var props = this.props;
    var xScale = this.xScale();
    var yScale = this.yScale();

    var points = []
    props.data.forEach((data, i) => {
      var sample1 = data[0]
      var sample2 = data[1]
      var y1 = yScale(this._yValue(sample1))
      var y2 = yScale(this._yValue(sample2))
      y1 = d3.max([y1, y2])
      y2 = d3.min([y1, y2])

      var x = xScale(i)

      points.push([x, y1])
      points.unshift([x, y2])
    })

    this.d3LeveyJennings.append("polygon")
      // npm pattenfills
      .style("fill", "url(#crosshatch-black)")
      .attr("points", points)

    this.d3LeveyJennings.selectAll("text.result-point")
      .data(points)
      .enter()
        .append("text")
        .attr("class", "result-point")
        .attr("x", (d)=>(d[0]))
        .attr("y", (d)=>(d[1]))
        .attr("dy", "0.30em")
        .text("x")
  }

  _d3_clear() {
    if (this.d3LeveyJennings) {
      this.d3LeveyJennings.remove()
    }
  }

  componentDidUpdate() {
    this._d3_render();
  }

  componentDidMount() {
    this._d3_render();
  }

  xScale() {
    return d3.scale.ordinal()
                   .domain(d3.range(+this.props.runCount))
                   .rangePoints([0, +this.props.width], .3);
  }

  yScale() {
    return d3.scale.linear()
                   .domain([-2.25, 2.25])
                   .range([+this.props.height, 0])
  }

  render() {
    var props = this.props;
    var xScale = this.xScale();

    var labels = []
    xScale.range().forEach((d, i) => {
      labels.push(
        <text key={"xlabels" + i} transform={`translate(${d}, ${+props.height + 35})`} className="xlabel">
          <tspan x="0" y="0" dy="-1.6em">{i * 2 + 1}</tspan>
          <tspan x="0" y="0" dy="-0.5em">{i * 2 + 2}</tspan>
        </text>
      )
    })

    var yScale = this.yScale();

    var ytickValues = d3.range(5).map((i)=>(i - 2))//[-2, -1, 0, 2, 1]
    var gytickValues = d3.range(4).map((i)=>(i - 1.5)).concat(ytickValues)

    return (
      <g ref="leveyJennings" className="levey-jennings" transform={`translate(${props.x || 0}, ${props.y || 0})`}>
        <defs>
          <pattern id="crosshatch-black" patternUnits="userSpaceOnUse" width="8" height="8">
            <image xlinkHref="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnPgogIDxyZWN0IHdpZHRoPSc4JyBoZWlnaHQ9JzgnIGZpbGw9JyNmZmYnLz4KICA8cGF0aCBkPSdNMCAwTDggOFpNOCAwTDAgOFonIHN0cm9rZS13aWR0aD0nMC41JyBzdHJva2U9JyMwMDAnLz4KPC9zdmc+Cg==" x="0" y="0" width="8" height="8">
            </image>
          </pattern>
        </defs>

        <rect
          height={yScale(1)}
          width={props.width}
          className="shadow" />

        <rect transform={`translate(0, ${yScale(-1)})`}
          height={props.height - yScale(-1)}
          width={props.width}
          className="shadow" />

        {/* vertical line at right hand side */}
        <line className="right-line" transform={`translate(${props.width}, 0)`} y2={props.height} />

        <Coordinate
          xScale={xScale}
          xTop={props.height}
          xtickFormat={()=>("")}
          xouterTickSize="0"
          xtitlePadding="35"
          xhideLine={true}
          xlabel="Specimen Number"

          yScale={yScale}
          ytickValues={ytickValues}
          ytickFormat={d3.format("+")}
          youterTickSize="0"
          ytitlePadding="35"
          showYGrid={true}
          gytickValues={gytickValues}
          ginnerTickSize={d3.max(xScale.rangeExtent())}
          ylabel="Allowable Limits of Performance" />

        {labels}
      </g>
    )
  }
}
