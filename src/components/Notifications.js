import React from 'react'
import PropTypes from 'prop-types'

import '../css/Notifications.css'

const Notifications = props => (
  <ul className='notifications'>
    {
      props.notifications.map(({ load, time, type }, i) => (
        <li key={`notification-${i}`} className={type}>{composeMessage(type, load, time)}</li>
      ))
    }
  </ul>
)

function composeMessage (notificationType, load, time) {
  switch (notificationType) {
    case 'triggered': {
      return `High load generated an alert - load = ${formatLoad(load)}, triggered at ${formatDate(time)}`
    }
    case 'recovered': {
      return `Alert recovered - load = ${formatLoad(load)} at ${formatDate(time)}`
    }
    default: {
      return `Unknown notification received at ${formatDate(time)}`
    }
  }
}

function formatDate (date) {
  return new Date(date).toLocaleString(navigator.language || 'en-US')
}

function formatLoad (load) {
  return Number(load).toFixed(5)
}

Notifications.propTypes = {
  notifications: PropTypes.array
}

export default Notifications
