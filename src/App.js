import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { HashRouter, Link, Route } from 'react-router-dom'
import { Layout, Menu, Icon, Tooltip } from 'antd'
const { Content, Sider } = Layout

var SubMenu = Menu.SubMenu
var MenuItem = Menu.Item

import './App.css';
import 'antd/dist/antd.min.css'

import store from './store'

import UserToken from './containers/UserToken'
import BulbsList from './containers/BulbsList'
import Bulb from './containers/Bulb'
import ScenesList from './containers/ScenesList'
import APICalls from './components/APICalls'

var Router = HashRouter

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
			<Router>
				<Provider store={store}>
					<Layout style={{
						minHeight: '100%'
					}}>
						<Sider collapsed={this.state.collapsed} collapsible trigger={(
							<Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
						)}>
							<Menu theme="dark" mode="inline" onClick={f => f} defaultSelectedKeys={['1']} defaultOpenKeys={['sub_token', 'pages']}>
								<div>asd</div>
								<MenuItem>
									<Link to={'/account'}>
										<Icon type="user" />
										<span className="nav-text">Account</span>
									</Link>
								</MenuItem>
								<SubMenu key="pages" title={<span><Icon type="desktop" /><span className="nav-text">Views</span></span>}>
									<MenuItem>
										<Link to={'/lights'}>Lights</Link>
									</MenuItem>
									<MenuItem>
										<Link to={'/scenes'}>Scenes</Link>
									</MenuItem>
								</SubMenu>
								<APICalls />
							</Menu>
						</Sider>
						<Layout>
							<Layout>
								<Content style={{ padding: '1rem', minHeight: '280px' }}>
									<Route path={'/account'} exact render={props => {
										return (
											<div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem' }}>
												<div style={{ marginRight: '0.25rem' }}>
													<UserToken />
												</div>
												<div>
													<Tooltip placement="right" title={(
														<p>You can generate an access token in your <a href="https://cloud.lifx.com/settings" target="_blank">LIFX account settings</a>.</p>
													)}>
														<Icon type="question-circle" />
													</Tooltip>
												</div>
											</div>
										)
									}} />
									<Route path={'/lights'} exact component={BulbsList} />
									<Route path={'/lights/:id'} render={props => {
										return <Bulb id={props.match.params.id} />
									}} />
									<Route path={'/scenes'} exact component={ScenesList} />
								</Content>
							</Layout>
						</Layout>
					</Layout>
				</Provider>
			</Router>
		);
	}
}

export default App;
