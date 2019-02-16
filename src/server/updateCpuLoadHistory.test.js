const rewire = require('rewire')

const updateCpuLoadHistory = require('./updateCpuLoadHistory')

const wiredUpdateCpuLoadHistory = rewire('./updateCpuLoadHistory.js')
const calculateTwoMinuteAverage = wiredUpdateCpuLoadHistory.__get__('calculateTwoMinuteAverage')

// Functions to be mocked
const addNewLoad = require('./addNewLoad')
const calculateAverage = require('./calculateAverage')
const updateNotifications = require('./updateNotifications')

jest.mock('./addNewLoad')
jest.mock('./calculateAverage')
jest.mock('./updateNotifications')

describe('updateCpuLoadHistory', () => {
  it('updates cpuData.cpuLoadHistory', () => {
    const cpuData = {
      cpuLoadHistory: [],
      notifications: [],
      twoMinuteAverage: 0
    }

    addNewLoad.mockImplementation(() => [{ time: 'test time', value: 'test value' }])

    updateCpuLoadHistory(cpuData)

    expect(addNewLoad).toBeCalled()
    expect(cpuData.cpuLoadHistory).toHaveLength(1)
    expect(cpuData.cpuLoadHistory[0]).toHaveProperty('time', 'test time')
    expect(cpuData.cpuLoadHistory[0]).toHaveProperty('value', 'test value')
  })

  it('updates cpuData.twoMinuteAverage', () => {
    const cpuData = {
      cpuLoadHistory: [],
      notifications: [],
      twoMinuteAverage: 0
    }
    const firstLoad = [{ time: Date.now(), value: 2 }]

    addNewLoad.mockImplementation(() => firstLoad)
    calculateAverage.mockImplementation(() => 1)

    updateCpuLoadHistory(cpuData)

    expect(calculateAverage).toBeCalled()
    expect(calculateAverage).lastCalledWith(firstLoad)
    expect(cpuData).toHaveProperty('twoMinuteAverage', 1)
  })

  it('updates cpuData.notifications', () => {
    const cpuData = {
      cpuLoadHistory: [],
      notifications: [],
      twoMinuteAverage: 0
    }
    const firstLoad = [{ time: Date.now(), value: 2 }]

    addNewLoad.mockImplementation(() => firstLoad)
    calculateAverage.mockImplementation(() => 1.66)
    updateNotifications.mockImplementation(() => [{ type: 'test triggered', time: 'test time' }])

    updateCpuLoadHistory(cpuData)

    expect(updateNotifications).toBeCalled()
    expect(cpuData.notifications).toHaveLength(1)
    expect(cpuData.notifications[0]).toHaveProperty('type', 'test triggered')
    expect(cpuData.notifications[0]).toHaveProperty('time', 'test time')
  })
})

describe('calculateTwoMinuteAverage returns average', () => {
  it('when cpuLoadHistory is not passed', () => {
    const expected = 0
    const actual = calculateTwoMinuteAverage()

    expect(actual).toBe(expected)
  })

  it('when cpuLoadHistory.length is less than 12', () => {
    const cpuLoadHistory = [
      { value: 4 },
      { value: 6 }
    ]
    const expected = 5
    const actual = calculateTwoMinuteAverage(cpuLoadHistory)

    expect(actual).toBe(expected)
  })

  it('when cpuLoadHistory.length is 12', () => {
    const cpuLoadHistory = [
      { value: 4 }, { value: 4 }, { value: 4 }, { value: 4 }, { value: 4 }, { value: 4 },
      { value: 6 }, { value: 6 }, { value: 6 }, { value: 6 }, { value: 6 }, { value: 6 }
    ]
    const expected = 5
    const actual = calculateTwoMinuteAverage(cpuLoadHistory)

    expect(actual).toBe(expected)
  })

  it('for only the most recent 12 items', () => {
    const cpuLoadHistory = [
      { value: 66666, time: 'longer than 2 minutes ago' },
      { value: 4 }, { value: 4 }, { value: 4 }, { value: 4 }, { value: 4 }, { value: 4 },
      { value: 6 }, { value: 6 }, { value: 6 }, { value: 6 }, { value: 6 }, { value: 6 }
    ]
    const expected = 5
    const actual = calculateTwoMinuteAverage(cpuLoadHistory)

    expect(actual).toBe(expected)
  })
})
