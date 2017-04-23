import React from 'react'
import * as API from '../api/lifx'

import store from '../store'

function loadLights() {
    return API.listLights().then(bulbs => {
        store.dispatch({
            type: 'BULBS',
            payload: bulbs
        })
    })
}

class APICalls extends React.Component {
    componentWillMount(){
        loadLights()
    }
    render() {
        return (
            <div>
                <div>
                    <button onClick={this.handleClick.bind(this)}>ListAll</button>
                </div>
                <div>
                    <button onClick={this.handleClick.bind(this)}>List</button>
                </div>
            </div>
        )
    }
    handleClick(ev) {
        loadLights()
    }
}

export default APICalls
