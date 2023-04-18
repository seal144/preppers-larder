import React from 'react';
import { Route , Redirect, Switch } from 'react-router-dom';

import Larder from'../larder/Larder';
import ShoppingList from '../shopping-list/ShoppingList';
import Product from '../larder/Product/Product';
import LogInPage from '../LogIn/LogInPage';
import RegisterPage from '../LogIn/RegisterPage';

const RouteContent = () => {
  return(
    <div className='content'>
      <Switch>
        <Route
          path="/"
          component={LogInPage}
          exact
        />

        <Route
          path="/account"
          component={RegisterPage}
          exact
        />

        <Route
          path="/account/:user"
          component={RegisterPage}
          exact
        />

        <Route 
          path="/larder" 
          component={Larder}
          exact
        />
        
        <Route 
          path="/larder/product" 
          component={Product}
          exact
        />

        <Route 
          path="/shopping-list" 
          component={ShoppingList} 
          exact
        />

        {/*
        @todo handle unauthenticated users
        */}
        <Redirect from='*' to='/' />
      </Switch>
    </div>
  );
};

export default RouteContent;
