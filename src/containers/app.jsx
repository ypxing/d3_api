import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as analyteActions from '../actions/analyte';

//import { Layout, NumericHistogram } from "react-d3-render"
import Layout from "../components/layout"
import NumericHistogram from "../components/NumericHistogram"

import { parseString } from 'xml2js';
import componentRegistry from "../component-registry"

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  // Note the use of `$$` to prefix the property name because the value is of type Immutable.js
  return state;
}

// Simple example of a React "smart" component
class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    const { dispatch, programInfo } = this.props;
    // const db = this.props.params.db;
    this.actions = bindActionCreators(analyteActions, dispatch);
    this.state = {}
  }

  // static propTypes = {
  //   dispatch: PropTypes.func.isRequired,

  //   // This corresponds to the value used in function select above.
  //   $$helloWorldStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  // }

  componentDidMount() {
//    this.actions.loadAnalyte('anat', 'ID', 16, 1)
    /*
    if (!this.state.subComponents) {
      var xml = '<NumericHistogram left="80" top="50" width="250" height="100" analyteIndex="1" sample="0"/>'
      var that = this;
      parseString(xml, function (err, result) {
        var key = Object.keys(result)[0];
          var com = { key: componentRegistry.getComponent(key)}
          var sub = <com.key {...result[key].$}/>
          that.setState({ subComponents: sub })
      });
    }
    */

  }

  render() {

    // This uses the ES2015 spread operator to pass properties as it is more DRY
    // This is equivalent to:
    // <HelloWorldWidget $$helloWorldStore={$$helloWorldStore} actions={actions} />

    return <Layout top="20">{this.state.subComponents}</Layout>
//    return <Layout top="20"></Layout>

/*
    return (
      <Layout top="20">
        <NumericHistogram
          left="80" top="50" target="26.6" limit="0.1"
          width={250} height={100} />

        <NumericHistogram
          left="800" top="50" target="16.5" limit="0.1"
          width={250} height={100} />
      </Layout>
    );
*/
  }
}

// Don't forget to actually use connect!
// Note that we don't export HelloWorld, but the redux "connected" version of it.
// See https://github.com/rackt/react-redux/blob/master/docs/api.md#examples
export default connect(select)(App);
