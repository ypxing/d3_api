import React from "react"
import { connect } from "react-redux"
import NumericHistogramComp from "../components/numeric-histogram-comp"
import Header from "../components/header"

const mapStateToProps = (state, ownProps) => {
  return { }
}

class NumericHistogram extends React.Component {
  render() {
    return <NumericHistogramComp {...this.props} />
  }
}

export default connect(mapStateToProps)(NumericHistogram)
