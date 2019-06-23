const { remote: { ipcMain } } = require('electron')
const getIpcMain = require('../../../electron/ipc_main')

test('instance ipcMain', () => {
    expect(getIpcMain).toEqual(ipcMain)
})
