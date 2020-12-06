import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, NavLink, BrowserRouter as Router } from 'react-router-dom'

import Larder from'./larder/Larder.js';
import ShoppingList from './shopping-list/ShoppingList.js';

const routing = (
  <Router>
    <div>
      <ul>
        <li>
          <NavLink 
            activeClassName="nav-active" 
            to="/larder"
          >
            Larder
          </NavLink>
        </li>
        <li>
          <NavLink
           activeClassName="nav-active" 
           to="/shopping-list"
          >
            Shopping-list
          </NavLink>
        </li>
      </ul>
      <Route path="/larder" component={Larder} />
      <Route path="/shopping-list" component={ShoppingList} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
