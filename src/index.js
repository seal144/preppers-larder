// @todo add linter rules: ;
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Layout, Menu } from 'antd';
// @todo implement sass https://create-react-app.dev/docs/adding-a-sass-stylesheet

import Larder from'./larder/Larder.js';
import ShoppingList from './shopping-list/ShoppingList.js';

const { Header, Content, Footer } = Layout;

// @todo create variable with urls to pass to child components
// @todo think better variable name than Routing
const Routing = (
  <Router>
    {/*
      @todo change favicon
      @todo clear public dir
    */}
    <Layout className="layout">
      <Header>
        {/*
          @DONE fix bug with defaultSelectedKeys on reresh page, could be solved by (D)
          @todo see themes and modes*
          @todo add new component: Menu or (B) or (C)
          @todo add new component: (C) HeaderContent
          @todo add bigger padding too look like a page (better for mobile?)
        */}
        <Menu 
          theme="dark" 
          mode="horizontal" 
          defaultSelectedKeys={['2']}
        >
          {/*
            @todo (B) add new component: Navigation
            @todo use grid for items
            @todo add icons for links@todo change favicon
            @todo separately import item?
            @todo (D) create object with Menu.item.key as key and route info as value and iterate to show Menu,Item
          */}
          <Menu.Item key="1">
            <Link to="/larder">Larder</Link>
          </Menu.Item>
          
          <Menu.Item key="2">
            <Link to="/shopping-list">Shopping-list</Link>
          </Menu.Item>
        </Menu>
      </Header>
      {/*
        @todo replace style with some common class
      */}
      <Content style={{ padding: '0 50px' }}>
        {/*
          @todo add rew component: RouteContent
          @todo handle default route or create 404 page
        */}
        <Route 
          path="/larder" 
          component={Larder} 
        />

        <Route 
          path="/shopping-list" 
          component={ShoppingList} 
        />
      </Content>
      {/*
        @todo replace style with some common class
        @todo add some content
      */}
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Router>
);

ReactDOM.render(Routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
