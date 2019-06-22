const IpcFalse = require('../../../electron/tests/ipc_false')
const asyncListener = require('../../../core/tests/async_listener')
const asyncSending = require('../../../electron/tests/async_sending')




test('async sending', async () => {
    const ipcFalse = new IpcFalse,
        t = Date.now(),
        send = asyncSending(ipcFalse, 50);

    send('test')
    await asyncListener(ipcFalse, 'test')

    expect(Date.now() - t >= 50).toEqual(true)
})
