import React from 'react';
import ReactDOM from "react-dom"
import { Provider } from 'react-redux';
var jsdom = require('jsdom')

import createStore from './store/store';
import App from './containers/app';

export const jsHeader = `<!doctype html><html><head><link rel="stylesheet" type="text/css" href="${path.join(__dirname, "../src")}/style.css"></head><body>`
export const jsFooter = '</svg></body></html>'

import path from "path"

console.log(path.join(__dirname, "..", "build/bundle.js"))
// import { Router, Route, browserHistory } from 'react-router';

// See documentation for https://github.com/rackt/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
// const AppClient = props => {
//   const store = createStore(props);
//   const reactComponent = (
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );
//   return reactComponent;
// };

// const AppComponent = AppClient();

// ReactDOM.render(AppComponent,  document.getElementById('container'))

jsdom.env({
      url: 'http://localhost:3003/index.html',
      features:{ QuerySelector:true }, //you need query selector for D3 to work
      done:function(errors, window){
        var outerHTML = window.document.documentElement.outerHTML;
        console.log(outerHTML.replace(/\<script type="text\/javascript" src="\/bundle.js" charset="utf-8"\>\<\/script\>/, ''))
      }
})