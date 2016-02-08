import React from "react"
import d3 from "d3"

import Coordinate from "./coordinate"

export default class LeveyJennings extends React.Component {
  render() {
    var props = this.props;
    var xScale = d3.scale.ordinal()
                         .domain(d3.range(+props.runCount))
                         .rangePoints([0, +props.width], .3);

    var labels = []
    xScale.range().forEach((d, i) => {
      labels.push(
        <text key={"xlabels" + i} transform={`translate(${d}, ${+props.height + 35})`} className="xlabel">
          <tspan x="0" y="0" dy="-1.6em">{i * 2 + 1}</tspan>
          <tspan x="0" y="0" dy="-0.5em">{i * 2 + 2}</tspan>
        </text>
      )
    })

    var yScale = d3.scale.linear()
                         .domain([-2.25, 2.25])
                         .range([+props.height, 0])

    var ytickValues = d3.range(5).map((i)=>(i - 2))//[-2, -1, 0, 2, 1]
    var gytickValues = d3.range(4).map((i)=>(i - 1.5)).concat(ytickValues)

    return (
      <g ref="leveyJennings" className="levey-jennings" transform={`translate(${props.x || 0}, ${props.y || 0})`}>
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