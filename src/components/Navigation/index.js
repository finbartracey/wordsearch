import React from 'react';
import { Link } from 'react-router-dom';
import  { Menu } from 'antd'
import AuthUserContext from '../Session/AuthUserContext';
import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';
import 'antd/dist/antd.css';
const SubMenu = Menu.SubMenu;
const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
<Menu>
  <Menu.Item>Menu</Menu.Item>
  <SubMenu title="SubMenu">
    <Menu.Item><Link to={routes.LANDING}>Landing</Link></Menu.Item>
    <Menu.Item><Link to={routes.HOME}>Home</Link></Menu.Item>
    <Menu.Item><Link to={routes.ACCOUNT}>Account</Link></Menu.Item>
    <Menu.Item><Link to={routes.ADDLINK}>Add Link</Link></Menu.Item>
    <Menu.Item><Link to={routes.ADDGAME}>Create Word Search</Link></Menu.Item>
    <Menu.Item><SignOutButton /></Menu.Item>
  </SubMenu>
</Menu>
 

const NavigationNonAuth = () =>
<Menu>
  <Menu.Item>Menu</Menu.Item>
  <SubMenu title="SubMenu">
    <Menu.Item><Link to={routes.LANDING}>Landing</Link></Menu.Item>
    <Menu.Item><Link to={routes.SIGN_IN}>Sign In</Link></Menu.Item>
  </SubMenu>
</Menu>

export default Navigation;
