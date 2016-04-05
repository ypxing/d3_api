import React from 'react';
import ReactDOM from "react-dom"
import { Provider } from 'react-redux';

import createStore from './store/store';
import App from './containers/app';
import "./style"
// import { Router, Route, browserHistory } from 'react-router';

// See documentation for https://github.com/rackt/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
const AppClient = props => {
  const store = createStore(props);
  const reactComponent = (
    <Provider store={store}>
      <App />
    </Provider>
  );
  return reactComponent;
};

const AppComponent = AppClient();

//ReactDOM.render(<svg><rect width="79.64516129032258" height="100" /></svg>,  document.getElementById('test'))
ReactDOM.render(AppComponent,  document.getElementById('container'))

