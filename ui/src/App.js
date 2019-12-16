import React, {Component, createContext} from 'react';
import {Icon, Layout, Spin} from "antd";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {
  ACCESS_TOKEN,
  initFontAwesomeIcons,
  initMomentDateTimeLanguage,
  momentDateTimeLanguage
} from "./config/AppConfig";
import {routes} from './config/RoutesConfig';
import AppHeader from "./main/AppHeader";

import './App.less';
import './styles/global.less';
import './styles/variables.less';
import {serviceGetCurrentUser} from "./services/auth/AuthService";
import AuthComponent from "./auth/AuthComponent";
import AppBreadcrumbs from "./main/AppBreadcrumbs";

const {Content} = Layout;
export const AuthContext = createContext(null);

// TODO - use or delete
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

    const promise1 = serviceGetCurrentUser();

    Promise.all([promise1]).then(values => {
      if (values[0].userName && values[0].userRoles) {
        initFontAwesomeIcons();
        initMomentDateTimeLanguage(momentDateTimeLanguage);
        this.setState({
          currentUser: values[0],
          isAuth: true,
          loading: false,
        })
      }
    }).catch(error => {
      console.log(error);
      this.setState({
        loading: false
      });
    })
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
      <Route {...rest} render={(props) => (
        this.state.isAuth === true
          ? <RouteComponent {...rest} {...props}/>
          : <Redirect to={{
            pathname: '/login',
            state: {from: props.location}
          }}
          />
      )}/>
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
          if (addedRoutes.includes(route.key)) {
            return '';
          }
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
        <AuthContext.Provider value={{...currentUser}}>
          <Layout className={'app-layout'}>
            <AppHeader
              toggle={this.headerToggle}
              logout={this.logout}
              collapsed={this.state.collapsed}
              currentUser={currentUser}
            />
            <Content className={'app-content'}>
              <AppBreadcrumbs {...this.props} className={'app-breadcrumbs'}/>
              <div className={'app-switch'}>
                <Switch>
                  {router}
                </Switch>
              </div>
            </Content>
          </Layout>
        </AuthContext.Provider>
      </div>
    );
  }
}

export default withRouter(App);
