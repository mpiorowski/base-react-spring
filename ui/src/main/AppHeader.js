import React, {Component} from "react";
import {Dropdown, Icon, Layout, Menu} from "antd";
import Clock from "common/Clock";
import {Link, NavLink} from "react-router-dom";

import avatar from "img/default-avatar.png";
import "./AppHeader.less";

const {Header} = Layout;

class AppHeader extends Component {

  render() {
    const userRole = this.props.currentUser.userRole;

    const loginMenu = (
        <Menu className={'header-dropdown-menu'}>
          <Menu.Item>
            <NavLink to="/contact">
              <Icon type="phone"/> Kontakt
            </NavLink>
          </Menu.Item>
          <Menu.Divider/>
          <Menu.Item onClick={this.props.logout}>
            <NavLink to={'/login'}>
              <Icon type="logout"/> Wyloguj się
            </NavLink>
          </Menu.Item>
        </Menu>
    );


    return (
        <Header className={'header-menu'} style={{zIndex: "2"}}>

          <div className={"header-menu-left"}>
            <Link to={"/test1"} className={'header-submenu-link'}>
              <Icon type="book" className={"icon"}/>
              <h2>Najnowsze</h2>
            </Link>
            <Link to={"/test2"} className={'header-submenu-link'}>
              <Icon type="user" className={"icon"}/>
              <h2>Użytkownicy</h2>
            </Link>
          </div>
          <div className={'header-menu-right'}>
            <div className={'clock'}>
              <Clock/>
            </div>
            <Dropdown overlay={loginMenu}
                      placement="bottomRight"
                      trigger={["click"]}
                      className={''}
            >
              <div className={"header-dropdown"}>
                <img src={avatar} alt="" className={'avatar'}/>
              </div>
            </Dropdown>
          </div>
        </Header>
    );
  }
}

export default AppHeader;
