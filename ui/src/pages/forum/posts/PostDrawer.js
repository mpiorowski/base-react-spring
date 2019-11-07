import React, {Component} from 'react';
import {Button, Drawer, Form, Icon, Input, Upload} from "antd";
import {ACCESS_TOKEN} from "../../../config/AppConfig";
import "./PostDrawer.less";
import {validationErrorMsg} from "../../../config/ErrorConfig";

const FormItem = Form.Item;

class PostDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      childDrawerVisible: false,
      initBtnVisible: true,
      drawerContent: ''
    }
  }

  showChildrenDrawer = () => {
    this.setState({
      childDrawerVisible: true,
    });
  };
  onChildrenDrawerClose = () => {
    this.setState({
      childDrawerVisible: false,
    });
  };

  onUpload = (info) => {
    console.log(info.fileList);
  };

  // onClose = () => {
  //   this.props.form.resetFields();
  // };
  //
  // drawerChange = (value) => {
  //   this.setState({drawerContent: value});
  //   this.props.form.setFieldsValue({'postContent': value});
  // };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.submitDrawer(values);
      }
    });
  };

  render() {

    const {drawerTitle, drawerRecord, drawerType, drawerVisible} = this.props;
    const {getFieldDecorator} = this.props.form;

    let drawerForm = () => {
      return (
        <Form onSubmit={this.handleSubmit}>
          <div>
            <div className="forum-floating-drawer-btn"
                 onClick={() => this.props.handleDrawerVisible(false, {})}
            >
              {drawerVisible ? <Icon type="minus"/> : <Icon type="plus"/>}
            </div>

            <FormItem style={{display: "none"}}>
              {getFieldDecorator('topicUid', {initialValue: drawerRecord.topicUid || null})(<Input/>)}
            </FormItem>
            <FormItem style={{display: "none"}}>
              {getFieldDecorator('postUid', {initialValue: drawerRecord.uid || null})(<Input/>)}
            </FormItem>
            <FormItem style={{display: "none"}}>
              {getFieldDecorator('replyUid', {initialValue: drawerRecord.replyUid || null})(<Input/>)}
            </FormItem>

            <FormItem>
              {getFieldDecorator('postContent', {
                  initialValue: drawerRecord.postContent || '',
                  rules: [
                    {
                      required: true,
                      message: validationErrorMsg.empty,
                    },
                    {
                      max: 10000,
                      message: validationErrorMsg.maxSize10000
                    }
                  ]
                }
              )(
                <Input.TextArea rows={8} maxLength={1000} placeholder={"Komentarz"}/>,
              )}
            </FormItem>

            <br/>
            {drawerType === 'post' ?
              <div>
                <Drawer
                  title="Dodaj załączniki"
                  height={500}
                  placement="bottom"
                  closable={false}
                  onClose={this.onChildrenDrawerClose}
                  visible={this.state.childDrawerVisible}
                >
                  <Upload.Dragger
                    name="files"
                    className={"forum-drawer-upload"}
                    action={"/api/forum/post/upload"}
                    headers={{authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}
                    onChange={this.onUpload}
                  >
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox"/>
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                  </Upload.Dragger>
                </Drawer>
              </div> : ''
            }

          </div>
          < div className={"forum-drawer-footer"}>
            <Button onClick={() => this.props.handleDrawerVisible(false, {})} style={{marginRight: 8}}>
              Anuluj
            </Button>
            {drawerType === 'post' ?
              <Button type="primary" onClick={this.showChildrenDrawer} style={{marginRight: 8}}>
                <Icon type="plus"/> Dodaj załączniki
              </Button> : ''}
            <Button htmlType={"submit"} type="primary" style={{marginRight: 8}}>
              <Icon type="plus"/> Dodaj
            </Button>
          </div>
        </Form>
      )
    };

    return (
      <div>

        <Drawer
          title={drawerTitle}
          height={500}
          placement="bottom"
          closable={true}
          onClose={() => this.props.handleDrawerVisible(false)}
          visible={drawerVisible}
          destroyOnClose={true}
        >
          {drawerForm()}
        </Drawer>
      </div>
    );
  }
}

export const WrappedPostDrawer = Form.create()(PostDrawer);
