function calculateAverage (cpuLoadHistory) {
  if (!cpuLoadHistory || cpuLoadHistory.length === 0) return 0

  const loadSum = cpuLoadHistory
    .reduce((acc, { value }) => acc + value, 0)

  return loadSum / cpuLoadHistory.length
}

module.exports = calculateAverage
