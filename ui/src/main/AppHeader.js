import React, {Component} from 'react';
import {Dropdown, Icon, Layout, Menu} from "antd";
import avatar from "../img/default-avatar.png";
import './AppHeader.less';
import Clock from "../common/Clock";
import {Link, NavLink} from "react-router-dom";

const {Header} = Layout;

class AppHeader extends Component {

  state = {
    userRole: this.props.currentUser.userRole
  };

  // TODO - remove
  changeTheme = (theme) => {
    this.setState({
      themeLoading: true,
    });
    this.props.changeTheme(theme);
  };

  render() {

    const userRole = this.state.userRole;

    const loginMenu = (
        <Menu className={'header-dropdown-menu'}>
          <Menu.Item>
            <NavLink to="/contact">
              <Icon type="phone"/> Kontakt
            </NavLink>
          </Menu.Item>
          {/*//TODO - accont settings*/}
          {/*<Menu.Item className={"header-dropdown-menu-item"}>*/}
          {/*  <NavLink to="/account">*/}
          {/*    <Icon type="setting"/> Ustawienia*/}
          {/*  </NavLink>*/}
          {/*</Menu.Item>*/}
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
            {userRole === 'ROLE_USER' ? [
              <div className="header-submenu" key={1}>
                <Link to={"/diary/today"}>
                  <Icon type="book" className={"icon"}/>
                  <h2>Dzienniczek</h2>
                </Link>
              </div>,
              <div className={"header-submenu"} key={2}>
                <Link to={"/diary/history"}>
                  <h2>Historia</h2>
                </Link>
              </div>] : ''}

            {(userRole === 'ADMIN' || userRole === 'ROLE_CLIENT')
                ? [
                  <div className="header-submenu" key={1}>
                    <Link to={"/diary/newest"}>
                      <Icon type="book" className={"icon"}/>
                      <h2>Najnowsze</h2>
                    </Link>
                  </div>,
                  <div className="header-submenu" key={2}>
                    <Link to={"/diary/users"}>
                      <Icon type="user" className={"icon"}/>
                      <h2>Użytkownicy</h2>
                    </Link>
                  </div>
                ] : ''}
            {userRole === 'ADMIN'
                ?
                <div className="header-submenu" key={3}>
                  <Link to={"/diary/excel"}>
                    <Icon type="solution" className={"icon"}/>
                    <h2>Excel</h2>
                  </Link>
                </div> : ''}
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
                {this.props.currentUser.userName}
              </div>
            </Dropdown>
          </div>
        </Header>
    );
  }
}

export default AppHeader;
