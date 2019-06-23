# nerjs-utils
frequently used tools



- [core utils](https://github.com/nerjs/nerjs-utils/blob/master/docs/core.md#core-js-utils) 
  - core utils [for tests](https://github.com/nerjs/nerjs-utils/blob/master/docs/core.md#for-tests) 
- [math utils](https://github.com/nerjs/nerjs-utils/blob/master/docs/math.md#math-js-utils) 
- [electron utils](https://github.com/nerjs/nerjs-utils/blob/master/docs/electron.md#electron-utils) 
  - electron utils [for tests](https://github.com/nerjs/nerjs-utils/blob/master/docs/electron.md#For-tests) 

***

## install 

```
npm i --save nerjs-utils 
```

## import


## imports 

```js
const { [moduleCategory]: { [moduleName] } } = require('nerjs-utils')
```
or:
```js
const { [moduleName] } = require('nerjs-utils/[moduleCategory]')
```
or:
```js
const moduleName = require('nerjs-utils/[moduleCategory]/[moduleName]')
```
***


## imports utils for tests

```js
const { { [moduleCategory]: { tests: { [moduleName] } } } } = require('nerjs-utils')
```
or:
```js
const { [moduleName] } = require('nerjs-utils/[moduleCategory]/tests')
```
or:
```js
const moduleName = require('nerjs-utils/[moduleCategory]/tests/[moduleName]')
```
***