

const codes = {
    NOT_FOUND_BW: 'BrowserWindow not found!', 
    TIME_EXPIRED: 'Timed out to open window'
}


class OWError extends Error {
    constructor(code) {
        super(codes[code])
        this.code = code
    }
}


class LoadError extends Error {
    constructor(data) {
        super(data.errorDescription)
        Object.keys(data).forEach(key => {
            this[key] = data[key]
        })
    }
}

exports.OWError = OWError
exports.LoadError = LoadError
exports.codes = codes
