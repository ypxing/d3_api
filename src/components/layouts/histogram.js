//import d3 from "d3"
var d3 = require("d3")

var values = d3.range(1000).map(d3.random.bates(10));
var x = d3.scale.linear()
    .domain([0, 1]);

// Generate a histogram using twenty uniformly-spaced bins.
var data = d3.layout.histogram()
    .bins(x.ticks(20))
    (values);

data = d3.layout.histogram();
//console.log(x.ticks(20).length);
//console.log(data([1, 2, 2, 2]));
console.log(x.rangeExtend());
