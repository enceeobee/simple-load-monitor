import createTimeSeries from './createTimeSeries'

describe('createTimeSeries', () => {
  it('handles missing name', () => {
    const loadHistory = [
      { time: Date.now(), value: 1 },
      { time: Date.now(), value: 2 }
    ]
    const timeSeries = createTimeSeries(loadHistory)
    const expected = ''
    const actual = timeSeries.toJSON().name

    expect(actual).toBe(expected)
  })

  it('handles missing load history', () => {
    const timeSeries = createTimeSeries()

    expect(timeSeries).toBeDefined()
  })

  it('handles malformed load history', () => {
    const loadHistory = [
      { time: 'invalid value', value: 1 },
      { time: Date.now(), value: 'not a number' },
      { time: Date.now() },
      {},
      { ignoredProperty: 'is ignored' }
    ]
    const timeSeries = createTimeSeries(loadHistory)
    const expected = loadHistory.length
    const actual = timeSeries.size()

    expect(actual).toBe(expected)
  })

  it('creates a time series', () => {
    const loadHistory = [
      { time: Date.now(), value: 1 },
      { time: Date.now(), value: 2 },
      { time: Date.now(), value: 3 },
      { time: Date.now(), value: 4 }
    ]
    const name = 'Test time series'
    const timeSeries = createTimeSeries(loadHistory, name)
    const actual = timeSeries.toJSON()

    expect(actual.name).toBe(name)
    expect(actual.points.length).toBe(loadHistory.length)
  })
})
