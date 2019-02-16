// const os = require('os')
const addNewLoad = require('./addNewLoad')
const calculateAverage = require('./calculateAverage')
// const second = 1000
// let intervalId

function updateCpuLoadHistory (app) {
  // Check length of history; if > 60 shift() (remove from beginning)
  // Push new event
  // Determine newTwoMinAvg:
    // If cpuData.twoMinAvg <= 1 && newTwoMinAvg > 1, set trigger/alert notification
    // Else if cpuData.twoMinAvg > 1 && newTwoMinAvg <= 1, set resolved notification

  // const cpuCount = app.get('cpuCount')
  const { cpuLoadHistory, twoMinuteAverage } = app.get('cpuData')

  addNewLoad(cpuLoadHistory, app.get('cpuCount'))

  const newTwoMinAvg = calculateAverage(twoMinuteAverage, cpuLoadHistory)

  console.log('newTwoMinAvg', newTwoMinAvg)

  app.set('twoMinuteAverage', newTwoMinAvg)
}

module.exports = updateCpuLoadHistory
