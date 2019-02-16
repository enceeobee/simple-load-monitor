function updateNotifications (notifications, alertThreshold, previousAverage, currentAverage, lastLoad) {
  const { time } = lastLoad
  let type = ''

  if (previousAverage <= alertThreshold && currentAverage > alertThreshold) {
    type = 'triggered'
  } else if (previousAverage > alertThreshold && currentAverage <= alertThreshold) {
    type = 'recovered'
  }

  if (type.length > 0) {
    const alert = { time, type, load: currentAverage }
    return [alert].concat(notifications)
  }

  return [...notifications]
}

module.exports = updateNotifications
