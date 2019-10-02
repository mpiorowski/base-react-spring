import React, {Component} from 'react';
import {Button, Form, Icon, Input, Layout, Popover, Spin} from "antd";
import './LoginComponent.less';
import {serviceLogIn} from "../services/auth/AuthService";
import {ACCESS_TOKEN} from "../config/AppConfig";
import pbslogo from "../img/pbs-logo.png";
import {openNotification} from "../common/notifications/DiaryNotifications";

const {Content} = Layout;
const antIcon = <Icon type="loading" style={{fontSize: 18}} spin/>;

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
        }).catch(error => {
          console.log(error);
          if (error.status === 401) {
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
        openNotification('authError');
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
          <Content>
            <div className={"app-login"}>
              <div className={"login-header"}>
                <img src={pbslogo} alt="" className={"login-logo"}/>
                <p className={'login-logo-text'}> Dzienniczek</p>
              </div>
              <Form onSubmit={this.validateAndSubmit} className={"login-form"}>
                <Form.Item>
                  {getFieldDecorator('userName', {
                    // initialValue: 'admin',
                    rules: [{required: true, message: 'Podaj nazwę użytkownika.'}],
                  })(
                      <Input prefix={<Icon type={"user"}/>} className={'login-input'}
                             placeholder={"Nazwa użytkownika"} onFocus={this.handleFocus}/>
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('userPassword', {
                    // initialValue: 'pass',
                    rules: [{required: true, message: 'Podaj hasło.'}],
                  })(
                      <Input prefix={<Icon type={"lock"}/>} className={"login-input"} type={"password"}
                             placeholder={"Hasło"} onFocus={this.handleFocus}/>
                  )}
                </Form.Item>
                <Form.Item>
                  {/*{getFieldDecorator('remember', {*/}
                  {/*  valuePropName: 'checked',*/}
                  {/*  initialValue: true,*/}
                  {/*})(*/}
                  {/*    <Checkbox className={"grey-color"}>Zapamiętaj mnie</Checkbox>*/}
                  {/*)}*/}
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
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    {this.state.checkingLogin ? <Spin indicator={antIcon} className={"login-spin"}/> : ""}
                    Zaloguj się
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Content>
        </Layout>

    );
  }
}

export const LoginComponent = Form.create({name: 'loginForm'})(LoginForm);
