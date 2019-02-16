const express = require('express')
const helmet = require('helmet')
const os = require('os')
const cors = require('express-cors')

const updateCpuLoadHistory = require('./updateCpuLoadHistory')

const PORT = 3333
const app = express()

/*
  LISTEN UP CHEESE DICK

  We're going to store the cpu data in here, and simply pass it via the endpoint

  CpuLoad = {
    cpuCount: int,
    cpuAverageLoad: float,
    time: dateTime
  }
  Notification = {
    type: 'triggered|recovered',
    time: dateTime
  }

  cpuLoadHistory = [<CpuLoad>]
  notifications = [<Notification>]

  {
    cpuLoadHistory: [],
    notifications: [],
    twoMinLoadAverage: float // doesn't need to be in response body
  }

*/
// Initialize data
app.set('cpuCount', os.cpus().length)
app.set('cpuData', {
  cpuLoadHistory: [],
  notifications: [],
  twoMinuteAverage: 0
})

// TODO - Initialize the auto-updating of load data
const second = 1000
app.set('intervalId', setInterval(() => updateCpuLoadHistory(app), 10 * second))

// console.log('interval id', app.get('intervalId'))

app.use(helmet())
app.use(cors({ allowedOrigins: ['localhost:3000'] }))

// Routes
app.get('/healthcheck', (req, res, next) => res.json({ status: 'ok!' }))
app.get('/load-averages', (req, res, next) => {
  res.json({
    cpuCount: app.get('cpuCount'),
    cpuLoadHistory: app.get('cpuData').cpuLoadHistory,
    notifications: app.get('cpuData').notifications
    // cpuAverageLoad: os.loadavg()[0] / cpuCount,
    // time: new Date().toISOString()
  })
})

app.all('*', (req, res, next) => {
  console.error(`404 error - route ${req.originalUrl} not found`)
  res.sendStatus(404)
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)

  updateCpuLoadHistory(app)
})
