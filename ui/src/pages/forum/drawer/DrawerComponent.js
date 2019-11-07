import React, {Component} from 'react';
import {Drawer, Icon} from "antd";

import "./DrawerComponent.less";
import {WrappedDrawerForm} from "./DrawerForm";


const drawerHeader = {
  newPost: 'Dodaj nowy komentarz',
  editPost: 'Edytuj komentarz',
  replyPost: 'Odpowiedz na komentarz',
  newTopic: 'Dodaj nowy temat',
  editTopic: 'Edytuj temat'
};

class DrawerComponent extends Component {

  onUpload = (info) => {
    console.log(info.fileList);
  };

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
    const {visibility, record, type} = this.props.drawerData;

    return (
      <div>
        <Drawer
          title={drawerHeader[type]}
          height={500}
          placement="bottom"
          closable={true}
          onClose={() => this.props.handleDrawerVisible(false, {}, type)}
          visible={visibility}
          destroyOnClose={true}
        >
          <div className="forum-floating-drawer-btn" onClick={() => this.props.handleDrawerVisible(false, {}, type)}>
            {visibility ? <Icon type="minus"/> : <Icon type="plus"/>}
          </div>
          <WrappedDrawerForm
            record={record}
            type={type}
            handleDrawerVisible={this.props.handleDrawerVisible}
            onChildrenDrawerClose={this.onChildrenDrawerClose}
          />
        </Drawer>
      </div>
    );
  }
}

export default DrawerComponent;
