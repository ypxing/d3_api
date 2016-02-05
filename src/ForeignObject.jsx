import React from "react"
import d3 from "d3"

export default class ForeignObject extends React.Component {
  render() {
    var props = this.props

    return (
      <foreignobject x={props.x} y={props.y} width={props.width} height={props.height}>
        <body xmlns="http://www.w3.org/1999/xhtml">
          {props.children}
        </body>
      </foreignobject>
    )
  }
}