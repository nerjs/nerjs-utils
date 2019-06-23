# core js utils

- [README](../README.md)
- __***core utils***__
  - core utils [for tests](#for-tests) 
- [math utils](./math.md#math-js-utils)  
- [electron utils](./electron.md#electron-utils) 
  - electron utils [for tests](./electron.md#for-tests) 

***


- [sleep](#sleep)
- For tests:
  - [asyncEmitter](#asyncEmitter)
  - [asyncListener](#asyncListener)

***


### sleep 

async setTimeout

***arguments:***

| [name] | type | default | required | description | 
| :--: | :--: | :--:| :--: | :-- | 
| time | Number | 0 | yes | |


> return: ***Promise***

```js
const sleep = require('nerjs-utils/core/sleep');

const test = async () => {
    console.time('test')

    await sleep(200)

    console.timeEnd('test') // ~200ms
}
```


## For tests:

### asyncEmitter 

***arguments:***

| [name] | type | default | required | description | 
| :--: | :--: | :--:| :--: | :-- | 
| emitter | Object | undefined | yes | Обьект должен иметь свойство ***emit()*** | 
| time | Number | 10 | no | Задержка перед вызовом ***emit()*** | 

> return: ***Function***

```js
const EventEmitter = require('events')

const asyncEmitter = require('nerjs-utils/core/tests/async_emitter')

const emitter = new EventEmitter()

const emit = asyncEmitter(emitter, 200)

emit('test_event')

console.time('test time')
emitter.once('test_event', () => {
    console.timeEnd('test time') // ~200ms
})


```


### asyncListener

***arguments:***

| [name] | type | default | required | description | 
| :--: | :--: | :--:| :--: | :-- | 
| emitter | Object | undefined | yes | Обьект должен иметь свойства ***on()/once()*** | 
| eventSuccess | String | undefined | yes | Событие, вызов которого завершает промис успехом | 
| eventFail | String | undefined | no |  Событие, вызов которого завершает промис с ошибкой | 
| time | Number | 3000 | no | Задержка. Время, по истечению которого завершает промис с ошибкой ***asyncListener.TIME_EXPIRED_MESSAGE*** | 

> return: ***Promise*** 


```js
const EventEmitter = require('events')

const asyncListener = require('nerjs-utils/core/tests/async_listener') 

const emitter = new EventEmitter()
let res;

setTimeout(() => emitter.emit('test', 123, 321), 100) 
res = await asyncListener(emitter, 'test')
console.log(res) // [123, 321]



setTimeout(() => emitter.emit('test'), 2000) 
try {
    await asyncListener(emitter, 'test', null, 1000)
} catch(e) {
    console.error(e) // Error: [asyncListener.TIME_EXPIRED_MESSAGE]
} 


// ERROR HANDLING

setTimeout(() => emitter.emit('test'), 100) 
try {
    await asyncListener(emitter, '_test_', 'test')
} catch(e) {
    console.error(e) // Error: [asyncListener.UNKNOWN_ERROR_MESSAGE]
} 
``` 

[asyncListener all fails tests](https://github.com/nerjs/nerjs-utils/blob/3efd3757ae19ca0740db89c94cfb073f17b76ebd/__tests__/core/async_listener.test.js#L21)