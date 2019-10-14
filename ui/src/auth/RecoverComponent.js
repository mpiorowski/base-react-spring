import React, {Component} from 'react';
import {Button, Form, Icon, Input, Layout} from "antd";
import './LoginComponent.less';
import {serviceRecoverCode} from "../services/auth/AuthService";
import {openNotification} from "../common/Notifications";
import {NavLink} from "react-router-dom";
import {RecoverMessages, WelcomeMessages} from "../common/RandomMessages";

const {Content} = Layout;

class RecoverForm extends Component {

  authToken;
  state = {
    checking: false,
  };

  validateAndSubmit = (e) => {
    this.setState({
      checking: true,
    });
    e.preventDefault();
    this.props.form.validateFields((error, data) => {
      if (!error) {
        serviceRecoverCode(data.userEmail).then(response => {
          if (response) {
            console.log(data.userEmail);
            this.props.history.push({
              pathname: '/recover/code',
              state: {
                userEmail: data.userEmail,
              }
            });
          }
        }).catch(authError => {
          console.log(authError);
          openNotification('serverAccess');
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
    const rn = Math.floor(Math.random() * RecoverMessages.length);

    return (
      <Form onSubmit={this.validateAndSubmit} className={"login-form"} hideRequiredMark={true}>
        <div className={"login-message"}>{RecoverMessages[rn]}</div>
        <Form.Item>
          {getFieldDecorator('userEmail', {
            rules: [
              {required: true, message: 'Pole nie może być puste'},
              {
                type: 'email',
                message: 'Niepoprawny format email.'
              }],
            validateTrigger: 'onBlur'
          })(
            <Input prefix={<Icon type={"user"}/>} className={'login-input'}
                   placeholder={"Podaj swój email"} onFocus={this.handleFocus}/>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button"
                  loading={this.state.checking}>
            <span className={'login-form-button-text'}>Dalej</span>
          </Button>
          Wróć do <NavLink to="/login"><b>okna logowania.</b></NavLink>
        </Form.Item>
      </Form>
    );
  }
}

export const RecoverComponent = Form.create({name: 'recoverForm'})(RecoverForm);
