const updateNotifications = require('./updateNotifications')

describe('updateNotifications', () => {
  describe('prepends an alert notification', () => {
    it('as initial notification', () => {
      const notifications = []
      const currentAverage = 1.01
      const previousAverage = 0.9
      const alertThreshold = 1
      const time = new Date().toISOString()
      const lastLoad = { time }
      const actual = updateNotifications(notifications, alertThreshold, previousAverage, currentAverage, lastLoad)

      expect(actual).toHaveLength(1)
      expect(actual[0].type).toBe('triggered')
      expect(actual[0].load).toBe(currentAverage)
      expect(actual[0].time).toBe(time)

      // Ensure immutability
      expect(actual).not.toBe(notifications)
      expect(notifications).toHaveLength(0)
    })

    it('when other notifications exist', () => {
      const notifications = [{ type: 'test' }]
      const currentAverage = 1.01
      const previousAverage = 0.9
      const alertThreshold = 1
      const time = new Date().toISOString()
      const lastLoad = { time }
      const actual = updateNotifications(notifications, alertThreshold, previousAverage, currentAverage, lastLoad)

      expect(actual).toHaveLength(2)
      expect(actual[0].type).toBe('triggered')
      expect(actual[0].load).toBe(currentAverage)
      expect(actual[0].time).toBe(time)

      expect(actual[1].type).toBe('test')
      expect(actual[1].load).not.toBeDefined()
      expect(actual[1].time).not.toBeDefined()

      expect(notifications).toHaveLength(1)
      expect(notifications[0].type).toBe('test')
      expect(notifications[0].load).not.toBeDefined()
    })
  })

  describe('prepends a recovery notification', () => {
    it('when other notifications exist', () => {
      const notifications = []
      const currentAverage = 0.5
      const previousAverage = 1.9
      const alertThreshold = 1
      const time = new Date().toISOString()
      const lastLoad = { time }
      const actual = updateNotifications(notifications, alertThreshold, previousAverage, currentAverage, lastLoad)

      expect(actual).toHaveLength(1)
      expect(actual[0].type).toBe('recovered')
      expect(actual[0].load).toBe(currentAverage)
      expect(actual[0].time).toBe(time)

      expect(notifications).toHaveLength(0)
    })

    it('when other notifications exist', () => {
      const notifications = [{ type: 'recover test' }]
      const currentAverage = 0.4
      const previousAverage = 0.9
      const alertThreshold = 0.5
      const time = new Date().toISOString()
      const lastLoad = { time }
      const actual = updateNotifications(notifications, alertThreshold, previousAverage, currentAverage, lastLoad)

      expect(actual).toHaveLength(2)
      expect(actual[0].type).toBe('recovered')
      expect(actual[0].load).toBe(currentAverage)
      expect(actual[0].time).toBe(time)

      expect(actual[1].type).toBe('recover test')
      expect(actual[1].load).not.toBeDefined()
      expect(actual[1].time).not.toBeDefined()

      expect(notifications).toHaveLength(1)
      expect(notifications[0].type).toBe('recover test')
      expect(notifications[0].load).not.toBeDefined()
    })

    it('when current average is exactly the error threshold', () => {
      const notifications = []
      const currentAverage = 1
      const previousAverage = 1.5
      const alertThreshold = 1
      const time = new Date().toISOString()
      const lastLoad = { time }
      const actual = updateNotifications(notifications, alertThreshold, previousAverage, currentAverage, lastLoad)

      expect(actual).toHaveLength(1)
      expect(actual[0].type).toBe('recovered')
      expect(actual[0].load).toBe(currentAverage)
      expect(actual[0].time).toBe(time)
    })
  })

  describe('does not add a notification', () => {
    it('when load average remains below threshold', () => {
      const notifications = []
      const currentAverage = 1.4
      const previousAverage = 1.5
      const alertThreshold = 10
      const time = new Date().toISOString()
      const lastLoad = { time }
      const actual = updateNotifications(notifications, alertThreshold, previousAverage, currentAverage, lastLoad)

      expect(actual).toHaveLength(0)
      expect(actual).not.toBe(notifications)
    })

    it('when load average remains above threshold', () => {
      const notifications = []
      const currentAverage = 1.4
      const previousAverage = 1.5
      const alertThreshold = 1
      const time = new Date().toISOString()
      const lastLoad = { time }
      const actual = updateNotifications(notifications, alertThreshold, previousAverage, currentAverage, lastLoad)

      expect(actual).toHaveLength(0)
      expect(actual).not.toBe(notifications)
    })

    it('when load average is climbs to exactly threshold', () => {
      const notifications = []
      const currentAverage = 10
      const previousAverage = 1.5
      const alertThreshold = 10
      const time = new Date().toISOString()
      const lastLoad = { time }
      const actual = updateNotifications(notifications, alertThreshold, previousAverage, currentAverage, lastLoad)

      expect(actual).toHaveLength(0)
      expect(actual).not.toBe(notifications)
    })
  })
})
