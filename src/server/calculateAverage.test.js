const calculateAverage = require('./calculateAverage')

describe('Calculate average', () => {
  describe('returns zero', () => {
    it('when load history is undefined', () => {
      const expected = 0
      const actual = calculateAverage()

      expect(actual).toBe(expected)
    })

    it('when load history is empty', () => {
      const expected = 0
      const actual = calculateAverage([])

      expect(actual).toBe(expected)
    })
  })

  it('returns average value', () => {
    const expected = 5
    let cpuLoadHistory
    let actual

    cpuLoadHistory = [
      { value: 6 },
      { value: 4 }
    ]
    actual = calculateAverage(cpuLoadHistory)
    expect(actual).toBe(expected)

    cpuLoadHistory = [
      { value: 6 }, { value: 6 },
      { value: 4 }, { value: 4 }
    ]
    actual = calculateAverage(cpuLoadHistory)
    expect(actual).toBe(expected)

    cpuLoadHistory = [
      { value: 0 }, { value: 5 }, { value: 5 }, { value: 5 }, { value: 5 }, { value: 5 },
      { value: 10 }, { value: 5 }, { value: 5 }, { value: 5 }, { value: 5 }, { value: 5 }
    ]
    actual = calculateAverage(cpuLoadHistory)
    expect(actual).toBe(expected)
  })
})
