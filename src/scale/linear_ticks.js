var d3 = require("d3");

var x = d3.scale.linear().domain([-1, 1]);

console.log("default range: ", x.range());
console.log(x.ticks(5));
// for d3.format https://github.com/mbostock/d3/wiki/Formatting#d3_format
// count in ticks and tickFormat should be same
console.log(x.ticks(5).map(x.tickFormat(5, "+.1%")));
