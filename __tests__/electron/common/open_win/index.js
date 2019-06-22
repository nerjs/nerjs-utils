const isRenderer = require('is-electron-renderer')
const electron = require('electron')

const template = require('./get_template')

const openWin = require('../../../../electron/open_win')
const asyncListener = require('../../../../core/tests/async_listener')
const asyncSending = require('../../../../electron/tests/async_sending')

const ipc = isRenderer ? electron.remote.ipcMain : electron.ipcMain

const options = {
    width: 0, 
    height: 0,
    opacity: 0,
    webPreferences: {
        nodeIntegration: true
    }
}


module.exports = () => {

    test('is open window', async () => {
        const win = await openWin(template, options)

        const send = asyncSending(win.webContents)
        send('test1')
        const res = await asyncListener(ipc, 'test1:post')

        expect(res[1]).toEqual(123)

        win.close()
    })

    test('template ', async () => {
        const win = await openWin(template, options)

        const send = asyncSending(win.webContents)
        send('test2')
        const res = await asyncListener(ipc, 'test2:post')

        expect(res[1]).toEqual(template)

        win.close()
    })
}