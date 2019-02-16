import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  Resizable
} from 'react-timeseries-charts'

// import '../css/Monitor.css'

class Monitor extends Component {
  render () {
    const { series } = this.props

    return (
      <div className='monitor'>
        <Resizable>
          <ChartContainer
            timeRange={series.range()}
            maxTime={series.range().end()}
            minTime={series.range().begin()}
          >
            {/* TODO - figure out max; should I pass it via API? */}
            <ChartRow height='300'>
              <YAxis
                hideAxisLine
                id='axis1'
                label='CPU Load Average'
                min={0}
                max={2}
                width='60'
                type='linear'
                format={n => Number(n).toFixed(2)} />
              <Charts>
                <LineChart axis='axis1' series={series} column={['cpu']} />
              </Charts>
            </ChartRow>
          </ChartContainer>
        </Resizable>
      </div>
    )
  }
}

// TODO - finish propTypes; maybe include max value?
Monitor.propTypes = {
  series: PropTypes.object
}

export default Monitor
