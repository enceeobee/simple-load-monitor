import React, { Component } from 'react'
import Monitor from './Monitor'
import Notifications from './Notifications'
import createTimeSeries from '../util/createTimeSeries'

import '../css/App.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      notifications: [],
      cpuCount: 0,
      cpuLoadHistory: [],
      timeSeries: null,
      isLoading: false,
      error: null
    }

    this.intervalId = null
    this.timeSeriesName = 'Average CPU Load'
    this.fetchCpuLoad = this.fetchCpuLoad.bind(this)
  }

  componentWillMount () {
    this.fetchCpuLoad()
  }

  componentWillUnmount () {
    clearInterval(this.intervalId)
  }

  componentDidMount () {
    const tenSeconds = 10000
    this.intervalId = setInterval(this.fetchCpuLoad, tenSeconds)
  }

  fetchCpuLoad () {
    this.setState({ ...this.state, isLoading: true })

    return fetch('http://localhost:3333/loads')
      .then(response => response.json())
      .then(body => this.setState({
        ...this.state,
        isLoading: false,
        cpuCount: body.cpuCount,
        cpuLoadHistory: body.cpuLoadHistory,
        notifications: body.notifications,
        timeSeries: createTimeSeries(body.cpuLoadHistory, this.timeSeriesName),
        error: null
      }))
      .catch((e) => {
        this.setState({ ...this.state, isLoading: false, error: e.toString() })
        console.error(e)
      })
  }

  render () {
    return (
      <div className={`app-container${this.state.isLoading ? ' loading' : ''}`}>
        <div className='header'>
          <h1>CPU Load</h1>

          {this.state.cpuCount > 0 &&
            <div>Averaged for {this.state.cpuCount} processor{this.state.cpuCount !== 1 ? 's' : ''}</div>
          }

          {
            this.state.error != null &&
            <div className='error'>Error retrieving CPU load data, results below may not be accurate</div>
          }
        </div>

        <div className='monitor-container'>
          <h2>Load history</h2>

          {this.state.cpuLoadHistory.length > 0 &&
            <Monitor
              cpuCount={this.state.cpuCount}
              series={this.state.timeSeries}
            />
          }
        </div>

        <div className='notifications-container'>
          <h2>Notifications</h2>
          {this.state.notifications.length > 0 &&
            <Notifications
              notifications={this.state.notifications}
            />
          }
        </div>
      </div>
    )
  }
}

export default App
