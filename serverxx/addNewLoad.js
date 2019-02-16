const os = require('os')

function addNewLoad (cpuLoadHistory, cpuCount) {
  const newLoad = {
    time: new Date().toISOString(),
    value: os.loadavg()[0] / cpuCount
  }

  if (cpuLoadHistory.length >= 60) cpuLoadHistory.shift()

  cpuLoadHistory.push(newLoad)

  console.log('cpuLoadHistory len', cpuLoadHistory.length)
}

module.exports = addNewLoad
