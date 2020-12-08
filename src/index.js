import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import Larder from'./larder/Larder.js';
import ShoppingList from './shopping-list/ShoppingList.js';

const { Header, Content, Footer } = Layout;

const routing = (
  <Router>
    <Layout className="layout">
      <Header>
        <Menu 
          theme="dark" 
          mode="horizontal" 
          defaultSelectedKeys={['2']}
        >
          <Menu.Item key="1">
            <Link to="/larder">Larder</Link>
          </Menu.Item>
          
          <Menu.Item key="2">
            <Link to="/shopping-list">Shopping-list</Link>
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: '0 50px' }}>
        <Route 
          path="/larder" 
          component={Larder} 
        />

        <Route 
          path="/shopping-list" 
          component={ShoppingList} 
        />
      </Content>

      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
