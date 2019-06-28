const url = require('url')

const BrowserWindow = require('./bw')
const { OWError, LoadError } = require('./errors')


module.exports = (template, props, t=5000) => new Promise((resolve, reject) => {
    
    let win, tid, handler, handlerErr;
    win = new BrowserWindow(props)

    const resetWin = () => {
        if (!win.isDestroyed()) win.destroy();
        win = null;
    }

    const resetHandlers = isResetWin => {
        if (tid) clearTimeout(tid)
        if (!win) return;
        tid = null;
        win.removeListener('ready-to-show', handler)
        win.webContents.removeListener('did-finish-load', handler)
        win.webContents.removeListener('did-fail-load', handlerErr)

        if (isResetWin) resetWin()
    }



    tid = setTimeout(() => {
        if (!tid) return;
        tid = null;
        resetHandlers(true);
        reject(new OWError('TIME_EXPIRED'))
    }, t)

    handler = () => {
        if (!tid) return;
        resetHandlers();
        resolve(win)
    }

    handlerErr = (event, errorCode, errorDescription, templateUrl, isMainFrame, frameProcessId) => {
        if (!tid) return; 
        resetHandlers(true);
        reject(new LoadError({ errorCode, errorDescription, templateUrl, isMainFrame, frameProcessId }))
    }

    win.on('ready-to-show', handler)
    win.webContents.on('did-finish-load', handler)
    win.webContents.on('did-fail-load', handlerErr)

    win.loadURL(url.format({
        protocol: 'file:',
        pathname: template, 
        slashes: true
    })).catch(e => {
        if (!tid) return;
        resetHandlers(true);
        reject(e)
    })

})


module.exports.Error = OWError
module.exports.errorCodes = OWError.codes