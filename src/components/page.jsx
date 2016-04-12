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

// <foreignobject x="10" y="10" width="100" height="150">
//   <body xmlns="http://www.w3.org/1999/xhtml">
//     <table><tbody><tr><td>1</td><td>2</td></tr></tbody></table>
//   </body>
// </foreignobject>
// <image xlinkHref="https://mdn.mozillademos.org/files/2917/fxlogo.png" x="10" y="10" height="100" width="100" />


// let use foreignobject first. IE doesn't support foreignobject.
// <div className="page">
//   <svg
//     className="svg-content-responsive" preserveAspectRatio="xMinYMin meet"
//     viewBox={`0 0 ${this.props.vbWidth || 1123} ${this.props.vbHeight || 794}`}>
//     {this.props.children}
//     <rect x="0" y="0" width="1122" height="791" style={{stroke: "#000", strokeWidth: "1px", fill: "none"}}></rect>
//   </svg>
//   <div className="svg-content-responsive">
//   </div>
// </div>
