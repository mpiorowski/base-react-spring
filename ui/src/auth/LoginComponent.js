import React, {Component} from 'react';
import {Button, Form, Icon, Input} from "antd";
import './LoginComponent.less';
import {serviceLogIn} from "../services/auth/AuthService";
import {ACCESS_TOKEN} from "../config/AppConfig";
import {openNotification} from "../common/Notifications";
import {NavLink} from "react-router-dom";
import {WelcomeMessages} from "../common/RandomMessages";

const rn = Math.floor(Math.random() * WelcomeMessages.length);

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
    this.props.form.validateFields((formError, credentials) => {
      if (!formError) {
        serviceLogIn(credentials).then(response => {
          if (response.authToken) {
            localStorage.setItem(ACCESS_TOKEN, response.authToken);
            this.props.checkAuth();
          }
        }).catch(apiError => {
          console.log(apiError);
          apiError.status === 404
            ? openNotification('authError')
            : openNotification('serverAccess');
          this.setState({checking: false});
        })
      } else {
        console.log(formError);
        this.setState({checking: false});
      }
    })
  };

  render() {

    const {getFieldDecorator} = this.props.form;

    return (
      <Form onSubmit={this.validateAndSubmit} className={"auth-form"} hideRequiredMark={true}>
        <div className={"auth-message"}>{WelcomeMessages[rn]}</div>
        <Form.Item>
          {getFieldDecorator('userNameOrEmail', {
            rules: [{required: true, message: 'Podaj nazwę użytkownika lub email.'}],
          })(
            <Input prefix={<Icon type={"user"}/>} className={'login-input'}
                   placeholder={"Nazwa użytkownika lub email"} onFocus={this.handleFocus}/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('userPassword', {
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

    );
  }
}

export const LoginComponent = Form.create({name: 'loginForm'})(LoginForm);
