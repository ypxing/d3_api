import d3 from "d3"
import _ from "lodash"

export default class IntervalNormalizer {
  constructor(scale) {
    var _domain = scale.domain()
    this.max = d3.max(_domain)
    this.min = d3.min(_domain)
  }

  interval() {
    if (!this._interval)
    {
      let diff = this.max - this.min

      if (diff <= 50)
      {
        this._interval = 5;
      }
      else if (diff <= 500)
      {
        this._interval = 50;
      }
      else if (diff <= 1000)
      {
        this._interval = 200;
      }
      else
      {
        this._interval = 250
      }
    }

    return this._interval
  }

  domain() {
    if (!this._domain)
    {
      var _max = this.max;

      var _interval = this.interval()
      _max = Math.ceil(this.max / _interval) * _interval;

      this._domain = [this.min, _max]
    }

    return this._domain
  }

  tickValues() {
    var _ticks = [];
    var _max = d3.max(this.domain());
    var _interval = this.interval();

    _.forEach(d3.range(_max/_interval + 1), function(i) {
        if (i > 0) {
          _ticks.push(i * _interval);
        }
      }
    );

    return _ticks;
  }

  tickFormat() {
    return d3.format(".0f")
  }
}