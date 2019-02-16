import React from 'react'
import PropTypes from 'prop-types'
import { TimeRange } from 'pondjs'
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  Resizable
} from 'react-timeseries-charts'

function Monitor ({ series }) {
  const maxYAxisValue = Math.min(8, 1 + series.max())
  const now = new Date()
  const tenMinAgo = new Date(now - (1000 * 60 * 10))

  return (
    <div className='monitor'>
      <Resizable>
        <ChartContainer
          timeRange={new TimeRange([tenMinAgo, now])}
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

Monitor.propTypes = {
  series: PropTypes.object.isRequired
}

export default Monitor
