var d3 = require("d3");
var ReactDOMServer = require("react-dom/server");
var React = require("react");
var ReactDOM = require("react-dom");
var _ = require("lodash");

var Svgg = require("./svgg").Svgg;

var xScale = d3.scale.linear().domain([0, 1]);

var jsdom = require('jsdom')

// setup the simplest document possible
// var doc = jsdom.jsdom('<!doctype html><html><body><svg class="container"></svg></body></html>')
var doc = require("./jsdom").jsDoc;
var container = require("./jsdom").jsContainer;

var height = 0;

// var container = win.document.querySelector('.container');

//scale, oritent, tickValues, innerTickSize, outertickSize, leftOffset, topOffset
//labelXOffset, labelYOffset
exports.Axis = React.createClass({
  _d3_render: function() {
    var props = this.props;

    var d3_axis = d3.svg.axis()
          .scale(props.scale)
          .orient(props.orient);

    //oritent: orient of tick
    //innerTickSize: size of ticks towards oritent
    //outerTickSize: size of "start" and "stop" ticks towards oritent
    _.forEach(["tickValues", "innerTickSize", "outerTickSize"], function(item) {
      if (props[item]) {
        d3_axis[item](props[item])
      }
    });

    d3.select(this.refs.axis)
        .attr("class", "x axis")
        .attr("transform", `translate(${props.leftOffset}, ${props.topOffset})`)
        .call(d3_axis)
      .selectAll("text")
        .attr("y", props.labelYOffset || 6)
        .attr("x", props.labelXOffset || 6)
        .style("text-anchor", props.textAnchor || "start");
  },

  componentDidMount: function() {
    this._d3_render();
    // console.log(container.innerHTML);
  },

  render: function() {
    return <g ref="axis" />;
  }
});

// ReactDOM.render(<exports.Axis orient="bottom" tickValues={[1, 2, 3, 4]} scale={xScale} />, container);