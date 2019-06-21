const sleep = require('../../core/sleep')
const allowDiff = require('../../math/allow_diff')

test('sleep (es6)', async () => {
    const t = 200,
        d = Date.now();

    await sleep(t)

    const d2 = Date.now() - d
    expect(allowDiff(d2, t, 20)).toEqual(true)
})

test('sleep (es5)', () => {
    const t = 200,
        d = Date.now();

    sleep(t).then(() => {
        const d2 = Date.now() - d
        expect(allowDiff(d2, t, 100)).toEqual(true)        
    }).catch(e => {
        console.error(e)
    }, 1000)


})