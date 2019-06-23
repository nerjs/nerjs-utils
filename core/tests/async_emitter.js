module.exports = (emitter, t=10) => {
    return function() {
        setTimeout(() => {
            emitter.emit.apply(emitter, arguments)
        }, t)
    }
}