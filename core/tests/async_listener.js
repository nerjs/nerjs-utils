
const TIME_EXPIRED_MESSAGE = 'Timed out to open window'
const UNKNOWN_ERROR_MESSAGE = 'Unknown error'

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
    handlerErr = function(_, e) {
        if (!tid) return
        resetHandlers();
        if (_ instanceof Error) {
            reject(_)
        } else if (typeof _ == 'string') {
            reject(new Error(_))
        } else if (e instanceof Error) {
            reject(e)
        } else if (typeof e == 'string') {
            reject(new Error(e)) 
        } else if (typeof _ == 'object' && _.message) {
            reject(new Error(_.message))
        } else if (typeof e == 'object' && e.message) {
            reject(new Error(e.message))
        } else {
            reject(new Error(UNKNOWN_ERROR_MESSAGE))
        }
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
module.exports.UNKNOWN_ERROR_MESSAGE = UNKNOWN_ERROR_MESSAGE

