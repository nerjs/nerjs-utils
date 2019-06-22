const sleep = require('../../core/sleep')

test('sleep (es6)', async () => {
    const t = 200,
        d = Date.now();

    await sleep(t)

    const d2 = Date.now() - d
    expect(d2 >= t).toBeTruthy()
})
