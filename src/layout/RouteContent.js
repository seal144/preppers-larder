import React from 'react';
import { Route , Redirect } from 'react-router-dom';

import Larder from'../larder/Larder.js';
import ShoppingList from '../shopping-list/ShoppingList.js';
import './layout.scss';

const RouteContent = () => {
  return(
    <div className='content'>
      <Route 
        path="/larder" 
        component={Larder}
      />

      <Route 
        path="/shopping-list" 
        component={ShoppingList} 
      />

      {/*
       @todo fix default route
       @todo handle unauthenticated users
      */}
      <Redirect from='*' to='/larder' />
    </div>
  );
};

export default RouteContent;
