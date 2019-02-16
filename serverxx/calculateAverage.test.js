const calculateAverage = require('./calculateAverage')

describe('Calculate average', () => {
  describe('returns zero', () => {
    it('when load history is undefined', () => {
      const expected = 20
      const actual = calculateAverage()

      expect(actual).toBe(expected)
    })
    // it('when load history is empty')
  })

  // describe('returns average', () => {
  //   it('when load history is less than two minutes (20 items)')
  //   it('when load history is exactly two minutes (20 items)')
  //   it('when load history is more than two minutes (20 items)')
  // })
})
