import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import { InsertRowRightOutlined, CopyOutlined, LogoutOutlined } from '@ant-design/icons';

const NavContent = () => {
  const history = useHistory();

  const navData = [
    { id: '1', label: 'Larder', path: '/larder', icon: <InsertRowRightOutlined className="main-menu__item__nav-icon"/> },
    { id: '2', label: 'Shopping list', path: '/shopping-list', icon: <CopyOutlined className="main-menu__item__nav-icon"/> }
  ];

  const currentPath = useLocation().pathname;
  const selectedNavItem = navData.find(navItem => currentPath.includes(navItem.path));
  const selectedNavKey = selectedNavItem ? selectedNavItem.id : null;

  const logout = () => {
    history.push('/');
  };

  const getNav = () => {
    if (currentPath === '/') {
      return (
        <h2 className="main-menu__item__header">Please Log In</h2>
      );
    } else if (currentPath.includes('/account')) {
      return (
        <h2 className="main-menu__item__header">Your account</h2>
      );
    } else {
      return (
        <>
        {navData.map(navItem => (
          <Menu.Item key={navItem.id} className="main-menu__item" icon={navItem.icon}>
            <Link to={navItem.path}>
              <span className="hidden-mobile">{navItem.label}</span>
            </Link> 
          </Menu.Item>
        ))}
        <Menu.Item className="main-menu__logout" icon={<LogoutOutlined className="main-menu__item__nav-icon" />}>
            <Link onClick={logout}>
            </Link> 
        </Menu.Item>
        </>
      );
    }
  };

  return(
    <Menu 
      theme="dark" 
      mode="horizontal" 
      selectedKeys={[selectedNavKey]}
      className="main-menu"
    >
      {getNav()}
    </Menu>
  );
};

export default NavContent;
