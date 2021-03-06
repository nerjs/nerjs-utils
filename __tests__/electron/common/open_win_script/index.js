const path = require('path')

const asyncListener = require('../../../../core/tests/async_listener')
const asyncSending = require('../../../../electron/tests/async_sending')
const openWinScript = require('../../../../electron/tests/open_win_script')
const ipcMain = require('../../../../electron/ipc_main')

const pathScript = path.join(__dirname, 'test_script.js')
const pathScriptFail = path.join(__dirname, 'test_script_2.js')

module.exports = () => {
    test('open success', async () => {
        const win = await openWinScript(pathScript)
        const send = asyncSending(win.webContents, 200)

        send(`get:confirm:${win.id}`)
        let res;
        try {
            res = await asyncListener(ipcMain, `set:confirm:${win.id}`, 5000)
        } catch(e) {
            console.error(e)
        }
        expect(res[1]).toEqual(123)
        win.destroy()
    }, 10000)

    test('open fail', async () => {
        const o = {}
        
        
        await expect(openWinScript(pathScriptFail, o, 5000, 10000)).rejects.toThrow(openWinScript.constants.ERROR_MESSAGE)
        await expect(openWinScript(pathScriptFail, o, 5000, 1)).rejects.toThrow(openWinScript.constants.TIME_EXPIRED_MESSAGE)
        
        

    }, 10000)
}