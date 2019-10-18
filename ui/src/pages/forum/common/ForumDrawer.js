import React, {Component} from 'react';
import {Button, Drawer, Form, Icon, Input, Upload} from "antd";
import {ACCESS_TOKEN} from "../../../config/AuthConfig";
import "./ForumDrawer.less";
import ReactQuill from "react-quill";

const FormItem = Form.Item;

class ForumDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      drawerVisible: false,
      childDrawerVisible: false,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.props.text);
  }


  handleQuillChange = (text) => {
    console.log('tutaj');
    console.log(text);
    this.setState({
      text: text
    })
  };

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

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // this.props.submit(values).then(response => {
        //   if (response) {
        //     this.onClose();
        //   }
        // })
      }
    });
  };


  openDrawer = () => {
    console.log("openDrawer");
    this.props.form.resetFields();
    this.props.openDrawer();
  };
  closeDrawer = () => {
    console.log("closeDrawer");
    this.props.form.resetFields();
    this.props.closeDrawer();
  };

  render() {

    const {drawerTitle, isChildrenDrawer, isQuill, placeholder, isTitle} = this.props;
    const {getFieldDecorator, getFieldValue} = this.props.form;

    return (
        <div>
          <div className="forum-floating-drawer-btn-initial" hidden={this.props.drawerVisible}
               onClick={this.openDrawer}
          >
            <Icon type="plus"/>
          </div>
          <Drawer
              title={drawerTitle}
              height={500}
              placement="bottom"
              closable={true}
              onClose={this.closeDrawer}
              visible={this.props.drawerVisible}
          >
            <Form onSubmit={this.handleSubmit}>
              <div>
                <div className="forum-floating-drawer-btn"
                     onClick={this.props.drawerVisible ? this.closeDrawer : this.openDrawer}
                >
                  {this.props.drawerVisible ? <Icon type="minus"/> : <Icon type="plus"/>}
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
                          <Input placeholder={placeholder} size={"large"} allowClear/>,
                      )}
                    </FormItem> : ''
                }
                {isQuill ?
                    <div>
                      <FormItem style={{display: "none"}}>
                        {getFieldDecorator('replyId',
                            {initialValue: this.props.drawerReply.postId || 0}
                        )(
                            <Input/>
                        )}
                      </FormItem>
                      <FormItem style={{display: "none"}}>
                        {getFieldDecorator('postId',
                            {initialValue: this.props.drawerEdit.postId || 0}
                        )(
                            <Input/>
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator('content',
                            {initialValue: this.props.text}
                        )(
                            <Input/>
                        )}
                      </FormItem>

                        <ReactQuill
                            id={'test'}
                            className={'forum-drawer-quill'}
                            value={getFieldValue('content')}
                            onChange={this.handleQuillChange}
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
                <Button onClick={this.props.closeDrawer} style={{marginRight: 8}}>
                  Anuluj
                </Button>
                {isChildrenDrawer ?
                    <Button type="primary" onClick={this.showChildrenDrawer}>
                      <Icon type="plus"/> Dodaj załączniki
                    </Button> : ''}
              </div>
            </Form>
          </Drawer>
        </div>
    );
  }
}

export const WrappedForumDrawer = Form.create()(ForumDrawer);
