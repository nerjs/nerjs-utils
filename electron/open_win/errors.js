

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

exports = module.exports = OWError
exports.codes = codes
