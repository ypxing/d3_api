import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
// import { syncHistory } from 'redux-simple-router';
// import { browserHistory, createMemoryHistory } from 'react-router';


// See https://github.com/gaearon/redux-thunk and http://redux.js.org/docs/advanced/AsyncActions.html
// This is not actually used for this simple example, but you'd probably want to use this once your app has
// asynchronous actions.
import thunkMiddleware from 'redux-thunk';

// This provides an example of logging redux actions to the console.
// You'd want to disable this for production.
import loggerMiddleware from '../lib/middlewares/logger';

import reducers from '../reducers';
// import { initalStates } from '../reducers';

export default props => {
  // This is how we get initial props Rails into redux.
  // const { name } = props;
  // const { $$helloWorldState, $$assessCasesState, $$programInfoState } = initalStates;

  // Sync dispatched route actions to the history
  // browserHistory is not available for server side rendering
  // const reduxRouterMiddleware = syncHistory(browserHistory || createMemoryHistory());

  // Redux expects to initialize the store using an Object, not an Immutable.Map
  const initialState = {
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    // applyMiddleware(thunkMiddleware, reduxRouterMiddleware, loggerMiddleware)
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
  const storeCreator = composedStore(createStore);
  const store = storeCreator(reducer, initialState);

  // // Required for replaying actions from devtools to work
  // reduxRouterMiddleware.listenForReplays(store);

  return store;
};

