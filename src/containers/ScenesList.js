import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'

import store from '../store'
import * as API from '../api/lifx'

function loadScenes() {
    return API.listScenes().then(scenes => {
        store.dispatch({
            type: 'SCENES',
            payload: scenes
        })
    })
}

class ScenesList extends React.Component {
    componentWillMount() {
        loadScenes()
    }
    render() {
        var { scenes } = this.props
        return (
            <div>
                {scenes.map(scene => {
                    return (
                        <div>
                            <Button onClick={API.activateScene.bind(this, scene.uuid)}>{scene.name}</Button>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default connect(state => {
    return {
        scenes: state.scenes
    }
}, dispatch => {
    return {}
})(ScenesList)
