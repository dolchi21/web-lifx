import React from 'react'
import { connect } from 'react-redux'
import { Button, Menu } from 'antd'

var { Item, ItemGroup, SubMenu } = Menu

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
        //if (!scenes.length) return null
        return (
            <Menu mode="inline" theme="dark">
                <SubMenu title="Scenes" key="sub2" openKeys={[]}>
                    <ItemGroup key="g1">
                        {scenes.map(scene => {
                            return (
                                <Item key={scene.uuid}>
                                    <span onClick={API.activateScene.bind(this, scene.uuid)}>{scene.name}</span>
                                </Item>
                            )
                        })}
                    </ItemGroup>
                </SubMenu>
            </Menu>
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
