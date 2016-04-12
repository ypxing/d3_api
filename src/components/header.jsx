import d3 from "d3"
import React, { PropTypes } from "react"
import moment from "moment"

export default class Header extends React.Component {
  render() {
    var props = this.props

    return (
      <g ref="header" transform={`translate(${props.left || 0}, ${props.top || 0})`}>
        <g transform="translate(60, 0)">
          <text y="10">Printed</text>
          <text y="20">{moment().format("MMM DD HH:mm:ss YYYY")}</text>
        </g>

        <g transform="translate(800, 0)">
          <text y="10">Prepared by:</text>
          <text y="20">xxx</text>
        </g>
        <g transform="translate(1000, 0)">
          <text y="10">Page 1</text>
        </g>
      </g>
    )
  }
}
