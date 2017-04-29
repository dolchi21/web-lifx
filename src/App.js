import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { Layout, Menu, Icon } from 'antd'
const { Header, Content, Sider } = Layout

var SubMenu = Menu.SubMenu
var MenuItem = Menu.Item

import './App.css';
import 'antd/dist/antd.min.css'

import store from './store'

import UserToken from './containers/UserToken'
import BulbsList from './containers/BulbsList'
import ScenesList from './containers/ScenesList'
import APICalls from './components/APICalls'

class App extends Component {
	constructor(props) {

		super(props)

		this.state = {
			collapsed: false
		}

	}
	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed
		})
	}
	render() {
		return (
			<Provider store={store}>
				<Layout style={{
					minHeight: '100%'
				}}>
					<Sider collapsed={this.state.collapsed} collapsible trigger={(
						<Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
					)}>
						<Menu theme="dark" mode="inline" onClick={f => f} defaultSelectedKeys={['1']} defaultOpenKeys={['sub_token']}>
							<SubMenu title="Token" key="sub_token">
								<UserToken />
							</SubMenu>
							<APICalls />
							<ScenesList key="sub2" />
						</Menu>
					</Sider>
					<Layout>
						<Layout>
							<Content style={{ padding: '1rem', minHeight: '280px' }}>
								<BulbsList />
							</Content>
						</Layout>
					</Layout>
				</Layout>
			</Provider>
		);
	}
}

export default App;
