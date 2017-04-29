import React from 'react'
import { Menu } from 'antd'

var { Item, ItemGroup, SubMenu } = Menu

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
    componentWillMount() {
        loadLights()
    }
    render() {
        return (
            <Menu mode="inline" theme="dark">
                <SubMenu title="Actions">
                    <Item>
                        <span onClick={this.handleClick.bind(this)}>List Lights</span>
                    </Item>
                    <Item>
                        <span onClick={this.handleScenesClick.bind(this)}>List Scenes</span>
                    </Item>
                </SubMenu>
            </Menu>
        )
    }
    handleClick(ev) {
        loadLights()
    }
    handleScenesClick() {
        loadScenes()
    }
}

export default APICalls
