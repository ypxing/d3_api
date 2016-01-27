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

  _is_y() {
    return this.props.orient === 'left' || this.props.orient === 'right';
  },

  // assume min of domain is 0
  _tick_interval() {
    var _max = d3.max(this.props.scale.domain());
    if (_max <= 50)
    {
      return 5;
    }

    if (_max <= 500)
    {
      return 50;
    }

    if (_max <= 1000)
    {
      return 200;
    }

    return 250;
  },

  _axis_domain() {
    var _domain = this.props.scale.domain();
    var _max = d3.max(_domain);

    if (this.props.evenInterval) {
      var interval = this._tick_interval()
      _max = Math.ceil(_max / interval) * interval;
    }

    return [d3.min(_domain), _max]
  },

  _axis_class() {
    return (this._is_y() ? "x" : "y") + " axis";
  },

  _axis_ticks() {
    var _ticks = [];
    var _max = d3.max(this._axis_domain());
    var _interval = this._tick_interval();

    _.forEach(d3.range(_max/_interval + 1), function(i) {
        if (i > 0) {
          _ticks.push(i * _interval);
        }
      }
    );

    return _ticks;
  },

  _d3_render: function() {
    var props = this.props;

    var d3_axis = d3.svg.axis()
          .scale(props.scale.domain(this._axis_domain()))
          .orient(props.orient);

    if (props.evenInterval) {
      d3_axis.tickValues(this._axis_ticks());
    }

    //oritent: orient of tick
    //innerTickSize: size of ticks towards oritent
    //outerTickSize: size of "start" and "stop" ticks towards oritent
    this._d3_setter(d3_axis, props, ["tickValues", "innerTickSize", "outerTickSize"]);

    var d3_text = d3.select(this.refs.axis)
        .attr("class", this._axis_class())
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