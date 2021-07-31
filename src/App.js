import React from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import authService from './shared/services/auth-service';
import Layout from './layout/layout';
import * as loginAction from './features/login/store/login.action';
import './App.css';

import LoginContainer from './features/login/container/login';
import NotesContainer from './features/notes/container/notes';
class App extends React.Component {

  componentDidMount () {
    if(authService.checkLogin()) {
      this.props.onRefresh();
    }
  }
  render() {
    if(authService.checkLogin() && this.props.isLogin) {
      return (
        <Layout>
          <Switch>
            <Route path='/home' component={NotesContainer} exact />
            <Redirect from={"/"} to="/home" />
          </Switch>
        </Layout>
      )
    } else {
      return (
        <Switch>
            <Route path='/login' component={LoginContainer}  exact/>
            <Redirect from="/"  to="/login"/>
        </Switch>
      )
    }
  }
}


const mapStateToProps = (state) => {
  return  {
    ...state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRefresh:  () => dispatch(loginAction.onRefresh())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
