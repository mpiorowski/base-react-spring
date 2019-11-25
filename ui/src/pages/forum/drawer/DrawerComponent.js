import React, {Component} from 'react';
import {Drawer, Icon} from "antd";

import "./DrawerComponent.less";
import {WrappedDrawerForm} from "./DrawerForm";


const drawerHeader = {
  newCategory: 'Nowa kategoria',
  editCategory: 'Edytuj kategorię',
  newTopic: 'Dodaj nowy temat',
  editTopic: 'Edytuj temat',
  newPost: 'Dodaj nowy komentarz',
  editPost: 'Edytuj komentarz',
  newReply: 'Odpowiedz na komentarz',
};

class DrawerComponent extends Component {

  onUpload = (info) => {
    console.log(info.fileList);
  };

  render() {
    const {visibility, record, type} = this.props.drawerData;

    return (
      <div>
        <Drawer
          title={drawerHeader[type]}
          height={420}
          placement="bottom"
          closable={true}
          onClose={() => this.props.handleDrawerVisible(false, {}, type)}
          visible={visibility}
          destroyOnClose={true}
        >
          <div className="forum-floating-drawer minus" onClick={() => this.props.handleDrawerVisible(false, {}, type)}>
            {visibility ? <Icon type="minus"/> : <Icon type="plus"/>}
          </div>
          <WrappedDrawerForm
            record={record}
            type={type}
            submitDrawer={this.props.submitDrawer}
            handleDrawerVisible={this.props.handleDrawerVisible}
            onChildrenDrawerClose={this.onChildrenDrawerClose}
          />
        </Drawer>
      </div>
    );
  }
}

export default DrawerComponent;
