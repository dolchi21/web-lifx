import React from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'antd'

import BulbLabel from './BulbLabel'

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
                        <Card key={scene.uuid} title={scene.name} extra={<Button onClick={API.activateScene.bind(this, scene.uuid)}>{scene.name}</Button>}>
                            <div key={scene.uuid} style={{
                                display: 'flex',
                                justifyContent: 'space-around'
                            }}>
                                {scene.states.map(state => {
                                    var { brightness, color } = state
                                    var { hue, saturation } = color
                                    return (
                                        <div key={state.selector}>
                                            <BulbLabel id={state.selector.replace('id:', '')} />
                                            <div style={{
                                                border: '1px solid', width: '5rem', height: '5rem',
                                                backgroundColor: 'hsl(:hue, :sat%, :brightness%)'.replace(':hue', hue).replace(':brightness', brightness * (100 - (50 * saturation))).replace(':sat', saturation * 100)
                                            }}></div>
                                        </div>
                                    )
                                })}
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
