# electron utils 
utils for [Electron.js](https://electronjs.org/)

- [README](../README.md)
- [core utils](./core.md#core-js-utils) 
  - core utils [for tests](./core.md#for-tests) 
- [math utils](./math.md#core-js-utils) 
- __***electron utils***__
  - electron utils [for tests](#for-tests) 

***

- [ipcMain](#ipcMain)
- [openWin](#openWin)
- [CustomEvent](#CustomEvent)
- For tests:
  - [IpcFalse](#IpcFalse)
  - [asyncSending](#asyncSending)
  - [openWinScript](#openWinScript)

***

### ipcMain

> return: ***ipcMain*** 

***main process***

```js
const electron = require('electron')

const ipcMain = require('nerjs-utils/electron/ipc_main')


(ipcMain === electron.ipcMain) // true

```

***renderer process***

```js
const electron = require('electron')

const ipcMain = require('nerjs-utils/electron/ipc_main')


(ipcMain === electron.remote.ipcMain) // true

```

### openWin 

Открывает новое окно и ждет подтверждения открытия. 

В renderer процессе используется ***electron.remote***.  

Так как в renderer процессе не вызывается событие ***ready-to-show*** на экземпляре BrowserWindow, используются, в том числе, события ***did-finish-load*** и ***did-fail-load*** на обьекте win.webContents. 



***arguments:***

| [name] | type | default | required | description |
| :--: | :--: | :--:| :--: | :-- | 
| template | String | undefined | yes | Абсолютный путь к файлу html. Используется в ***win.loadURL()*** | 
| props | Object | undefined | no | Параметры для создания окна [BrowserWindow](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) | 
| time | Number | 5000 | no | Если за указанное время не придет подтверждение открытия - промис закончится с ошибкой |

> return: ***Promise*** 


```js
const openWin = require('nerjs-utils/electron/open_win')

const win = await openWin(template)
```

***Error handlers***

```js
const openWin = require('nerjs-utils/electron/open_win')

try {
    await openWin(template, {}, 0)
} catch(e) {
    console.log(e instanceof openWin.Error) // true
    console.log(e.message == openWin.errorCodes.TIME_EXPIRED) // true 
    console.log(e.code) // TIME_EXPIRED
}

```

### CustomEvent 

Конструктор события. 

Для renderer процесса используется window.CustomEvent.

Для main процесса - неполноценная эмуляция.


***arguments:***

| [name] | type | default | required | description |
| :--: | :--: | :--:| :--: | :-- | 
| type | String | undefined | yes | |
| params | Object | undefined | no | Для main процесса есть только одна настройка - ***params.cancelable***. Указывает на возможность использовать ***event.preventDefault()*** |

> return: ***Promise*** 


```js
const CustomEvent = require('nerjs-utils/electron/custom_event')

const event = new CustomEvent('TestEvent', {
    cancelable: true|false
})
```

## For tests:

### IpcFalse

Фальшивый ipc. 

Вызов метода ***emitter.send(event)*** генерирует соответствующее событие на текущем обьекте.

> return: ***EventEmitter*** 


```js
const IpcFalse = require('nerjs-utils/electron/tests/ipc_false')

const ipc = new IpcFalse();

ipc.on('test', () => {})

ipc.send('test')

```

### asyncSending 

Аналог [core/asyncEmitter](./core.md#asyncEmitter). 
Вместо ***emitter.emit()*** используется ***emitter.send()***

***arguments:***

| [name] | type | default | required | description | 
| :--: | :--: | :--:| :--: | :-- | 
| emitter | Object | undefined | yes | Обьект должен иметь свойство ***send()*** | 
| time | Number | 10 | no | Задержка перед вызовом ***send()*** | 

> return: ***Function***

```js
const IpcFalse = require('nerjs-utils/core/tests/ipc_false')

const asyncSender = require('nerjs-utils/core/tests/async_emitter')

const emitter = new IpcFalse()

const send = asyncSender(emitter, 200)

send('test_event')

console.time('test time')
emitter.once('test_event', () => {
    console.timeEnd('test time') // ~200ms
})


```

### openWinScript 

Открывает окно с помощью [openWin](#openWin). 

Используется свой файл html. 

После открытия подключается указанный файл js.



***arguments:***

| [name] | type | default | required | description | 
| :--: | :--: | :--:| :--: | :-- | 
| src | String | undefined | yes | Полный путь к файлу js | 
| props | Object | undefined | no | Параметры для создания окна [BrowserWindow](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) | 
| timeoutOpen | Number | 3000 | no | Допустимая задержка для открытия окна. [props.time](#openWin) | 
| timeoutA | Number | 3000 | no | Допустимая задержка для ожидания подтверждения подключения скрипта. [ptops.time](./core.md#asyncListener) | 

> return: ***Promise*** 

```js
const openWinScript = require('nerjs-utils/electron/tests/open_win_script')

await openWinScript(src)

```

***Error handling*** 
```js
const openWinScript = require('nerjs-utils/electron/tests/open_win_script')

const srcFail = '/test' 

try {
    await openWinScript(srcFail)
} catch(e) {
    console.log(e.message == openWinScript.constants.ERROR_MESSAGE) //  true
}