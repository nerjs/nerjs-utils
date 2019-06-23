const EventEmitter = require('events');
const asyncListener = require('../../core/tests/async_listener')
const asyncEmitter = require('../../core/tests/async_emitter')




test('async emitter', async () => {
    const emitter = new EventEmitter(),
        t = Date.now(),
        emit = asyncEmitter(emitter, 50);

    emit('test')
    await asyncListener(emitter, 'test')

    expect(Date.now() - t >= 50).toBeTruthy()
})