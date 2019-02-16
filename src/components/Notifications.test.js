// import rewire from 'rewire'
import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Notifications from './Notifications'

configure({ adapter: new Adapter() })

describe('Notifications component', () => {
  it('Returns empty list', () => {
    const props = { notifications: [] }
    const wrapper = shallow(<Notifications {...props} />)
    const ul = wrapper.find('ul')
    const li = wrapper.find('li')

    expect(ul).toHaveLength(1)
    expect(li).toHaveLength(0)
  })

  it('Displays list of notifications', () => {
    const props = {
      notifications: [
        {
          type: 'recovered',
          load: 0.9234785874,
          time: new Date('2019-02-16T11:42:29Z')
        },
        {
          type: 'triggered',
          load: 1.9,
          time: new Date('2019-02-16T11:51:02Z')
        },
        {
          type: 'invalid'
        },
        {
          type: 'invalidAgain',
          time: new Date('2019-02-16T11:54:06Z')
        }
      ]
    }
    const wrapper = shallow(<Notifications {...props} />)
    const ul = wrapper.find('ul')
    const li = wrapper.find('li')

    expect(ul).toHaveLength(1)
    expect(li).toHaveLength(props.notifications.length)

    expect(li.at(0).text()).toMatch('Alert recovered')
    expect(li.at(0).text()).toMatch('0.92348')
    expect(li.at(0).html()).toMatch('class="recovered"')

    expect(li.at(1).text()).toMatch('High load generated an alert')
    expect(li.at(1).text()).toMatch('1.90000')
    expect(li.at(1).html()).toMatch('class="triggered"')

    expect(li.at(2).text()).toMatch('Unknown notification received')
    expect(li.at(2).text()).toMatch('Invalid Date')
    expect(li.at(2).html()).toMatch('class="invalid"')

    expect(li.at(3).text()).toMatch('Unknown notification received')
    expect(li.at(3).html()).toMatch('class="invalidAgain"')
  })
})
