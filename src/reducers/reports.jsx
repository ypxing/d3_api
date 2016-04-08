import Immutable from "immutable"
import { combineReducers } from 'redux'

import analyteActions from "../constants/analyte"

export default function createDBReducer(db) {
  var reducers = {}

  reducers.analyte = function(state = Immutable.Map(), action) {
    if (action.db === db)
    {
      switch(action.type) {
        case analyteActions.RECEIVE_ANALYTE:
          if (action.program, action.cycle, action.analyte) {
            state = state.set(`${action.program}${action.cycle}-${action.analyte.no}`, Immutable.fromJS(action.analyte))
          }

        break;
      }
    }

    console.log(state)

    return state;
  }

  return combineReducers(reducers);
}