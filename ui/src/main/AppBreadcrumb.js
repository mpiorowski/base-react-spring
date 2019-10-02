import React, {Component} from 'react';
import {Breadcrumb, Icon} from "antd";
import {NavLink} from "react-router-dom";
import "./AppBreadcrumb.less";

class AppBreadcrumb extends Component {

  render() {

    const {location, breadcrumbs} = this.props;
    const pathSnippets = location.pathname.split('/').filter(i => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index, arr) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      if (breadcrumbs[url] !== '' && breadcrumbs[url] !== undefined) {
        if (arr.length - 1 === index) {
          return (
              <Breadcrumb.Item key={url}>
                <span>
                  {breadcrumbs[url]}
                </span>
              </Breadcrumb.Item>
          );
        } else {
          return (
              <Breadcrumb.Item key={url}>
                <NavLink to={url}>
                  {breadcrumbs[url]}
                </NavLink>
              </Breadcrumb.Item>
          );
        }
      }
      return "";

    });
    const breadcrumbItems = [(
        <Breadcrumb.Item key="home">
          <NavLink to="/"><Icon type="home"/> Strona główna</NavLink>
        </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);

    return (
        <div className={'header-breadcrumb'}>
          <Breadcrumb>
            {breadcrumbItems}
          </Breadcrumb>
        </div>
    );

  }
}
export default AppBreadcrumb;
