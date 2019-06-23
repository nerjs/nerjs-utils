const EventEmitter = require('events');


const asyncEmitter = require('../../core/tests/async_emitter')
const asyncListener = require('../../core/tests/async_listener')




describe('core test -> async listener', () => {
    test('success', async () => {
        const emitter = new EventEmitter(),
            t = Date.now();

        asyncEmitter(emitter, 100)('test')
        
        await asyncListener(emitter, 'test')
        expect(!!((Date.now() - t) >= 100)).toBeTruthy()

    })    

    test('fail', async () => {
        const emitter = new EventEmitter(),
            t = Date.now(),
            emit = asyncEmitter(emitter, 100),
            errMess = 'err test mess';


        await expect(asyncListener(emitter, 'test2', 'test3', 500)).rejects.toThrow(asyncListener.TIME_EXPIRED_MESSAGE)
        expect((Date.now() - t) >= 500).toBeTruthy()

        emit('test')
        await expect(asyncListener(emitter, '_', 'test')).rejects.toThrow(asyncListener.UNKNOWN_ERROR_MESSAGE)
        
        emit('test', errMess)
        await expect(asyncListener(emitter, '_', 'test')).rejects.toThrow(errMess)


        emit('test', new Error(errMess))
        await expect(asyncListener(emitter, '_', 'test')).rejects.toThrow(errMess)


        emit('test', {}, errMess)
        await expect(asyncListener(emitter, '_', 'test')).rejects.toThrow(errMess)
        

        emit('test', {}, new Error(errMess))
        await expect(asyncListener(emitter, '_', 'test')).rejects.toThrow(errMess)


        emit('test', {message: errMess})
        await expect(asyncListener(emitter, '_', 'test')).rejects.toThrow(errMess)
        

        emit('test', {}, {message: errMess})
        await expect(asyncListener(emitter, '_', 'test')).rejects.toThrow(errMess)        
    })
})


