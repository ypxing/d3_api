var d3 = require("d3");
var React = require("react");
var _ = require("lodash");

//scale, oritent, tickValues, innerTickSize, outertickSize, leftOffset, topOffset
//labelXOffset, labelYOffset
exports.Axis = React.createClass({
  _d3_setter: function(dest, src, properties, funcName) {
    _.forEach(properties, function(item) {
      if (src[item]) {
        funcName ? dest[funcName](item, src[item]) : dest[item](src[item])
      }
    });
  },

  _d3_render: function() {
    var props = this.props;

    var d3_axis = d3.svg.axis()
          .scale(props.scale)
          .orient(props.orient);

    //oritent: orient of tick
    //innerTickSize: size of ticks towards oritent
    //outerTickSize: size of "start" and "stop" ticks towards oritent
    this._d3_setter(d3_axis, props, ["tickValues", "innerTickSize", "outerTickSize"]);

    var d3_text = d3.select(this.refs.axis)
        .attr("class", "x axis")
        .attr("transform", `translate(${props.leftOffset || 0}, ${props.topOffset || 0})`)
        .call(d3_axis)
      .selectAll("text")
        .style("text-anchor", props.textAnchor || "start");

    this._d3_setter(d3_text, { x: props.labelXOffset, y: props.labelYOffset }, ["x", "y"], "attr");
  },

  componentDidMount: function() {
    this._d3_render();
  },

  render: function() {
    return <g ref="axis" />;
  }
});

// ReactDOM.render(<exports.Axis orient="bottom" tickValues={[1, 2, 3, 4]} scale={xScale} />, container);