import React, {Component} from 'react';
import {Button, Form, Icon, Input, Layout} from "antd";
import './RegisterComponent.less';
import {serviceCheckUserEmail, serviceCheckUserName, serviceRegisterCode} from "../services/auth/AuthService";
import loginLogo from "../img/bear-logo-grey.png";
import {openNotification} from "../common/notifications/AuthNotifications";
import {NavLink} from "react-router-dom";
import {PasswordInput} from "antd-password-input-strength";

const {Content} = Layout;

class RegisterForm extends Component {

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
        serviceRegisterCode(credentials.userEmail).then(response => {
          if (response) {
            console.log(response);
            openNotification('validationCode');
            this.props.history.push({
              pathname: '/register/code',
              state: {
                credentials: credentials,
              }
            });
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

  compareToFirstPassword = (rule, value, callback) => {
    const {form} = this.props;
    if (value && value !== form.getFieldValue('userPassword')) {
      callback('Hasła nie pasują. Spróbuj ponownie.');
    } else {
      callback();
    }
  };

  checkUserName = (rule, value, callback) => {
    if (value === '') {
      callback('Podaj nazwę użytkownika.');
    } else if (/\s/.test(value)) {
      callback('Podaj nazwę użytkownika bez spacji.');
    } else {
      serviceCheckUserName(value).then(response => {
        if (response) {
          callback('Ta nazwa jest już zajęta');
        } else {
          callback();
        }
      });
    }
  };

  checkUserEmail = (rule, value, callback) => {
    if (value === '') {
      callback('Podaj poprawny email.');
    } else if (/\s/.test(value)) {
      callback('Podaj poprawny email bez spacji.');
    } else {
      serviceCheckUserEmail(value).then(response => {
        if (response) {
          callback('Ten email jest już zajęty');
        } else {
          callback();
        }
      });
    }
  };

  render() {

    const {getFieldDecorator} = this.props.form;

    return (
      <Layout>
        <Content className={"register-content"}>
          <div className={"register-header"}>
            <img src={loginLogo} alt="" className={"register-logo-icon"}/>
            Codeito
          </div>
          <Form
            onSubmit={this.validateAndSubmit}
            className={"register-form"}
          >
            <Form.Item
              // validateStatus={this.state.userNameStatus = ''}
              // help={this.state.userNameValidation}
            >
              {getFieldDecorator('userName', {
                rules: [
                  // {required: true, message: 'Podaj nazwę użytkownika.'},
                  // {pattern: new RegExp("^\\S+$"), message: 'Podaj nazwę bez spacji.'},
                  {validator: this.checkUserName}
                ],
                validateTrigger: 'onBlur'
              })(
                <Input prefix={<Icon type={"user"}/>} className={'register-input'}
                       placeholder={"Nazwa użytkownika"} onFocus={this.handleFocus}/>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('userEmail', {
                rules: [
                  {validator: this.checkUserEmail},
                  {type: 'email', message: 'Niepoprawny format email.'}
                ],
                validateTrigger: 'onBlur'
              })(
                <Input prefix={<Icon type={"mail"}/>} className={'register-input'}
                       placeholder={"Email"} onFocus={this.handleFocus}/>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('userPassword', {
                rules: [
                  {required: true, message: 'Podaj hasło.'},
                  {pattern: new RegExp("^\\S+$"), message: 'Podaj hasło bez spacji.'},
                ],
                validateTrigger: 'onBlur',
                settings: {
                  height: 4
                }
              })(
                <PasswordInput
                  settings={{
                    colorScheme: {
                      levels: ["#ff4033", "#fe940d", "#ffd908", "#cbe11d", "#6ecc3a"],
                      noLevel: "lightgrey"
                    },
                    height: 4,
                    alwaysVisible: false
                  }}
                  inputProps={{}}
                  prefix={<Icon type={"lock"}/>}
                  className={"register-input"}
                  type={"password"}
                  placeholder={"Hasło"}
                  onFocus={this.handleFocus}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('userRepeatPassword', {
                rules: [
                  {required: true, message: 'Powtórz hasło.'},
                  {validator: this.compareToFirstPassword},
                ],
                validateTrigger: 'onBlur'
              })(
                <Input.Password
                  prefix={<Icon type={"lock"}/>}
                  className={"register-input"}
                  type={"password"}
                  placeholder={"Powtórz hasło"}
                  onFocus={this.handleFocus}
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="register-form-button"
                      loading={this.state.checking}>
                <span className={'register-form-button-text'}>Dalej</span>
              </Button>
              Masz już konto?<NavLink to="/login"> <b>Zaloguj się.</b></NavLink>
            </Form.Item>
          </Form>
        </Content>
      </Layout>

    );
  }
}

export const RegisterComponent = Form.create({name: 'registerForm'})(RegisterForm);
