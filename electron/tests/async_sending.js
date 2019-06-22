module.exports = (emitter, t=10) => {
    return function() {
        setTimeout(() => {
            emitter.send.apply(emitter, arguments)
        }, t)
    }
}