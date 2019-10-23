import React, {Component} from 'react';
import {Button, Drawer, Form, Icon, Input, Upload} from "antd";
import {ACCESS_TOKEN} from "../../../config/AppConfig";
import "./ForumDrawer.less";
import ReactQuill from "react-quill";
import {validationErrorMsg} from "../../../config/ErrorConfig";

const FormItem = Form.Item;

class ForumDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      childDrawerVisible: false,
      initBtnVisible: true
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.handleSubmit(values).then(response => {
          if (response) {
            this.props.handleDrawerVisible(false, {});
          }
        })
      }
    });
  };

  drawerChange = (value) => {
    this.props.form.setFieldsValue({'postContent': value});
  };

  createDrawer = (getFieldDecorator, isTitle, isQuill, getFieldValue, isChildrenDrawer, drawerPlaceholder, drawerRecord, drawerType, drawerVisible) => {
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

          <FormItem style={{display: "none"}}>
            {getFieldDecorator('topicId',
              {initialValue: drawerRecord['topicId'] || null}
            )(
              <Input/>
            )}
          </FormItem>

          {isTitle ?
            <FormItem>
              {getFieldDecorator('topicTitle', {
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
          {drawerType === 'topic' ?
            <div>
              <h3>Pierwszy post</h3>

              <ReactQuill
                className={'forum-drawer-quill'}
                value={getFieldValue('postContent') || ''}
                onChange={this.drawerChange}
              >
              </ReactQuill>

            </div>
            : ''
          }
          <br/>
          {isChildrenDrawer ?
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
        <div className={"forum-drawer-footer"}>
          <Button htmlType={"submit"} type="primary" style={{marginRight: 8}}>
            <Icon type="plus"/> Zapisz
          </Button>
          <Button onClick={() => this.props.handleDrawerVisible(false, {})} style={{marginRight: 8}}>
            Anuluj
          </Button>
          {isChildrenDrawer ?
            <Button type="primary" onClick={this.showChildrenDrawer}>
              <Icon type="plus"/> Dodaj załączniki
            </Button> : ''}
        </div>
      </Form>
    )
  };

  render() {

    const {isChildrenDrawer, isQuill, isTitle, drawerPlaceholder, drawerTitle, drawerRecord, drawerType, drawerVisible} = this.props;
    const {getFieldDecorator, getFieldValue} = this.props.form;

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
          {this.createDrawer(getFieldDecorator, isTitle, isQuill, getFieldValue, isChildrenDrawer, drawerPlaceholder, drawerRecord, drawerType, drawerVisible)}
        </Drawer>
      </div>
    );
  }
}

export const WrappedForumDrawer = Form.create()(ForumDrawer);
