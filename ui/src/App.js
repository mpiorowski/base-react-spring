import React, {Component} from 'react';
import './App.less';
import {Icon, Layout, Spin} from "antd";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {serviceGetUser} from "./services/auth/AuthService";

import {ACCESS_TOKEN} from "./config/AuthConfig";
import AppHeader from "./main/AppHeader";
import {LoginComponent} from "./login/LoginComponent";
import UsersComponent from "./components/management/users/UsersComponent";
import AccountComponent from "./components/account/AccountComponent";
import GlobalErrorBoundary from "./main/GlobalErrorBoundary";
import {DynamicTheme} from "./styles/dynamicTheme";
import {breadcrumbNameMap} from "./config/BreadcrumbsConfig";
import {momentDateTimeLanguage, setUpMomentDateTimeLanguage} from "./config/DateTimeConfig";
import DiaryUserComponent from "./components/diary/user/DiaryUserComponent";
import AdminComponent from "./components/diary/admin/AdminComponent";
import ContactComponent from "./components/account/ContactComponent";
import AppHeaderMobile from "./main/AppHeaderMobile";

const {Content} = Layout;

class App extends Component {
  authorities;
  authority;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isAuth: false,
      isInitData: false,
      collapsed: true,
      currentUser: {},
      breadcrumbs: breadcrumbNameMap,
      notifications: {}
    };
  }

  componentWillMount() {
    this.setState({
      loading: true,
      isAuth: false,
    });
    console.log('APP');
  }

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = () => {
    this.setState({
      loading: true,
      isAuth: false,
    });
    serviceGetUser().then(response => {
      if (response.userName && response.authorities[0].authority) {
        console.log('auth', response);
        this.loadInitData();
        this.setState({
          isAuth: true,
          currentUser: response,
          loading: false,
        });
      }
    }).catch(error => {
      console.log(error);
      this.setState({
        loading: false
      });
    })
  };

  loadInitData = () => {
    setUpMomentDateTimeLanguage(momentDateTimeLanguage);
  };

  logout = () => {
    this.setState({
      currentUser: null,
      isAuth: false,
    });
    localStorage.removeItem(ACCESS_TOKEN);
    this.props.history.push("/login");
  };

  headerToggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  };

  // TODO - check if working
  changeTheme = (theme) => {
    if (theme) {
      let initialValue = DynamicTheme;
      let vars = {};

      vars = Object.assign(
          {},
          initialValue,
          JSON.parse(localStorage.getItem('app-theme'))
      );
      window.less.modifyVars(vars)
          .then(() => {
            console.log('success to update theme');
            localStorage.setItem('app-theme', JSON.stringify(vars));
          })
          .catch(error => {
            console.log('Failed to update theme');
          });
    }
  };


  render() {

    const isMobile = window.innerWidth <= 576;

    if (this.state.loading) {
      const antIcon = <Icon type="loading-3-quarters" style={{fontSize: 30}} spin/>;
      return (
          <div className={"app-loading"}>
            <Spin indicator={antIcon} className={"loading"}/>
          </div>
      )
    }

    if (!this.state.isAuth) {
      return (
          <Switch>
            <Route exact path="/login"
                   render={(props) => <LoginComponent
                       {...props}
                       checkAuth={this.checkAuth}
                   />}/>
            <Route path='*' render={() => <Redirect to={'/login'}/>}/>
          </Switch>
      )
    }
    const PrivateRoute = ({component: Component, ...rest}) => (
        <div>
          <Route {...rest} render={(props) => (
              this.state.isAuth === true
                  ? <Component {...rest} {...props}/>
                  : <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                  }}/>
          )}/>
        </div>
    );


    const userRole = this.state.currentUser.authorities[0].authority;
    return (
        <div>
          <GlobalErrorBoundary>
            <Layout style={{minHeight: '100vh'}}>
              <Layout className={'app-background'}>
                {isMobile ?
                    <AppHeaderMobile
                        toggle={this.headerToggle}
                        logout={this.logout}
                        collapsed={this.state.collapsed}
                        changeTheme={this.changeTheme}
                        currentUser={this.state.currentUser}
                    /> :
                    <AppHeader
                        toggle={this.headerToggle}
                        logout={this.logout}
                        collapsed={this.state.collapsed}
                        changeTheme={this.changeTheme}
                        currentUser={this.state.currentUser}
                    />
                }
                <Content className={'app-background'}>
                  <div className={'app-content'}>
                    <Switch>
                      <PrivateRoute exact path='/management/users'
                                    component={UsersComponent}
                                    currentUser={this.state.currentUser}/>
                      <PrivateRoute exact path='/account'
                                    component={AccountComponent}
                                    currentUser={this.state.currentUser}/>
                      <PrivateRoute exact path='/contact'
                                    component={ContactComponent}
                                    currentUser={this.state.currentUser}/>
                      {userRole === 'ROLE_USER' ?
                          [
                            <PrivateRoute path='/diary'
                                          component={DiaryUserComponent}
                                          currentUser={this.state.currentUser}
                                          key={1}/>,
                            <Route path='*' render={() => <Redirect to={'/diary/today'}/>}
                                   key={0}/>
                          ] : ''}
                      {(userRole === 'ROLE_ADMIN' || userRole === 'ROLE_CLIENT') ? [
                            <PrivateRoute path='/diary'
                                          component={AdminComponent}
                                          currentUser={this.state.currentUser} key={1}/>,
                            <Route path='*' render={() => <Redirect to={'/diary/newest'}/>} key={0}/>
                          ]
                          : ''}

                    </Switch>
                  </div>
                </Content>
              </Layout>
            </Layout>
          </GlobalErrorBoundary>

        </div>

    );
  }
}

export default withRouter(App);
