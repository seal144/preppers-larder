import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
// @todo implement prettier

import RouteContent from'./layout/RouteContent.js';
import NavContent from'./layout/NavContent.js';

const { Header, Content, Footer } = Layout;

const App = (
  <Router>
    {/*
      @todo change favicon
      @todo clear public dir
    */}
    <Layout className="layout">
      <Header>
        {/*
          @todo see themes and modes*
        */}
        <NavContent />
      </Header>
      
      <Content>
        <RouteContent />
      </Content>
      {/*
        @todo replace style with some common class
        @todo add some content
      */}
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Router>
);

ReactDOM.render(App, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
