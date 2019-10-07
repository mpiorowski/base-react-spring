import React, {Component} from 'react';
import {Button, Form, Icon, Input, Layout, Popover} from "antd";
import './LoginComponent.less';
import {serviceLogIn} from "../services/auth/AuthService";
import {ACCESS_TOKEN, devUser, PROFILE} from "../config/AppConfig";
import loginLogo from "../img/bear-logo-grey.png";
import {openNotification} from "../common/notifications/DiaryNotifications";

const {Content} = Layout;

class LoginForm extends Component {

  authToken;
  state = {
    checkingLogin: false,
  };

  validateAndSubmit = (e) => {
    this.setState({
      checkingLogin: true,
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
            checkingLogin: false,
          });
        })
      } else {
        console.log(error);
        this.setState({
          checkingLogin: false,
        });
      }
    })
  };

  handleFocus = (event) => event.target.select();

  render() {

    const {getFieldDecorator} = this.props.form;

    return (
        <Layout>
          <Content className={"login-content"}>
            <div className={"login-header"}>
              <img src={loginLogo} alt="" className={"login-logo-icon"}/>
              Dzienniczek
            </div>
            <Form onSubmit={this.validateAndSubmit} className={"login-form"}>
              <Form.Item>
                {getFieldDecorator('userNameOrEmail', {
                  initialValue: PROFILE === 'dev' ? devUser.user : '',
                  rules: [{required: true, message: 'Podaj nazwę użytkownika.'}],
                })(
                    <Input prefix={<Icon type={"user"}/>} className={'login-input'}
                           placeholder={"Nazwa użytkownika"} onFocus={this.handleFocus}/>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('userPassword', {
                  initialValue: PROFILE === 'dev' ? devUser.pass : '',
                  rules: [{required: true, message: 'Podaj hasło.'}],
                })(
                    <Input prefix={<Icon type={"lock"}/>} className={"login-input"} type={"password"}
                           placeholder={"Hasło"} onFocus={this.handleFocus}/>
                )}
              </Form.Item>
              <Form.Item>
                <Popover
                    content={
                      <div>
                        Zapomniałeś hasła? Zadzwoń do nas:
                        <br/><b>696 042 610</b>
                        <br/>lub napisz do nas na maila:
                        <br/><b><a href="mailto:agata.rakowska@pbs.pl">agata.rakowska@pbs.pl</a></b>
                        <br/>
                        W treści podaj swój login oraz numer telefonu.
                      </div>
                    }
                    trigger="click"
                >
                    <span className="login-form-forgot">
                      Nie pamiętasz hasła?
                    </span>
                </Popover>
                <Button type="primary" htmlType="submit" className="login-form-button"
                        loading={this.state.checkingLogin}>
                  <span className={'login-form-button-text'}>Zaloguj się</span>
                </Button>
              </Form.Item>
            </Form>
          </Content>
        </Layout>

    );
  }
}

export const LoginComponent = Form.create({name: 'loginForm'})(LoginForm);
