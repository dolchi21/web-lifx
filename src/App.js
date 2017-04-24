import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { Layout, Menu } from 'antd'
const { Header, Content, Sider } = Layout

import './App.css';
import 'antd/dist/antd.min.css'

import store from './store'

import UserToken from './containers/UserToken'
import BulbsList from './containers/BulbsList'
import ScenesList from './containers/ScenesList'
import APICalls from './components/APICalls'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Layout>
          <AppHeader />
          <Layout>
            <Sider>
              <APICalls />
              <ScenesList/>
            </Sider>
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

var AppHeader = () => (
  <Header className="header">
    <Menu theme="dark" mode="horizontal">
      <Menu.Item>
        <UserToken />
      </Menu.Item>
    </Menu>
  </Header>
)

export default App;
