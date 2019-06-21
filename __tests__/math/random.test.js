const random = require('../../math/random')
const between = require('../../math/between')

test('math/random', () => {
    expect(typeof random()).toEqual('number')
    expect(between(10, 20, random(10, 20))).toEqual(true)
    expect(between(10, 20, random(21, 30))).toEqual(false)

})