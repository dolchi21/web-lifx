import React from 'react'
import { connect } from 'react-redux'

export default connect((state, { id }) => {
    var bulb = state.bulbs.find(bulb => bulb.id === id) || {}
    return {
        label: bulb.label
    }
})(props => <span>{props.label}</span>)
