import React from 'react';
import { Route } from 'react-router-dom';

import Larder from'../larder/Larder.js';
import ShoppingList from '../shopping-list/ShoppingList.js';

const RouteContent = () => {
  return(
    <React.Fragment>
      {/*
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
    </React.Fragment>
  );
};

export default RouteContent;
