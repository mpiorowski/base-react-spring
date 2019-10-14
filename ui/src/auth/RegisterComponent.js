import React, {Component} from 'react';
import {Button, Form, Icon, Input} from "antd";
import './RegisterComponent.less';
import {serviceCheckUserEmail, serviceCheckUserName, serviceRegisterCode} from "../services/auth/AuthService";
import {openNotification} from "../common/Notifications";
import {NavLink} from "react-router-dom";
import {PasswordInput} from "antd-password-input-strength";
import {RegisterMessages} from "../common/RandomMessages";
import {isEmptyString} from "../utils/UtilsString";

const rn = Math.floor(Math.random() * RegisterMessages.length);

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
            openNotification('validationCodeSend');
            this.props.history.push({
              pathname: '/register/code',
              state: {
                credentials: credentials,
              }
            });
          }
        }).catch(apiError => {
          console.log(apiError);
          openNotification('serverError');
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
    console.log(value);
    if (isEmptyString(value)) {
      callback('Pole nie może być puste');
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
    if (isEmptyString(value)) {
      callback('Pole nie może być puste');
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
      <Form
        onSubmit={this.validateAndSubmit}
        className={"auth-form"}
      >
        <div className={"auth-message"}>{RegisterMessages[rn]}</div>
        <Form.Item
          // validateStatus={this.state.userNameStatus = ''}
          // help={this.state.userNameValidation}
        >
          {getFieldDecorator('userName', {
            rules: [
              // {required: true, message: 'Pole nie może być puste'},
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

    );
  }
}

export const RegisterComponent = Form.create({name: 'registerForm'})(RegisterForm);
