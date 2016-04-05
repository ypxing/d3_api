import d3 from "d3"
import React from "react"

import Header from "./header"

export default class Layout extends React.Component {
  render() {
    var props = this.props
    return (
      <g ref="layout" transform={`translate(${props.left || 0}, ${props.top || 0})`}>
        <Header />
        {this.props.children}
      </g>
    )
  }
}