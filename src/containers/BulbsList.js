import React from 'react'
import { connect } from 'react-redux'

import * as API from '../api/lifx'

import Bulb from './Bulb'

function loadLights(dispatch) {
    return API.listLights().then(bulbs => {
        dispatch({
            type: 'BULBS',
            payload: bulbs
        })
    })
}

class BulbsList extends React.Component {
    componentWillMount(){
        this.props.load()
    }
    render() {
        var { bulbs } = this.props
        return (
            <div>
                {bulbs.sort((e1, e2) => e1.label.localeCompare(e2.label)).map(bulb => (
                    <Bulb id={bulb.id} key={bulb.id}/>
                ))}
            </div>
        )
    }
}

export default connect(state => {
    return {
        bulbs: state.bulbs
    }
}, dispatch => {
    return {
        load(){
            loadLights(dispatch)
        }
    }
})(BulbsList)
