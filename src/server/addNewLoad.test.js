const addNewLoad = require('./addNewLoad')

describe('addNewLoad', () => {
  it('handles missing load', () => {
    const actual = addNewLoad()

    expect(actual).toHaveLength(1)
  })

  it('handles empty load', () => {
    const loadHistory = []
    const actual = addNewLoad(loadHistory, 1)

    expect(actual).toHaveLength(1)
    expect(loadHistory).toHaveLength(0)
  })

  it('adds a load when history is not yet full', () => {
    const loadHistory = new Array(10).fill('test')
    const actual = addNewLoad(loadHistory, 1)

    expect(actual).toHaveLength(11)
    expect(loadHistory).toHaveLength(10)
    expect(typeof actual[10].value).toBe('number')
    expect(actual[10].value).not.toBe('test')
    expect(actual[0]).toBe('test')
  })

  it('discards the oldest load and adds a new load when history is full', () => {
    const maxSize = 60
    const testMessage = 'should be index 0 after update'
    const loadHistory = new Array(maxSize).fill('test')

    loadHistory[1] = testMessage

    const actual = addNewLoad(loadHistory, 1)

    expect(actual).toHaveLength(maxSize)
    expect(loadHistory).toHaveLength(maxSize)
    expect(typeof actual[maxSize - 1].value).toBe('number')
    expect(actual[maxSize - 1].value).not.toBe('test')
    expect(actual[0]).toBe(testMessage)
  })

  it('handles missing cpuCount', () => {
    const loadHistory = new Array(10).fill('test')
    const actual = addNewLoad(loadHistory)

    expect(actual).toHaveLength(11)
    expect(typeof actual[10].value).toBe('number')
  })

  it('handles invalid cpuCount', () => {
    const loadHistory = new Array(10).fill('test')
    expect(() => addNewLoad(loadHistory, 'invalid')).toThrow(/^cpuCount must be a number$/)
    expect(() => addNewLoad(loadHistory, 0)).toThrow(/^At least 1 CPU is required to calculate load$/)
    expect(() => addNewLoad(loadHistory, -1000)).toThrow(/^At least 1 CPU is required to calculate load$/)
  })
})
