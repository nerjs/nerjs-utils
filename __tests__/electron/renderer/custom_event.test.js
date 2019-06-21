const CustomEvent = require('../../../electron/custom_event')

test('custom event', () => {
    let event;
    expect(CustomEvent).toBe(window.CustomEvent)

    event = new CustomEvent('test')

    expect(event).toBeInstanceOf(window.CustomEvent)
    expect(event.type).toEqual('test')
    expect(event.defaultPrevented).toEqual(false)
    event.preventDefault()
    expect(event.defaultPrevented).toEqual(false)
    event.defaultPrevented = true
    expect(event.defaultPrevented).toEqual(false)


    event = new CustomEvent('test', {
        cancelable: true
    })
    expect(event.defaultPrevented).toEqual(false)
    event.preventDefault()
    expect(event.defaultPrevented).toEqual(true)
    event.defaultPrevented = false
    expect(event.defaultPrevented).toEqual(true)
})
