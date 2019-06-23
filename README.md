# nerjs-utils
frequently used tools



- [core utils](./docs/core.md#core-js-utils) 
  - core utils [for tests](./docs/core.md#for-tests) 
- [math utils](./docs/math.md#math-js-utils) 
- [electron utils](./docs/electron.md#electron-utils) 
  - electron utils [for tests](./docs/electron.md#For-tests) 

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