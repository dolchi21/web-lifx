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
function loadScenes() {
    return API.listScenes().then(scenes => {
        store.dispatch({
            type: 'SCENES',
            payload: scenes
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
                    <button onClick={this.handleClick.bind(this)}>ListLights</button>
                </div>
                <div>
                    <button onClick={this.handleScenesClick.bind(this)}>ListScenes</button>
                </div>
            </div>
        )
    }
    handleClick(ev) {
        loadLights()
    }
    handleScenesClick(){
        loadScenes()
    }
}

export default APICalls
