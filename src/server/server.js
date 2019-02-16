const express = require('express')
const helmet = require('helmet')
const os = require('os')
const cors = require('express-cors')

const updateCpuLoadHistory = require('./updateCpuLoadHistory')

const PORT = 3333
const app = express()
const cpuData = {
  cpuCount: os.cpus().length,
  cpuLoadHistory: [],
  notifications: [],
  twoMinuteAverage: 0
}
const second = 1000
const intervalDuration = 10 * second

app.set('intervalId', setInterval(() => updateCpuLoadHistory(cpuData), intervalDuration))
app.set('intervalDuration', intervalDuration)

app.use(helmet())
app.use(cors({ allowedOrigins: ['localhost:3000'] }))

app.get('/healthcheck', (req, res, next) => res.json({ status: 'ok!' }))
app.get('/loads', (req, res, next) => {
  res.json({
    cpuCount: cpuData.cpuCount,
    cpuLoadHistory: cpuData.cpuLoadHistory,
    notifications: cpuData.notifications
  })
})

app.all('*', (req, res, next) => {
  console.error(`404 error - route ${req.originalUrl} not found`)
  res.sendStatus(404)
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)

  updateCpuLoadHistory(cpuData)
})
