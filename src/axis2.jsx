var d3 = require("d3");
var ReactDOMServer = require("react-dom/server");
var React = require("react");
var ReactDOM = require("react-dom");

var margin = {top: 250, right: 40, bottom: 250, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var t1 = new Date(2012, 0, 1),
    t2 = new Date(2013, 0, 1),
    t0 = d3.time.month.offset(t1, -1),
    t3 = d3.time.month.offset(t2, +1);

var x = d3.time.scale()
    .domain([t0, t3])
    .range([t0, t3].map(d3.time.scale()
      .domain([t1, t2])
      .range([0, width])));

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// var svg = d3.select("body").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var jsdom = require('jsdom')

// setup the simplest document possible
var doc = jsdom.jsdom('<!doctype html><html><style>.axis text { font: 10px sans-serif; } .axis line, .axis path { fill: none; stroke: #000; shape-rendering: crispEdges; }</style><body><svg class="container"></svg></body></html>')
// get the window object out of the document
var win = doc.defaultView

global.document = doc
global.window = win

var container = win.document.querySelector('.container');

var Axis = React.createClass({
  componentDidMount: function() {
    d3.select(this.refs.svgg)
        .call(xAxis)
      .selectAll("text")
        .attr("y", 6)
        .attr("x", 6)
        .style("text-anchor", "start");
    console.log(doc.body.innerHTML)
  },

  render: function() {
    return <g ref="svgg" transform={"translate(0, " + height + ")"} className="x axis"></g>
  }
});

// console.log(ReactDOMServer.renderToString(<Axis />));
ReactDOM.render(<Axis />, container);