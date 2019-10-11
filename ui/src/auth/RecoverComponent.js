import React, {Component} from 'react';
import {Button, Form, Icon, Input, Layout} from "antd";
import './LoginComponent.less';
import {serviceLogIn} from "../services/auth/AuthService";
import {ACCESS_TOKEN} from "../config/AppConfig";
import loginLogo from "../img/bear-logo-grey.png";
import {openNotification} from "../common/notifications/DiaryNotifications";
import {NavLink} from "react-router-dom";

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
          <Form onSubmit={this.validateAndSubmit} className={"login-form"} hideRequiredMark={true}>
            <Form.Item
              label={'Nie martw się, zdarza się każdemu z nas'}
              labelCol={{span: 24}}
              colon={false}
            >
              {getFieldDecorator('userNameOrEmail', {
                rules: [{required: true, message: 'Podaj swój email lub nazwę użytkownika.'}],
              })(
                <Input prefix={<Icon type={"user"}/>} className={'login-input'}
                       placeholder={"Podaj swój email lub nazwę użytkownika"} onFocus={this.handleFocus}/>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button"
                      loading={this.state.checking}>
                <span className={'login-form-button-text'}>Wyślij link do zresetowania hasła</span>
              </Button>
              Wróć do <NavLink to="/login"><b>okna logowania.</b></NavLink>
            </Form.Item>
          </Form>
        </Content>
      </Layout>

    );
  }
}

export const RecoverComponent = Form.create({name: 'recoverForm'})(RecoverForm);
