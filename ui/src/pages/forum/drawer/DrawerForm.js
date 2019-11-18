import React, {Component} from 'react';
import {Button, Form, Icon, Input} from "antd";
import {validationErrorMsg} from "../../../config/ErrorConfig";

const FormItem = Form.Item;

class DrawerForm extends Component {

  state = {
    childDrawerVisible: false,
  };

  toggleChildrenDrawer = (flag) => {
    this.setState({
      childDrawerVisible: flag,
    });
  };

  submitDrawer = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.submitDrawer(values);
      }
    });
  };

  render() {
    const {record, type} = this.props;
    const {getFieldDecorator} = this.props.form;

    let drawer;
    if (type === 'newCategory' || type === 'editCategory') {
      drawer = 'category';
    } else if (type === 'newTopic' || type === 'editTopic') {
      drawer = 'topic';
    } else if (type === 'newPost' || type === 'editPost' || type === 'replyPost') {
      drawer = 'post';
    }

    return (
      <Form onSubmit={this.submitDrawer}>
        <div>
          <FormItem style={{display: "none"}}>
            {getFieldDecorator('type', {initialValue: type})(<Input/>)}
          </FormItem>
          <FormItem style={{display: "none"}}>
            {getFieldDecorator('uid', {initialValue: record.uid || null})(<Input/>)}
          </FormItem>

          {drawer === 'topic' || drawer === 'category' ?
            <FormItem>
              {getFieldDecorator('title', {
                  rules: [{
                    required: true,
                    message: validationErrorMsg.empty,
                  }],
                  initialValue: record.title || ''
                }
              )(
                <Input placeholder={"Temat"} size={"large"} allowClear/>,
              )}
            </FormItem> : ''
          }
          {drawer === 'topic' || drawer === 'category'
            ? <FormItem>
              {getFieldDecorator('content', {
                  initialValue: record.content || '',
                  rules: [
                    {required: (drawer === 'category'), message: validationErrorMsg.empty},
                    {max: 10000, message: validationErrorMsg.maxSize10000}
                    ]
                }
              )(<Input.TextArea rows={8} maxLength={1000} placeholder={"Opis" + (drawer === 'topic' ? " (opcjonalnie)" : "") }/>)}
            </FormItem>
            : <FormItem>
              {getFieldDecorator('content', {
                  initialValue: record.postContent || record.topicDescription || '',
                  rules: [
                    {required: true, message: validationErrorMsg.empty},
                    {max: 10000, message: validationErrorMsg.maxSize10000}
                  ]
                }
              )(<Input.TextArea rows={8} maxLength={1000} placeholder={"Komentarz"}/>)}
            </FormItem>
          }
          <br/>

          {/* TODO - attachments*/}
          {/*{type === 'newPost' ?*/}
          {/*  <div>*/}
          {/*    <Drawer*/}
          {/*      title="Dodaj załączniki"*/}
          {/*      height={500}*/}
          {/*      placement="bottom"*/}
          {/*      closable={false}*/}
          {/*      onClose={() => this.toggleChildrenDrawer(false)}*/}
          {/*      visible={this.state.childDrawerVisible}*/}
          {/*    >*/}
          {/*      <Upload.Dragger*/}
          {/*        name="files"*/}
          {/*        className={"forum-drawer-upload"}*/}
          {/*        action={"/api/forum/post/upload"}*/}
          {/*        headers={{authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}*/}
          {/*        onChange={this.onUpload}*/}
          {/*      >*/}
          {/*        <p className="ant-upload-drag-icon">*/}
          {/*          <Icon type="inbox"/>*/}
          {/*        </p>*/}
          {/*        <p className="ant-upload-text">Click or drag file to this area to upload</p>*/}
          {/*        <p className="ant-upload-hint">Support for a single or bulk upload.</p>*/}
          {/*      </Upload.Dragger>*/}
          {/*    </Drawer>*/}
          {/*  </div> : ''*/}
          {/*}*/}

        </div>
        <div className={"forum-drawer-footer"}>
          <Button onClick={() => this.props.handleDrawerVisible(false, {}, type)} style={{marginRight: 8}}>
            Anuluj
          </Button>
          {/* TODO - attachments*/}
          {/*{type === 'post' ?*/}
          {/*  <Button type="primary" onClick={() => this.toggleChildrenDrawer(true)} style={{marginRight: 8}}>*/}
          {/*    <Icon type="plus"/> Dodaj załączniki*/}
          {/*  </Button> : ''}*/}
          <Button htmlType={"submit"} type="primary" style={{marginRight: 8}}>
            {type === 'editTopic' || type === 'editPost' || type === 'editCategory'
              ? <span><Icon type="edit"/> Edytuj</span>
              : <span><Icon type="plus"/> Dodaj</span>}
          </Button>
        </div>
      </Form>
    );
  }
}

export const WrappedDrawerForm = Form.create()(DrawerForm);

