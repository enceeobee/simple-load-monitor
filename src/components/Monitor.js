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

class Monitor extends Component {
  render () {
    const { series } = this.props
    const maxYAxisValue = Math.min(8, 1 + series.max())

    return (
      <div className='monitor'>
        <Resizable>
          <ChartContainer
            timeRange={series.range()}
            maxTime={series.range().end()}
            minTime={series.range().begin()}
          >
            <ChartRow
              height='300'
              trackerShowTime
              trackerInfoValues={'values'}
            >
              <YAxis
                hideAxisLine
                id='cpuAxis'
                label='CPU Load Average'
                min={0}
                max={maxYAxisValue}
                width='60'
                type='linear'
                format={n => Number(n).toFixed(2)} />
              <Charts>
                <LineChart axis='cpuAxis' series={series} column={['cpu']} />
              </Charts>
            </ChartRow>
          </ChartContainer>
        </Resizable>
      </div>
    )
  }
}

Monitor.propTypes = {
  series: PropTypes.object
}

export default Monitor
