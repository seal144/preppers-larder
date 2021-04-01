import React from 'react';
import { Route , Redirect, Switch } from 'react-router-dom';

import Larder from'../larder/Larder';
import ShoppingList from '../shopping-list/ShoppingList';
import Product from '../larder/Product/Product';

const RouteContent = () => {
  return(
    <div className='content'>
      <Switch>
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
        <Redirect from='*' to='/larder' />
      </Switch>
    </div>
  );
};

export default RouteContent;
