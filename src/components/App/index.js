import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import  { Menu, Button, Icon} from 'antd'
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AddLink from '../AddLink';
import AddGame from '../AddGame';
import withAuthentication from '../Session/withAuthentication';
import * as routes from '../../constants/routes';

import './index.css';
class App extends Component {
  constructor(props) {
     super(props);

     this.state = { collapsed: false,}
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const {
      collapsed,
    } = this.state;
    return(
  <Router>
    <div className="app">
    <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>{collapsed}
    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
</Button>
      <Navigation collapsed={collapsed} />

      <hr/>

      <Route exact path={routes.LANDING} component={() => <LandingPage />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
      <Route  path={routes.HOME} component={HomePage} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
      <Route exact path={routes.ADDLINK} component={() => <AddLink />} />
      <Route exact path={routes.ADDGAME} component={() => <AddGame />} />
      <hr/>

       </div>
  </Router>
    )
  }
}

export default withAuthentication(App);