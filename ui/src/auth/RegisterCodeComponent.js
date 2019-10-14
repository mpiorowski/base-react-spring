import React, {Component} from 'react';
import {Button, Form, Input, Layout} from "antd";
import './RegisterCodeComponent.less';
import {serviceRegister} from "../services/auth/AuthService";
import loginLogo from "../img/bear-logo-grey.png";
import {openNotification} from "../common/Notifications";
import {NavLink} from "react-router-dom";

const {Content} = Layout;

class RegisterCodeForm extends Component {

  authToken;
  state = {
    checking: false,
  };


  componentDidMount() {
    if (this.props.location.state === undefined || this.props.location.state.credentials === undefined) {
      this.props.history.push('/register');
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
          ...this.props.location.state.credentials
        };

        serviceRegister(credentials).then(response => {
          if (response) {
            console.log(response);
            openNotification('registerSuccess');
            this.props.history.push('/login');
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


    console.log(this.props.location.state);

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
            hideRequiredMark={true}
          >
            <Form.Item
              label={
                <div className={'register-code-label'}>Na podany email został wysłany kod weryfikacyjny.
                  Proszę o wpisanie go, aby ukończyć proces rejestracji.</div>
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
                <span className={'register-form-button-text'}>Zarejestruj się</span>
              </Button>
              Masz już konto?<NavLink to="/login"> <b>Zaloguj się.</b></NavLink>
            </Form.Item>
          </Form>
        </Content>
      </Layout>

    );
  }
}

export const RegisterCodeComponent = Form.create({name: 'registerCodeForm'})(RegisterCodeForm);
