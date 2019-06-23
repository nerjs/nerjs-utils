const isRenderer = require('is-electron-renderer')
const electron = require('electron')

module.exports = isRenderer ? electron.remote.ipcMain : electron.ipcMain
