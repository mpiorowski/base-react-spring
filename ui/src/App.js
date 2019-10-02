import React, {Component} from 'react';
import './App.less';
import {Icon, Layout, Spin} from "antd";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {ACCESS_TOKEN} from "./config/AuthConfig";
import AppHeader from "./main/AppHeader";
import {LoginComponent} from "./login/LoginComponent";
import GlobalErrorBoundary from "./main/GlobalErrorBoundary";
import {momentDateTimeLanguage, setUpMomentDateTimeLanguage} from "./config/DateTimeConfig";
import {routes} from 'config/RoutesConfig';

const {Content} = Layout;
const isMobile = window.innerWidth <= 576;

class App extends Component {
  authorities;
  authority;
  userName;

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isAuth: false,
      currentUser: '',
      collapsed: true
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
      currentUser: {
        userName: 'admin',
        userRole: 'ADMIN'
      },
      isAuth: true,
      loading: false,
    });

    // this.setState({
    //   loading: true,
    //   isAuth: false,
    // });
    // serviceGetUser().then(response => {
    //   if (response.userName && response.authorities[0].authority) {
    //     this.loadInitData();
    //     this.setState({
    //       currentUser: response,
    //       isAuth: true,
    //       loading: false,
    //     });
    //   }
    // }).catch(error => {
    //   console.log(error);
    //   this.setState({
    //     loading: false
    //   });
    // })
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

  render() {

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
                  }}
                  />
          )}/>
        </div>
    );

    const currentUser = this.state.currentUser;

    let routerKey = 0;
    const router = [
      routes.main.paths.map(path => {
        return (
            <PrivateRoute path={path.url}
                          component={path.component}
                          userRole={this.state.userRole}
                          userName={this.state.userName}
                          key={routerKey++}/>
        )
      }),
      routes[currentUser.userRole].paths.map(path => {
        return (
            <PrivateRoute path={path.url}
                          component={path.component}
                          userRole={this.state.userRole}
                          userName={this.state.userName}
                          key={routerKey++}/>
        )
      }),
      <Route path='*' render={() => <Redirect to={routes[currentUser.userRole].redirect}/>}
             key={routerKey++}/>
    ];

    return (
        <div>
          <GlobalErrorBoundary>
            <Layout style={{minHeight: '100vh'}}>
              <Layout class={'app-background'}>
                <AppHeader
                    toggle={this.headerToggle}
                    logout={this.logout}
                    collapsed={this.state.collapsed}
                    currentUser={currentUser}
                />

                <Content class={'app-background'}>
                  <div class={'app-content'}>
                    <Switch>
                      {router}
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
