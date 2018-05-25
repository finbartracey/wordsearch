import React from 'react';
import { Link } from 'react-router-dom';
import  { Menu, Button, Icon} from 'antd'
import AuthUserContext from '../Session/AuthUserContext';
import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';
import 'antd/dist/antd.css';
const SubMenu = Menu.SubMenu;
const Navigation = (props) =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth collapsed={props.collapsed} />
      : <NavigationNonAuth collapsed={props.collapsed}/>
    }
  </AuthUserContext.Consumer>

const NavigationAuth = (props) =>
<div>

<Menu  inlineCollapsed={props.collapsed} mode="inline">
    <Menu.Item key="1"><span><Link to={routes.LANDING}>Landing{props.collapsed}</Link></span></Menu.Item>
    <Menu.Item key="2"><span><Link to={routes.HOME}>Home</Link></span></Menu.Item>
    <Menu.Item key="3"><span><Link to={routes.ACCOUNT}>Account</Link></span></Menu.Item>
    <Menu.Item key="4"><span><Link to={routes.ADDLINK}>Add Link</Link></span></Menu.Item>
    <Menu.Item key="5"><span><Link to={routes.ADDGAME}>Create Word Search</Link></span></Menu.Item>
    <Menu.Item key="6"><span><SignOutButton /></span></Menu.Item>
</Menu>
 </div>

const NavigationNonAuth = (props) =>
<Menu>
  <Menu.Item>Menu</Menu.Item>
  <SubMenu title="SubMenu">
    <Menu.Item><Link to={routes.LANDING}>Landing</Link></Menu.Item>
    <Menu.Item><Link to={routes.SIGN_IN}>Sign In</Link></Menu.Item>
  </SubMenu>
</Menu>

export default Navigation;
