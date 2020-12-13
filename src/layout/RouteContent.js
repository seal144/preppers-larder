import React from 'react';
import { Route , Redirect } from 'react-router-dom';

import Larder from'../larder/Larder.js';
import ShoppingList from '../shopping-list/ShoppingList.js';

const RouteContent = () => {
  return(
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default RouteContent;
