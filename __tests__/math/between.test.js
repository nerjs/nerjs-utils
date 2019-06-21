const between = require('../../math/between')


test('math/between', () => {
    expect(between(10, 20, 15)).toEqual(true)
    expect(between(10, 20, 25)).toEqual(false)
    expect(between(-20, 10, -15)).toEqual(true)
    expect(between(-20, 10, -25)).toEqual(false)
})