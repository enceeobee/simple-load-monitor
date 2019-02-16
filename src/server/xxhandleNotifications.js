// DEPRECATED - ERASE THIS FILE




// TODO
// function handleNotifications (currentTwoMinuteAverage, newTwoMinuteAverage, lastLoad, average, alertThreshold) {
//   if (currentTwoMinuteAverage <= alertThreshold && newTwoMinuteAverage > alertThreshold) {
//     const { time } = lastLoad
//     // set alert
//     notifications.unshift({
//       time,
//       type: 'triggered',
//       load: newTwoMinuteAverage
//     })
//   } else if (currentTwoMinuteAverage > alertThreshold && newTwoMinuteAverage <= alertThreshold) {
//     // resolve alert
//     const { time } = lastLoad
//     notifications.unshift({
//       time,
//       type: 'recovered',
//       load: newTwoMinuteAverage
//     })
//   }
// }

// TODO - make this pure
function handleNotifications (cpuData, prevAverage, alertThreshold) {
  const { cpuLoadHistory, notifications, twoMinuteAverage } = cpuData
  const { time } = cpuLoadHistory[cpuLoadHistory.length - 1]
  let type = ''

  if (prevAverage <= alertThreshold && twoMinuteAverage > alertThreshold) {
    type = 'triggered'
  } else if (prevAverage > alertThreshold && twoMinuteAverage <= alertThreshold) {
    type = 'recovered'
  }

  if (type.length > 0) {
    notifications.unshift({
      time,
      type,
      load: twoMinuteAverage
    })
  }
}
// function handleNotifications (cpuData, prevAverage, alertThreshold) {
//   const { cpuLoadHistory, notifications, twoMinuteAverage } = cpuData
//   const { time } = cpuLoadHistory[cpuLoadHistory.length - 1]
//   let type = ''

//   if (prevAverage <= alertThreshold && twoMinuteAverage > alertThreshold) {
//     type = 'triggered'
//     // set alert
//     // notifications.unshift({
//     //   time,
//     //   type: 'triggered',
//     //   load: twoMinuteAverage
//     // })
//   } else if (prevAverage > alertThreshold && twoMinuteAverage <= alertThreshold) {
//     // resolve alert
//     type = 'recovered'
//     // notifications.unshift({
//     //   time,
//     //   type: 'recovered',
//     //   load: twoMinuteAverage
//     // })
//   }

//   if (type.length > 0) {
//     notifications.unshift({
//       time,
//       type,
//       load: twoMinuteAverage
//     })
//   }
// }

module.exports = handleNotifications
