var jsdom = require('jsdom')
var path = require("path")
// setup the simplest document possible
export const jsHeader = `<!doctype html><html><head><link rel="stylesheet" type="text/css" href="${path.join(__dirname, "../src")}/style.css"></head><body><svg width="297mm" height="210mm" class="container">`
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
