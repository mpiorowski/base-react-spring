import React, {Component} from 'react';
import {Button, Drawer, Form, Icon, Input, Upload} from "antd";
import {ACCESS_TOKEN} from "../../../config/AppConfig";
import "./PostDrawer.less";
import ReactQuill from "react-quill";

const FormItem = Form.Item;

class PostDrawer extends Component {

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
    this.props.form.setFieldsValue({'content': value});
  };

  createDrawer = (getFieldDecorator, isTitle, isQuill, getFieldValue, isChildrenDrawer, drawerPlaceholder, drawerRecord, drawerType, drawerVisible) => {
    return (
        <Form onSubmit={this.handleSubmit}>
          <div>
            <div className="post-floating-drawer-btn"
                 onClick={
                   drawerVisible
                       ? () => this.props.handleDrawerVisible(false, {})
                       : () => this.props.handleDrawerVisible(true, {}, 'new')
                 }
            >
              {drawerVisible ? <Icon type="minus"/> : <Icon type="plus"/>}
            </div>

            {isTitle ?
                <FormItem>
                  {getFieldDecorator('title', {
                        rules: [{
                          required: true,
                          message: 'Please input topic title!',
                          max: 10
                        }],
                      }
                  )(
                      <Input placeholder={drawerPlaceholder} size={"large"} allowClear/>,
                  )}
                </FormItem> : ''
            }
            {isQuill ?
                <div>
                  <FormItem style={{display: "none"}}>
                    {getFieldDecorator('postId',
                        {initialValue: drawerRecord['postId'] || null}
                    )(
                        <Input/>
                    )}
                  </FormItem>
                  <FormItem style={{display: "none"}}>
                    {getFieldDecorator('replyId',
                        {initialValue: drawerRecord['replyId'] || null}
                    )(
                        <Input/>
                    )}
                  </FormItem>
                  <FormItem style={{display: "none"}}>
                    {getFieldDecorator('content',
                        {initialValue: drawerType === 'edit' ? drawerRecord['postContent'] : ''}
                    )(
                        <Input/>
                    )}
                  </FormItem>

                  <ReactQuill
                      className={'post-drawer-quill'}
                      value={getFieldValue('content') || ''}
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
                      className={"drawer-attachments"}
                      placement="bottom"
                      closable={false}
                      onClose={this.onChildrenDrawerClose}
                      visible={this.state.childDrawerVisible}
                  >
                    <Upload.Dragger
                        name="files"
                        className={"post-drawer-upload"}
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
          <div className={"post-drawer-footer"}>
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

    // console.log('drawerRecord', drawerRecord);

    return (
        <div>
          <div className="post-floating-drawer-btn-initial" hidden={drawerVisible}
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

export const WrappedPostDrawer = Form.create()(PostDrawer);
