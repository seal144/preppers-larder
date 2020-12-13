import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';

const NavContent = () => {
  const navData = [
    { label: 'Larder', path: '/larder', key: '1' },
    { label: 'Shopping list', path: '/shopping-list', key: '2' }
  ];

  const currentPath = useLocation().pathname;
  const selectedNavItem = navData.find(navItem => currentPath.includes(navItem.path));
  const selectedNavKey = selectedNavItem ? selectedNavItem.key : null;
  
  return(
    <Menu 
      theme="dark" 
      mode="horizontal" 
      selectedKeys={[selectedNavKey]}
    >
      {/*
        @todo use grid for items
        @todo add icons for links@todo change favicon
      */}
      {
        navData.map(navItem => (
          <Menu.Item key={navItem.key}>
            <Link to={navItem.path}>
              {navItem.label}
            </Link> 
          </Menu.Item>
        ))
      }
    </Menu>
  );
};

export default NavContent;
