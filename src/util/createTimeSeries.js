import { TimeSeries, TimeEvent } from 'pondjs'

function createTimeSeries (cpuLoadHistory, name) {
  if (!cpuLoadHistory || cpuLoadHistory.length === 0) {
    return new TimeSeries({ events: [] })
  }

  const events = cpuLoadHistory.map(({ time, value }) => new TimeEvent(new Date(time), { value }))

  return new TimeSeries({ name, events })
}

export default createTimeSeries
