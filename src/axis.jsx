var d3 = require("d3");
var React = require("react");
var _ = require("lodash");

//scale, oritent, tickValues, innerTickSize, outertickSize, leftOffset, topOffset
//labelXOffset, labelYOffset
exports.Axis = React.createClass({
  _d3_setter: function(dest, src, properties, funcName) {
    _.forEach(properties, function(item) {
      if (src[item] !== undefined) {
        funcName ? dest[funcName](item, src[item]) : dest[item](src[item])
      }
    });
  },

  _is_y() {
    return this.props.orient === 'left' || this.props.orient === 'right';
  },

  _axis_class() {
    return (this._is_y() ? "x" : "y") + " axis";
  },

  _d3_render: function() {
    var props = this.props;

    var d3_axis = d3.svg.axis()
          .tickFormat(d3.format(",.1f"))
          // .tickPadding(10)
          .scale(props.scale)
          .orient(props.orient);

    //oritent: orient of tick
    //innerTickSize: size of ticks towards oritent
    //outerTickSize: size of "start" and "stop" ticks towards oritent
    //tickPadding: padding between axis and labels
    this._d3_setter(d3_axis, props, ["tickValues", "innerTickSize", "outerTickSize", "tickFormat", "tickPadding"]);

    var d3_text = d3.select(this.refs.axis)
        .call(d3_axis)
      .selectAll("text")
        .style("text-anchor", props.textAnchor || "start");

    this._d3_setter(d3_text, { x: props.labelXOffset, y: props.labelYOffset }, ["x", "y"], "attr");
  },

  componentDidUpdate: function() {
    this._d3_render();
  },

  componentDidMount: function() {
    this._d3_render();
  },

  label() {
    if (!this.props.label || this.props.orient === "right" || this.props.orient === "top") {
      return
    }

    if (this.props.orient === "left") {
      return (
        <text transform="rotate(-90)"
          y={-(+this.props.titlePadding + (this.props.tickPadding || 0))}
          x={-d3.max(this.props.scale.range())/2} dy=".71em"
          style={{textAnchor: "middle"}}>{this.props.label}</text>
      )
    }

    if (this.props.orient === "bottom") {
      return (
        <text
          y={(+this.props.titlePadding + (this.props.tickPadding || 0))}
          x={d3.max(this.props.scale.range())/2} dy=".71em"
          style={{textAnchor: "middle"}}>{this.props.label}</text>
      )
    }
  },

  render: function() {
    var props = this.props;
    return (
      <g className={this._axis_class()}
         transform={`translate(${props.left || 0}, ${props.top || 0})`}
         ref="axis">
         {this.label()}
      </g>
    );
  }
});