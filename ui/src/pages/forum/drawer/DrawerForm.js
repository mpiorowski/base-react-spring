import React, {Component} from 'react';
import {Button, Form, Icon, Input, Radio} from "antd";
import {validationErrorMsg} from "../../../config/ErrorConfig";
import {submitForumDrawer} from "./DrawerSubmit";

const FormItem = Form.Item;

class DrawerForm extends Component {

  state = {
    childDrawerVisible: false,
    categoryUid: this.props.categoryUid || null,
    topicUid: this.props.topicUid || null,
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
        submitForumDrawer(values).then(response => {
          this.props.handleSubmitDrawer(values, response);
        })
      }
    });
  };

  render() {
    const {categoryUid, topicUid, record, type} = this.props;
    const {getFieldDecorator} = this.props.form;

    let drawer;
    if (type === 'newCategory' || type === 'editCategory') {
      drawer = 'category';
    } else if (type === 'newTopic' || type === 'editTopic') {
      drawer = 'topic';
    } else if (type === 'newPost' || type === 'newReply' || type === 'editPost' || type === 'editReply') {
      drawer = 'post';
    }

    return (
      <Form onSubmit={this.submitDrawer} layout={"horizontal"}>
        <div>
          <FormItem style={{display: "none"}}>
            {getFieldDecorator('categoryUid', {initialValue: categoryUid})(<Input/>)}
          </FormItem>
          <FormItem style={{display: "none"}}>
            {getFieldDecorator('topicUid', {initialValue: topicUid})(<Input/>)}
          </FormItem>
          <FormItem style={{display: "none"}}>
            {getFieldDecorator('type', {initialValue: type})(<Input/>)}
          </FormItem>
          <FormItem style={{display: "none"}}>
            {getFieldDecorator('replyUid', {initialValue: record.replyUid || null})(<Input/>)}
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
              )(<Input.TextArea rows={4} maxLength={1000}
                                placeholder={"Opis" + (drawer === 'topic' ? " (opcjonalnie)" : "")}/>)}
            </FormItem>
            : <FormItem>
              {getFieldDecorator('content', {
                  initialValue: record.content || '',
                  rules: [
                    {required: true, message: validationErrorMsg.empty},
                    {max: 10000, message: validationErrorMsg.maxSize10000}
                  ]
                }
              )(<Input.TextArea rows={8} maxLength={1000} placeholder={"Komentarz"}/>)}
            </FormItem>
          }
          {drawer === 'category'
            ? <Form.Item>
              {getFieldDecorator('icon', {
                rules: [
                  {required: true, message: 'Wybierz ikonę kategorii'}
                ]
              })(
                <Radio.Group>
                  <Radio value="edit" className={"forum-drawer-radio"}><Icon type="edit"/></Radio>
                  <Radio value="form" className={"forum-drawer-radio"}><Icon type="form"/></Radio>
                  <Radio value="snippets" className={"forum-drawer-radio"}><Icon type="snippets"/></Radio>
                  <Radio value="appstore" className={"forum-drawer-radio"}><Icon type="appstore"/></Radio>
                </Radio.Group>,
              )}
            </Form.Item> : ''}

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
            {type === 'editTopic' || type === 'editPost' || type === 'editReply' || type === 'editCategory'
              ? <span><Icon type="edit"/> Edytuj</span>
              : <span><Icon type="plus"/> Dodaj</span>}
          </Button>
        </div>
      </Form>
    );
  }
}

export const WrappedDrawerForm = Form.create()(DrawerForm);

