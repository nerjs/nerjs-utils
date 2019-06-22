const { BrowserWindow } = require('electron')
const openWin = require('../../../electron/open_win')
const openWinCommon = require('../common/open_win')
const getTemplate = require('../common/open_win/get_template')


describe('openWim module for main process', () => {
    test('instanceOf', async () => {
        const win = await openWin(getTemplate, {
            width: 0, 
            height: 0,
            opacity: 0,
            webPreferences: {
                nodeIntegration: true
            }
        })
        expect(win).toBeInstanceOf(BrowserWindow)

        win.close()
    })

    openWinCommon()
});
