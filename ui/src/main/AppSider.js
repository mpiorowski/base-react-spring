import React, {Component} from 'react';
import logo from "../img/bear-logo-green.png";
import {Icon, Layout, Menu} from "antd";
import './AppSider.less';
import {Link, NavLink} from "react-router-dom";

const {Sider} = Layout;
const SubMenu = Menu.SubMenu;

class AppSider extends Component {

  state = {
    openKeys: [],
  };

  rootSubmenuKeys = ['sub1', 'sub2'];

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({openKeys});
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {

    const openKeys = this.props.collapsed ? {} : {openKeys: this.state.openKeys};

    return (
        <Sider
            className={'sider-main'}
            trigger={null}
            collapsible
            collapsed={this.props.collapsed}
            // style={{zIndex: "3"}}
            collapsedWidth={60}
        >
          <div className="sider-logo">
            <Link to={"/"}>
              <img src={logo} alt="" width={40}/>
              <h1>Bear Portal</h1>
            </Link>
          </div>
          <Menu
              // theme="dark"
              mode="inline"
              selectedKeys={[this.props.active]}
              className={"sider-menu"}
              {...openKeys}
              onOpenChange={this.onOpenChange}
          >
            <Menu.Item key="/forum/categories">
              <NavLink to="/forum/categories">
                <Icon type="user"/><span>Forum</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/nav2">
                <Icon type="video-camera"/><span>nav 2</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/nav3">
                <Icon type="upload"/><span>nav 3</span>
              </NavLink>
            </Menu.Item>
            <SubMenu key="sub1" className={"sider-nav-sub"}
                     title={<span><Icon type="setting"/><span>Administration</span></span>}>
              <Menu.Item key="/management/users">
                <NavLink to="/management/users">User Management</NavLink>
              </Menu.Item>
              <Menu.Item key="6">
                <NavLink to="/management/system">System Management</NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" className={"sider-nav-sub"}
                     title={<span><Icon type="setting"/><span>Test</span></span>}>
              <Menu.Item key="/test1">
                <NavLink to="/test1">Test1</NavLink>
              </Menu.Item>
              <Menu.Item key="/test2">
                <NavLink to="/test2">Test2</NavLink>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>

    );
  }
}

export default AppSider;
