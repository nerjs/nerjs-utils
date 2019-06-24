const path = require('path')
const recursive = require('merge').recursive
const isRenderer = require('is-electron-renderer')
const electron = require('electron')

const constants = require('./constants')
const openWin = require('../../open_win') 
const asyncListener = require('../../../core/tests/async_listener')


const ipcMain = isRenderer ? electron.remote.ipcMain : electron.ipcMain
const template = path.join(__dirname, 'template.html')

module.exports = async (src, opt, timeoutOpen=3000, timeoutA=3000) => {
    const options = recursive({
        width: 0,
        height: 0,
        opacity: 0,
        webPreferences: {
            nodeIntegration: true
        }
    }, opt || {})

    const win = await openWin(template, options, timeoutOpen)

    win.webContents.send(constants.EVENT_SEND, src, timeoutA)

    try {
        await asyncListener(ipcMain, constants.EVENT_SUCCESS, constants.EVENT_FAIL, timeoutA * 1.5)
    } catch(e) {
        if (typeof e == 'string') throw new Error(e)
        throw e
    }
    
    return win
}

module.exports.constants = constants
module.exports.constants.TIME_EXPIRED_MESSAGE = asyncListener.TIME_EXPIRED_MESSAGE
