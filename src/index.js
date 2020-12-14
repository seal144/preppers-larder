import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
// @todo implement sass https://create-react-app.dev/docs/adding-a-sass-stylesheet
// @todo implement prettier

import RouteContent from'./layout/RouteContent.js';
import NavContent from'./layout/NavContent.js';

const { Header, Content, Footer } = Layout;

// @todo create variable with urls to pass to child components
const App = (
  <Router>
    {/*
      @todo change favicon
      @todo clear public dir
    */}
    <Layout className="layout">
      <Header>
        {/*
          @todo fix bug with defaultSelectedKeys on reresh page, could be solved by (D)
          @todo see themes and modes*
          @todo add new component: Menu or (B) or (C)
          @todo add new component: (C) HeaderContent
          @todo add bigger padding too look like a page (better for mobile?)
        */}
        <NavContent />
      </Header>
      {/*
        @todo replace style with some common class
      */}
      <Content style={{ padding: '0 50px' }}>
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
