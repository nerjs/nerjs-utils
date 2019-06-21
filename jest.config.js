const path = require('path')


module.exports = {
    projects: [
        {
            displayName: 'core utils',
            testEnvironment: 'node',
            testMatch: ['**/__tests__/core/*.(spec|test).js']
        }, {
            displayName: 'math utils',
            testEnvironment: 'node',
            testMatch: ['**/__tests__/math/*.(spec|test).js']
        }, {
            displayName: 'electron (Main process)',
            runner: '@jest-runner/electron/main',
            testEnvironment: 'node',
            testMatch: ['**/__tests__/electron/main/*.(spec|test).js'],
        }, 
        {
            displayName: 'electron (Renderer process)',
            runner: '@jest-runner/electron',
            testEnvironment: '@jest-runner/electron/environment',
            testMatch: ['**/__tests__/electron/renderer/*.(spec|test).js']
        }
      ]
}