# math js utils

- [README](../README.md)
- [core utils](./core.md#core-js-utils) 
  - core utils [for tests](./core.md#for-tests) 
- __***math utils***__
- [electron utils](./electron.md#electron-utils) 
  - electron utils [for tests](./electron.md#for-tests) 

***

- [allowDiff](#allowDiff)
- [between](#between)
- [random](#random)

### allowDiff 

Проверяет, является ли разница между числами меньше или равно указанного значения.


***arguments:***


| [name] | type | default | required |
| :--: | :--: | :--:| :--: |
| min | Number | undefined | yes |
| max | Number | undefined | yes |
| target | Number | undefined | yes | 


> return: ***Boolean*** 

```js
const allowDiff = require('nerjs-utils/math/allow_diff')

allowDiff(10, 20, 5) // false
allowDiff(10, 20, 10) // true
allowDiff(10, 20, 25) // true
```

### between 

Проверяет, входит ли число в диапазон.


***arguments:***

| [name] | type | default | required |
| :--: | :--: | :--:| :--: | 
| min | Number | undefined | yes |
| max | Number | undefined | yes |
| target | Number | undefined | yes | 

> return: ***Boolean*** 

```js
const between = require('nerjs-utils/math/between')

between(10, 20, 15) // true
between(10, 20, 25) // false
```

### random

Случайное число в диапазоне 


***arguments:***

| [name] | type | default | required |
| :--: | :--: | :--:| :--: | 
| min | Number | 0 | yes | 
| max | Number | 1 | yes | 

> return: ***Number***

```js
const random = require('nerjs-utils/math/random')

random(10, 20) // 10 <= ... <= 20
```
