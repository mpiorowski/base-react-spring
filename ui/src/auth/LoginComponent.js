import React, {Component} from 'react';
import {Button, Form, Icon, Input, Layout} from "antd";
import './LoginComponent.less';
import {serviceLogIn} from "../services/auth/AuthService";
import {ACCESS_TOKEN} from "../config/AppConfig";
import loginLogo from "../img/bear-logo-grey.png";
import {openNotification} from "../common/Notifications";
import {NavLink} from "react-router-dom";

const {Content} = Layout;

class LoginForm extends Component {

  authToken;
  state = {
    checking: false,
  };

  validateAndSubmit = (e) => {
    this.setState({
      checking: true,
    });
    e.preventDefault();
    this.props.form.validateFields((error, credentials) => {
      if (!error) {
        serviceLogIn(credentials).then(response => {
          if (response.authToken) {
            localStorage.setItem(ACCESS_TOKEN, response.authToken);
            this.props.checkAuth();
          }
        }).catch(authError => {
          console.log(authError);
          if (authError.status === 401) {
            openNotification('authError');
          } else {
            openNotification('serverAccess');
          }
          this.setState({
            checking: false,
          });
        })
      } else {
        console.log(error);
        this.setState({
          checking: false,
        });
      }
    })
  };

  render() {

    const {getFieldDecorator} = this.props.form;

    return (
      <Layout>
        <Content className={"login-content"}>
          <div className={"login-header"}>
            <img src={loginLogo} alt="" className={"login-logo-icon"}/>
            Codeito
          </div>
          <Form onSubmit={this.validateAndSubmit} className={"login-form"}>
            <Form.Item>
              {getFieldDecorator('userNameOrEmail', {
                // initialValue: PROFILE === 'dev' ? devUser.user : '',
                rules: [{required: true, message: 'Podaj nazwę użytkownika lub email.'}],
              })(
                <Input prefix={<Icon type={"user"}/>} className={'login-input'}
                       placeholder={"Nazwa użytkownika lub email"} onFocus={this.handleFocus}/>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('userPassword', {
                // initialValue: PROFILE === 'dev' ? devUser.pass : '',
                rules: [{required: true, message: 'Podaj hasło.'}],
              })(
                <Input prefix={<Icon type={"lock"}/>} className={"login-input"} type={"password"}
                       placeholder={"Hasło"} onFocus={this.handleFocus}/>
              )}
            </Form.Item>
            <Form.Item>
              <div className="login-form-forgot">
                <NavLink to={'/recover'}>Nie pamiętasz hasła?</NavLink>
              </div>
              <Button type="primary" htmlType="submit" className="login-form-button"
                      loading={this.state.checking}>
                <span className={'login-form-button-text'}>Zaloguj się</span>
              </Button>
              Lub <NavLink to="/register"><b>załóż nowe konto.</b></NavLink>
            </Form.Item>
          </Form>
        </Content>
      </Layout>

    );
  }
}

export const LoginComponent = Form.create({name: 'loginForm'})(LoginForm);
