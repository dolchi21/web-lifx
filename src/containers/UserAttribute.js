import React from 'react'
import { connect } from 'react-redux'

export default connect((state, { name }) => {
    return {
        value: state.user[name]
    }
})(props => (
    <span>{props.value}</span>
))
