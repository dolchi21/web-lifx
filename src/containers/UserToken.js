import React from 'react'
import { connect } from 'react-redux'
import { Input } from 'antd'

import axios from 'axios'

class UserToken extends React.Component {
    render() {
        axios.defaults.headers['Authorization'] = 'Bearer ' + this.props.token
        return <Input onChange={this.handleChange.bind(this)} defaultValue={this.props.token} style={{
            //width: '100%'
        }}/>
    }
    handleChange(ev) {
        this.props.onChange(ev.target.value)
    }
}

export default connect((state, ownProps) => {
    return {
        token : state.token
    }
}, (dispatch, ownProps) => {
    return {
        onChange(token) {
            axios.defaults.headers['Authorization'] = 'Bearer ' + token
            return dispatch({
                type: 'USER/TOKEN',
                payload: token
            })
        }
    }
})(UserToken)
