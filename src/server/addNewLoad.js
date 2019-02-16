const os = require('os')

function addNewLoad (cpuLoadHistory = [], cpuCount = 1) {
  if (typeof cpuCount !== 'number') throw new Error('cpuCount must be a number')
  if (cpuCount < 1) throw new Error('At least 1 CPU is required to calculate load')

  const newLoad = {
    time: new Date().toISOString(),
    value: os.loadavg()[0] / cpuCount
  }

  return cpuLoadHistory.slice(-59).concat([newLoad])
}

module.exports = addNewLoad
