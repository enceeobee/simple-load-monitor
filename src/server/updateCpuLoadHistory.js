const addNewLoad = require('./addNewLoad')
const calculateAverage = require('./calculateAverage')
const updateNotifications = require('./updateNotifications')

function updateCpuLoadHistory (cpuData) {
  const alertThreshold = 1
  const { twoMinuteAverage } = cpuData
  const prevTwoMinuteAverage = twoMinuteAverage

  cpuData.cpuLoadHistory = addNewLoad(cpuData.cpuLoadHistory, cpuData.cpuCount)
  cpuData.twoMinuteAverage = calculateTwoMinuteAverage(cpuData.cpuLoadHistory)

  const lastLoad = cpuData.cpuLoadHistory[cpuData.cpuLoadHistory.length - 1]

  cpuData.notifications = updateNotifications(cpuData.notifications, alertThreshold, prevTwoMinuteAverage, cpuData.twoMinuteAverage, lastLoad)
}

function calculateTwoMinuteAverage (cpuLoadHistory = []) {
  // We slice by 12 to only average the last two minutes
  const twoMinLoadQuantity = 12

  return calculateAverage(cpuLoadHistory.slice(-twoMinLoadQuantity))
}

module.exports = updateCpuLoadHistory
