import React from 'react'
import { connect } from 'react-redux'
import { Switch } from 'antd'

import * as API from '../api/lifx'

class PowerToggle extends React.Component {
    render() {
        var { power, connected } = this.props
        return <Switch checked={power} disabled={!connected} onChange={this.handleChange.bind(this)} />
    }
    handleChange(ev) {
        var { id } = this.props
        API.toggle(id).then(() => {
            this.props.onToggle()
        })
    }
}

export default connect((state, { id }) => {
    var bulb = state.bulbs.find(bulb => bulb.id === id)
    return {
        id,
        connected: bulb.connected,
        power: bulb.power
    }
}, (dispatch, { id }) => {
    return {
        onToggle() {
            return dispatch({
                type: 'BULB/TOGGLE',
                payload: id
            })
        }
    }
})(PowerToggle)
