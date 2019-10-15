import React, {Component} from 'react';
import {Button, Form, Icon, Input} from "antd";
import './RegisterComponent.less';
import {serviceCheckUserEmail, serviceCheckUserName, serviceRegisterCode} from "../services/auth/AuthService";
import {openNotification} from "../common/Notifications";
import {NavLink} from "react-router-dom";
import {PasswordInput} from "antd-password-input-strength";
import {RegisterMessages} from "../common/RandomMessages";
import {isEmptyString} from "../utils/UtilsString";
import {validationErrorMsg} from "../config/ErrorConfig";
import {emailRegEx} from "../config/AppConfig";

const rn = Math.floor(Math.random() * RegisterMessages.length);

class RegisterForm extends Component {

  authToken;
  state = {
    checking: false,
    userNameStatus: '',
    userNameHelp: '',
    userEmailStatus: '',
    userEmailHelp: ''
  };

  validateAndSubmit = (e) => {
    this.setState({
      checking: true,
    });
    e.preventDefault();
    this.props.form.validateFields((error, credentials) => {
      if (!error) {
        serviceRegisterCode(credentials).then(response => {
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
          apiError.status === 400
            ? openNotification('serverError')
            : openNotification('serverAccess');
          this.setState({checking: false});
        })
      } else {
        console.log(error);
        this.setState({checking: false});
      }
    })
  };

  compareToFirstPassword = (rule, value, callback) => {
    const {form} = this.props;
    if (value && value !== form.getFieldValue('userPassword')) {
      callback(validationErrorMsg.diffPass);
    } else {
      callback();
    }
  };

  checkUserName = (rule, value, callback) => {
    if (isEmptyString(value)) {
      this.setState({userNameStatus: 'error', userNameHelp: validationErrorMsg.empty});
      callback(validationErrorMsg.empty);
    } else if (/\s/.test(value)) {
      this.setState({userNameStatus: 'error', userNameHelp: validationErrorMsg.space});
      callback(validationErrorMsg.space);
    } else {
      this.setState({userNameStatus: 'validating', userNameHelp: ''});
      serviceCheckUserName(value).then(response => {
        if (response) {
          this.setState({userNameStatus: 'error', userNameHelp: validationErrorMsg.userName});
          callback(validationErrorMsg.userName);
        } else {
          this.setState({userNameStatus: 'success', userNameHelp: ''});
          callback();
        }
      });
    }
  };

  checkUserEmail = (rule, value, callback) => {
    if (isEmptyString(value)) {
      this.setState({userEmailStatus: 'error', userEmailHelp: validationErrorMsg.empty});
      callback(validationErrorMsg.empty);
    } else if (/\s/.test(value)) {
      this.setState({userEmailStatus: 'error', userEmailHelp: validationErrorMsg.space});
      callback(validationErrorMsg.space);
    } else if (!emailRegEx.test(value)) {
      this.setState({userEmailStatus: 'error', userEmailHelp: validationErrorMsg.email});
      callback(validationErrorMsg.email);
    } else {
      serviceCheckUserEmail(value).then(response => {
        this.setState({userEmailStatus: 'validating', userEmailHelp: ''});
        if (response) {
          this.setState({userEmailStatus: 'error', userEmailHelp: validationErrorMsg.userEmail});
          callback(validationErrorMsg.userEmail);
        } else {
          this.setState({userEmailStatus: 'success', userEmailHelp: ''});
          callback();
        }
      });
    }
  };

  render() {

    const {getFieldDecorator} = this.props.form;
    const {userNameStatus, userNameHelp, userEmailStatus, userEmailHelp} = this.state;

    return (
      <Form
        onSubmit={this.validateAndSubmit}
        className={"auth-form"}
      >
        <div className={"auth-message"}>{RegisterMessages[rn]}</div>
        <Form.Item
          hasFeedback
          validateStatus={userNameStatus}
          help={userNameHelp}
        >
          {getFieldDecorator('userName', {
            rules: [
              {validator: this.checkUserName}
            ],
            validateTrigger: 'onBlur'
          })(
            <Input prefix={<Icon type={"user"}/>} className={'register-input'}
                   placeholder={"Nazwa użytkownika"} onFocus={this.handleFocus}/>
          )}
        </Form.Item>
        <Form.Item
          hasFeedback
          validateStatus={userEmailStatus}
          help={userEmailHelp}>
          {getFieldDecorator('userEmail', {
            rules: [
              {validator: this.checkUserEmail}
            ],
            validateTrigger: 'onBlur'
          })(
            <Input prefix={<Icon type={"mail"}/>} className={'register-input'}
                   placeholder={"Email"} onFocus={this.handleFocus}/>
          )}
        </Form.Item>
        <Form.Item
          hasFeedback
        >
          {getFieldDecorator('userPassword', {
            rules: [
              {required: true, message: validationErrorMsg.empty},
              {pattern: new RegExp("^\\S+$"), message: validationErrorMsg.space},
            ],
            validateTrigger: 'onBlur',
            settings: {
              height: 4
            }
          })(
            <span className={'ant-form-item-children'}>
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
            </span>
          )}
        </Form.Item>
        <Form.Item
          hasFeedback
        >
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
