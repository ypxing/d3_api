var d3 = require("d3");
import IntervalNormalizer from "./IntervalNormalizer"

var scale = d3.scale.linear().domain([0, 199]).range([0, 1000]);

var a = new IntervalNormalizer(scale);
console.log(a.interval());
console.log(a.domain());
console.log(a.tickValues());
