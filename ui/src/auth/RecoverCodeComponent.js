import React, {Component} from 'react';
import {Button, Form, Icon, Input, Layout} from "antd";
import './RegisterCodeComponent.less';
import {serviceRecover} from "../services/auth/AuthService";
import {openNotification} from "../common/Notifications";
import {NavLink} from "react-router-dom";
import {PasswordInput} from "antd-password-input-strength";
import {validationErrorMsg} from "../config/ErrorConfig";

const {Content} = Layout;

class RecoverCodeForm extends Component {

  authToken;
  state = {
    checking: false,
  };

  componentDidMount() {
    if (this.props.location.state === undefined || this.props.location.state.userEmail === undefined) {
      this.props.history.push('/recover');
    }
  }

  validateAndSubmit = (e) => {
    this.setState({
      checking: true,
    });
    e.preventDefault();
    this.props.form.validateFields((error, data) => {
      if (!error) {

        const credentials = {
          verificationCode: data.verificationCode,
          userPassword: data.userPassword,
          userEmail: this.props.location.state.userEmail
        };

        serviceRecover(credentials).then(response => {
          if (response) {
            console.log(response);
            openNotification('recoverSuccess');
            this.props.history.push('/login');
          }
        }).catch(authError => {
          console.log(authError);
          if (authError.status === 404) {
            openNotification('validationCodeError');
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
      callback(validationErrorMsg.diffPass);
    } else {
      callback();
    }
  };

  render() {

    const {getFieldDecorator} = this.props.form;

    return (
      <Form
        onSubmit={this.validateAndSubmit}
        className={"auth-form"}
        hideRequiredMark={true}
      >
        <Form.Item>
          {getFieldDecorator('userPassword', {
            rules: [
              {required: true, message: 'Pole nie może być puste'},
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
              placeholder={"Nowe hasło"}
              onFocus={this.handleFocus}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('userRepeatPassword', {
            rules: [
              {required: true, message: 'Pole nie może być puste'},
              {validator: this.compareToFirstPassword},
            ],
            validateTrigger: 'onBlur'
          })(
            <Input.Password
              prefix={<Icon type={"lock"}/>}
              className={"register-input"}
              type={"password"}
              placeholder={"Powtórz nowe hasło"}
              onFocus={this.handleFocus}
            />
          )}
        </Form.Item>
        <Form.Item
          label={
            <div className={'register-code-label'}>Na podany email został wysłany kod weryfikacyjny.
              Proszę o wpisanie go, aby ukończyć proces zmiany hasła.</div>
          }
          labelCol={{span: 24}}
        >
          {getFieldDecorator('verificationCode', {
            rules: [
              {required: true, message: 'Pole nie może być puste'}
            ],
            validateTrigger: 'onBlur'
          })(
            <Input className={'register-code-input'}
                   placeholder={"Podaj kod weryfikacyjny"}
                   size={'large'}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-form-button"
                  loading={this.state.checking}>
            <span className={'register-form-button-text'}>Zmień hasło</span>
          </Button>
          Wróć do <NavLink to="/login"> <b>okna logowania.</b></NavLink>
        </Form.Item>
      </Form>
    );
  }
}

export const RecoverCodeComponent = Form.create({name: 'recoverCodeForm'})(RecoverCodeForm);
