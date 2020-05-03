import React from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'antd'

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

const SceneState = props => {
    console.log('SceneState', props)
    const { brightness, color } = props
    const { hue, saturation } = color
    const backgroundColor = 'hsl(:hue, :sat%, :brightness%)'
        .replace(':hue', hue)
        .replace(':brightness', brightness * (100 - (50 * saturation)))
        .replace(':sat', saturation * 100)
    return (
        <div className="SceneBulb" style={{ backgroundColor }}></div>
    )
}

class ScenesList extends React.Component {
    componentWillMount() {
        loadScenes()
    }
    render() {
        var { scenes } = this.props
        return (
            <div className="scenes-grid">
                {scenes.map(scene => {
                    const activate = () => API.activateScene(scene.uuid)
                    return (
                        <Card onClick={activate} key={scene.uuid} title={scene.name} style={{ cursor: 'pointer' }}>
                            <div key={scene.uuid} style={{ display: 'flex' }}>
                                {scene.states.map(state => <SceneState key={state.selector} {...state} />)}
                            </div>
                        </Card>
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
