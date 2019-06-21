const allowDiff = require('../../math/allow_diff')

test('allowable difference', () => {
    expect(allowDiff(30, 40, 10)).toEqual(true)
    expect(allowDiff(30, 40, 5)).toEqual(false)
    expect(allowDiff(50, 40, 10)).toEqual(true)
    expect(allowDiff(50, 40, 5)).toEqual(false)
})