
const TIME_EXPIRED_MESSAGE = 'Timed out to open window'

module.exports = (emitter, event, eventErr, t=3000) => new Promise((resolve, reject) => {
    if (typeof eventErr == 'number') {
        t = eventErr;
        eventErr = null;
    }

    let tid, handler, handlerErr, handlerTimeout;

    const resetHandlers = () => {
        emitter.removeListener(event, handler);
        if (eventErr) emitter.removeListener(eventErr, handlerErr);
        if (tid) clearTimeout(tid);
        tid = null;
    }

    handler = function() {
        if (!tid) return
        resetHandlers();
        resolve(Array.from(arguments))
    }

    handlerErr = function() {
        if (!tid) return
        resetHandlers();
        reject(Array.from(arguments))
    }
    
    
    handlerTimeout = () => {
        if (!tid) return
        tid = null;
        resetHandlers();
        reject(new Error(module.exports.TIME_EXPIRED_MESSAGE))
    }

    tid = setTimeout(handlerTimeout, t);

    emitter.once(event, handler)

    if (eventErr) {
        emitter.once(eventErr, handlerErr)
    }

})

module.exports.TIME_EXPIRED_MESSAGE = TIME_EXPIRED_MESSAGE

