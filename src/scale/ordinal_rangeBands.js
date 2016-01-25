//d3/src/scale/ordinal.js
//step = (stop - start) / (domain.length - padding + 2 * outerPadding);
var d3 = require("d3");

var start = 0;
var stop = 100;
var domain = [1, 2, 3];

var step = null;

var o = d3.scale.ordinal()
  .domain(domain)
  //rangeBands(interval, padding, outerPadding)
  .rangeBands([start, stop]);

console.log("============");
//padding and outerPadding are 0 here
step = (stop - start)/domain.length;
console.log("step == (stop - start)/domain.length: ", step);
console.log("o.rangeBand() == step * (1 - padding): ", step * (1 - 0));
console.log("o.rangeBand(): ", o.rangeBand());

//[o.rangeBand()*0, o.rangeBand()*1, o.rangeBand()*2]
console.log("o.range():", o.range());
console.log("o.rangeExtent(): ", o.rangeExtent());

console.log("==============");
var padding = 0.1;
var outerPadding = 0.6;
console.log("start: ", start, ",stop: ", stop, ",domain: ", domain, ",padding: ", padding, ",outerPadding: ", outerPadding);

o = d3.scale.ordinal()
  .domain(domain)
  .rangeBands([start, stop], padding, outerPadding);

console.log("step == (stop - start)/(domain.length - padding + 2*outerPadding)",
      (stop - start)/(domain.length - padding + 2*outerPadding));

step = (stop - start)/(domain.length - padding + 2*outerPadding);
console.log("step: ", step);
console.log("o.rangeBand() == step * (1 - padding): ", step * (1 - padding));
console.log("o.rangeBand(): ", o.rangeBand());
console.log("outerPadding == step * outerPadding: ", step * outerPadding);

console.log("o.range():", o.range());
console.log("o.rangeExtent(): ", o.rangeExtent());

console.log("++++++++");
console.log("ordinal(x)", o(2));

console.log("++++++++");
console.log("domain(x)", o.domain());

console.log("++++++++");
console.log("range(x)", o.range());

console.log("++++++++ rangePoints");
domain = [1, 2, 3, 4];
//start = 0;
//stop = 100;

o = d3.scale.ordinal()
  .domain(domain)
  .rangePoints([start, stop]);

console.log("step == (stop - start)/(domain.length - 1): ", (stop - start)/(domain.length - 1));
console.log(o.range());

padding = 0.2;
o.rangePoints([start, stop], padding);
step = (stop - start)/(domain.length - 1 + padding);
console.log("step == (stop - start)/(domain.length - 1 + padding): ", step);
console.log("left padding == step * (padding/2): ", step * (padding/2));
console.log("range: ", o.range());
