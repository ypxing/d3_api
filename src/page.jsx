import React from "react"

export default class Page extends React.Component {
  render() {
    return (
      <svg
        className="svg-content-responsive" preserveAspectRatio="xMinYMin meet"
        viewBox={`0 0 ${this.props.vbWidth || 1123} ${this.props.vbHeight || 794}`}>
        {this.props.children}
        <rect x="0" y="0" width="1122" height="791" style={{stroke: "#000", strokeWidth: "1px", fill: "none"}}></rect>
      </svg>
    )
  }
}

