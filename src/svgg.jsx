var d3 = require("d3");
var ReactDOMServer = require("react-dom/server");
var React = require("react");
var ReactDOM = require("react-dom");

var jsdom = require('jsdom')

// setup the simplest document possible
var doc = jsdom.jsdom('<!doctype html><html><body><svg class="container"></svg></body></html>')

// get the window object out of the document
var win = doc.defaultView

global.document = doc
global.window = win

//console.log(win.document.querySelector('body'));
var container = win.document.querySelector('.container');

exports.Svgg = React.createClass({
  render: function() {
    var props = this.props;
    return <g transform={"translate(" + props.left + ", " + props.top + ")"}>{this.props.children}</g>;
  }
});

// console.log(ReactDOMServer.renderToString(<Svgg left="100" top="200" />));