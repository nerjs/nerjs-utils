const isRenderer = require('is-electron-renderer')
const electron = require('electron')

const OWError = require('./errors')


let BrowserWindow = (isRenderer && electron.remote) ? electron.remote.BrowserWindow : electron.BrowserWindow;


if (!BrowserWindow) {
    class BW {
        constructor() {
            throw new OWError('NOT_FOUND_BW')
        }
    } 

    BrowserWindow = BW
}


module.exports = BrowserWindow
