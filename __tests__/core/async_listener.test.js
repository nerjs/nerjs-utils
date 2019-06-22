const EventEmitter = require('events');

const asyncListener = require('../../core/tests/async_listener')

describe('a', () => {
    test('test -> async listener', async () => {
        const emitter = new EventEmitter(),
            t = Date.now();

        setTimeout(() => emitter.emit('test'), 100)
        
        await asyncListener(emitter, 'test')
        expect(!!((Date.now() - t) >= 100)).toBeTruthy()
    })    
})


