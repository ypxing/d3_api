var jsdom = require('jsdom')
// setup the simplest document possible
export const jsHeader = '<!doctype html><html><head><style>.axis text { font: 10px sans-serif; } .axis line, .axis path { fill: none; stroke: #000; shape-rendering: crispEdges; }</style></head><body><svg width="960" height="500" class="container">'
export const jsFooter = '</svg></body></html>'

export function htmlString(body) {
  if (!body && body !== '') {
    body = jsContainer.innerHTML;
  }

  return jsHeader + body + jsFooter;
}

export var jsDoc = jsdom.jsdom(htmlString(''))

// get the window object out of the document
var win = jsDoc.defaultView

global.document = jsDoc
global.window = win

export var jsContainer = win.document.querySelector('.container');
