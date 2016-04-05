import { Promise } from "es6-promise"
import analyteActions from "../constants/analyte"

export function loadAnalyte(db, program, cycle, analyteNo) {
  // var db = db.toUpperCase();
  // return function(dispatch, getState) {
  //   var analyte = getState().
  // }
  return { type: analyteActions.RECEIVE_ANALYTE, db, program, cycle, analyte: {no: 1, seq: 1, name: 'first'} }
}

export function loadTargetResults(db, program, cycle, analyteNo, runNo) {
  var db = db.toUpperCase();
  // return function(dispatch, getState) {
  //   var analyte = getState().
  // }
}