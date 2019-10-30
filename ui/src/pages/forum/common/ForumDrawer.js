import React, {Component} from 'react';
import {Button, Drawer, Form, Icon, Input, Upload} from "antd";
import {ACCESS_TOKEN} from "../../../config/AppConfig";
import "./ForumDrawer.less";
import {validationErrorMsg} from "../../../config/ErrorConfig";

const FormItem = Form.Item;

class ForumDrawer extends Component {

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
    const {getFieldDecorator, getFieldValue} = this.props.form;

    let drawerForm = () => {
      return (
        <Form onSubmit={this.handleSubmit}>
          <div>
            <div className="forum-floating-drawer-btn"
                 onClick={
                   drawerVisible
                     ? () => this.props.handleDrawerVisible(false, {})
                     : () => this.props.handleDrawerVisible(true, {}, 'new')
                 }
            >
              {drawerVisible ? <Icon type="minus"/> : <Icon type="plus"/>}
            </div>

            {/*<FormItem style={{display: "none"}}>*/}
            {/*  {getFieldDecorator('topicId', {initialValue: drawerRecord['topicId'] || null})(<Input/>)}*/}
            {/*</FormItem>*/}

            {drawerType === 'topic' ?
              <FormItem>
                {getFieldDecorator('title', {
                    rules: [{
                      required: true,
                      message: validationErrorMsg.empty,
                    }],
                    initialValue: drawerRecord.topicTitle || ''
                  }
                )(
                  <Input placeholder={"Temat"} size={"large"} allowClear/>,
                )}
              </FormItem> : ''
            }
            {drawerType === 'topic'
              ? <FormItem>
                {getFieldDecorator('content')
                (
                  <Input.TextArea rows={6} placeholder={"Opis (opcjonalne)"}/>,
                )}
              </FormItem>
              : <FormItem>
                {getFieldDecorator('content', {
                    rules: [{
                      required: true,
                      message: validationErrorMsg.empty,
                    }]
                  }
                )(
                  <Input.TextArea rows={8} placeholder={"Komentarz (maks 300 znaków)"}/>,
                )}
              </FormItem>
            }
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
        <div className="forum-floating-drawer-btn-initial" hidden={drawerVisible}
             onClick={() => this.props.handleDrawerVisible(true, {}, 'new')}
        >
          <Icon type="plus"/>
        </div>
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

export const WrappedForumDrawer = Form.create()(ForumDrawer);
