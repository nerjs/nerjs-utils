const isRenderer = require('is-electron-renderer')

if (isRenderer && window && window.CustomEvent) {
    module.exports = window.CustomEvent
} else {
    module.exports = require('./event')
}