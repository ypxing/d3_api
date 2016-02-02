import React from "react"

export default class Page extends React.Component {
  render() {
    return (
      <svg
        className="svg-content-responsive" preserveAspectRatio="xMinYMin meet"
        viewBox={`0 0 ${this.props.vbWidth || 1123} ${this.props.vbHeight || 794}`}>
        {this.props.children}
      </svg>
    )
  }
}

