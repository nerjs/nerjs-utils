const EventEmitter = require('events');

class IpcFalse extends EventEmitter {
    send() {
        this.emit.apply(this, arguments)
    }
}

module.exports = IpcFalse
