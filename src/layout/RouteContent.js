import React from 'react';
import { Route , Redirect, Switch } from 'react-router-dom';

import Larder from'../larder/Larder.js';
import ShoppingList from '../shopping-list/ShoppingList.js';

const RouteContent = () => {
  return(
    <div className='content'>
      <Switch>
        <Route 
          path="/larder" 
          component={Larder}
        />

        <Route 
          path="/shopping-list" 
          component={ShoppingList} 
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
