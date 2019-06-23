const { ipcRenderer, remote: { getCurrentWindow } } = require('electron')

// alert(123)
try {
    // ipcRenderer.on('get:confirm', () => alert('set:confirm')) 
    ipcRenderer.on(`get:confirm:${getCurrentWindow().id}`, () => ipcRenderer.send(`set:confirm:${getCurrentWindow().id}`, 123))
} catch(e) {
    alert(e.message)
}

