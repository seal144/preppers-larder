import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { InsertRowRightOutlined, CopyOutlined } from '@ant-design/icons';

const NavContent = () => {
  const navData = [
    { id: '1', label: 'Larder', path: '/larder', icon: <InsertRowRightOutlined className="main-menu__item__nav-icon"/> },
    { id: '2', label: 'Shopping list', path: '/shopping-list', icon: <CopyOutlined className="main-menu__item__nav-icon"/> }
  ];

  const currentPath = useLocation().pathname;
  const selectedNavItem = navData.find(navItem => currentPath.includes(navItem.path));
  const selectedNavKey = selectedNavItem ? selectedNavItem.id : null;
  
  return(
    <Menu 
      theme="dark" 
      mode="horizontal" 
      selectedKeys={[selectedNavKey]}
      className="main-menu"
    >
      {
        navData.map(navItem => (
          <Menu.Item key={navItem.id} className="main-menu__item" icon={navItem.icon}>
            <Link to={navItem.path}>
              <span className="hidden-mobile">{navItem.label}</span>
            </Link> 
          </Menu.Item>
        ))
      }
    </Menu>
  );
};

export default NavContent;
