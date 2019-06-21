const PREVENTED_KEY = Symbol('PREVENTED_KEY')

class CustomEvent {
    constructor(type, params={}) {
        if (!params || typeof params != 'object') {
            params = {}
        }
        this.type = type;
        this.cancelable = !!params.cancelable

        this[PREVENTED_KEY] = false;



        try {
            Object.defineProperty(this, Symbol.toStringTag, {
                enumerable: false,
                configurable: false,
                writable: false,
                value: 'CustomEvent'
            });
        } catch(e) {}
    }

    preventDefault() {
        this.defaultPrevented = true;
    }

    get defaultPrevented() {
        return this[PREVENTED_KEY];
    }

    set defaultPrevented(value) {
        if (!value || !this.cancelable) return this.defaultPrevented;
        this[PREVENTED_KEY] = !!value;
        return this.defaultPrevented;
    }
}

module.exports = CustomEvent