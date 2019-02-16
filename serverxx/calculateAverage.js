function calculateAverage (currentAverage, cpuLoadHistory) {
  if (!cpuLoadHistory || cpuLoadHistory.length === 0) return 0

  // Let's do this the dumb way, then refactor
  // We slice by 20 to only average the last two minutes
  // Each load represents 10 seconds, so there are 6 of them per minute
  // So 2 min = 12 loads
  const loadCount = 12
  const loadSum = cpuLoadHistory
    .slice(-loadCount)
    .reduce((acc, { value }) => acc + value, 0)

  return loadSum / Math.min(cpuLoadHistory.length, loadCount)

  // if (cpuLoadHistory.length === 1) return cpuLoadHistory[0].value

  // const loadCount = 12
  // const averageSum = currentAverage + cpuLoadHistory[cpuLoadHistory.length - 1].value

  // // console.log('average sum', averageSum)

  // // const newAverage = averageSum / Math.min(cpuLoadHistory.length, loadCount)
  // const newAverage = averageSum / 2

  // return newAverage
}

module.exports = calculateAverage
