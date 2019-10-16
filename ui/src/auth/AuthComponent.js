import React, {Component} from 'react';
import {LoginComponent} from "./LoginComponent";
import {RegisterComponent} from "./RegisterComponent";
import {RegisterCodeComponent} from "./RegisterCodeComponent";
import {RecoverComponent} from "./RecoverComponent";
import {RecoverCodeComponent} from "./RecoverCodeComponent";
import {Redirect, Route, Switch} from "react-router-dom";
import {Layout} from "antd";
import loginLogo from "../img/bear-logo-grey.png";
import "./AuthComponent.less";

class AuthComponent extends Component {
  render() {
    return (
      <Layout>
        <Layout.Content className={"auth-content"}>
          <div className={"auth-header"}>
            <img src={loginLogo} alt="" className={"auth-logo-icon"}/>
            Codeito
          </div>
          <Switch>
            <Route exact path="/login"
                   render={(props) => <LoginComponent
                     {...props}
                     checkAuth={this.props.checkAuth}
                   />}/>
            <Route exact path="/register"
                   render={(props) => <RegisterComponent
                     {...props}
                   />}/>
            <Route exact path="/register/code"
                   render={(props) => <RegisterCodeComponent
                     {...props}
                   />}/>
            <Route exact path="/recover"
                   render={(props) => <RecoverComponent
                     {...props}
                   />}/>
            <Route exact path="/recover/code"
                   render={(props) => <RecoverCodeComponent
                     {...props}
                   />}/>
            <Route path='*' render={() => <Redirect to={'/login'}/>}/>
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}

export default AuthComponent;
