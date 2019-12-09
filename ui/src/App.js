import React, {Component} from 'react';
import {Icon, Layout, Spin} from "antd";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {ACCESS_TOKEN} from "./config/AppConfig";
import {momentDateTimeLanguage, setUpMomentDateTimeLanguage} from "./config/DateTimeConfig";
import {routes} from './config/RoutesConfig';
import AppHeader from "./main/AppHeader";

import './App.less';
import './styles/global.less';
import './styles/variables.less';
import {serviceGetUser} from "./services/auth/AuthService";
import AuthComponent from "./auth/AuthComponent";
import {initFontAwesomeIcons} from "./config/IconsConfig";

const {Content} = Layout;

// TODO - use or deletes
// const isMobile = window.innerWidth <= 576;

class App extends Component {
  userName;
  userRoles;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isAuth: false,
      currentUser: '',
      collapsed: true
    };
  }

  componentDidMount() {
    console.log('APP');
    this.checkAuth();
  }

  checkAuth = () => {
    this.setState({
      loading: true,
      isAuth: false,
    });
    serviceGetUser().then(response => {
      console.log(response);
      if (response.userName && response.userRoles) {
        this.loadInitData();
        this.setState({
          currentUser: response,
          isAuth: true,
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
    initFontAwesomeIcons();
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

  render() {

    if (this.state.loading) {
      const antIcon = <Icon type="loading-3-quarters" style={{fontSize: 30}} spin/>;
      return (
        <div className={"app-layout"}>
          <Spin indicator={antIcon} className={"loading"}/>
        </div>
      )
    }

    if (!this.state.isAuth && !this.state.loading) {
      return (
        <AuthComponent checkAuth={this.checkAuth}/>
      )
    }
    const PrivateRoute = ({component: RouteComponent, ...rest}) => (
      <div>
        <Route {...rest} render={(props) => (
          this.state.isAuth === true
            ? <RouteComponent {...rest} {...props}/>
            : <Redirect to={{
              pathname: '/login',
              state: {from: props.location}
            }}
            />
        )}/>
      </div>
    );

    const currentUser = this.state.currentUser;
    let routerKey = 0;

    // ROUTER CONFIG
    let addedRoutes = [];
    const router = [
      routes.main.paths.map(path => {
        return (
          <PrivateRoute exact={path.exact || true}
                        path={path.url}
                        component={path.component}
                        currentUser={this.state.currentUser}
                        key={routerKey++}/>
        )
      }),
      currentUser.userRoles.map(role =>
        routes[role].paths.map(route => {
          if (addedRoutes.includes(route.key)) {return '';}
          addedRoutes.push(route.key);
          return (
            <PrivateRoute path={route.path.url}
                          component={route.path.component}
                          currentUser={this.state.currentUser}
                          key={routerKey++}/>
          )
        })
      ),
      <Route path='*' render={() => <Redirect to={routes[currentUser.userRoles[0]].redirect}/>}
             key={routerKey++}/>
    ];

    return (
      <div>
        <Layout className={'app-layout'}>
          <AppHeader
            toggle={this.headerToggle}
            logout={this.logout}
            collapsed={this.state.collapsed}
            currentUser={currentUser}
          />
          <Content className={'app-content'}>
            <Switch>
              {router}
            </Switch>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
