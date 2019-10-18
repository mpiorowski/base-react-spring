import React, {Component} from "react";
import {Dropdown, Icon, Layout, Menu} from "antd";
import Clock from "../common/Clock";
import {Link, NavLink} from "react-router-dom";
import avatar from "../img/default-avatar.png";
import "./AppHeader.less";
import {routes} from "../config/RoutesConfig";

const {Header} = Layout;

let i = 0;

class AppHeader extends Component {

  render() {
    const userRoles = this.props.currentUser.userRoles;
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

    const routeHeader = [
      userRoles.map(role =>
        routes[role].headers.map(header =>
          <Link to={header.url} className={'header-submenu-link'} key={i++}>
            {header.headerIcon !== '' ? <Icon type={header.headerIcon} className={'header-submenu-icon'}/> : ''}
            <h2>{header.headerName}</h2>
          </Link>
        )
      )
    ];

    return (
      <Header className={'header-menu'} style={{zIndex: "2"}}>

        <div className={"header-menu-left"}>
          {routeHeader}
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
