import React, {Component} from 'react';
import {Col, Icon, List, Row, Skeleton} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";
import "./CategoriesComponent.less";
import {NavLink} from "react-router-dom";
import {serviceGetCategories} from "../../../services/forum/ForumService";
import * as htmlToText from "html-to-text";
import moment from "moment";
import DrawerComponent from "../drawer/DrawerComponent";
import {AuthContext} from "../../../App";

const {OrderedMap} = require('immutable');

class CategoriesComponent extends Component {

  state = {
    categories: OrderedMap(),
    loading: true,
    drawerData: {
      visibility: false,
      record: {},
      type: ''
    },
  };

  categoryLatestTopicUid;
  categoryTopicsNumber;
  categoryPostsNumber;
  categoryLatestPostDate;
  categoryLatestPostUid;
  categoryLatestTopic;

  componentDidMount() {
    serviceGetCategories().then(response => {
      console.log('categories get', response);
      let categoriesMap = OrderedMap();
      response.forEach(category => {
        categoriesMap = categoriesMap.set(category.uid, category);
      });
      this.setState({
        categories: categoriesMap,
        loading: false,
      });
    })
  }

  handleSubmitDrawer = (formData, response) => {
    let categoriesMap = this.state.categories;
    categoriesMap = categoriesMap.set(response.uid, response);
    this.setState({categories: categoriesMap});
    this.handleDrawerVisible(false);
  };

  handleDrawerVisible = (flag, record, type) => {
    this.setState({
      drawerData: {
        visibility: !!flag,
        record: record || {},
        type: type,
      }
    });
  };

  //TODO - add option to choose icon, dynamic pagination
  render() {
    const {categories, loading, drawerData} = this.state;

    return (
      <div>
        <div className={"cat-header"}>Kategorie</div>
        <List
          header={""}
          itemLayout="horizontal"
          loading={loading}
          dataSource={[...categories.values()]}
          renderItem={item => (

            <List.Item
              key={item.categoryTitle}
            >
              <Skeleton title={false} loading={loading} active>
                <Row gutter={16} type="flex" justify="space-between" style={{width: "100%"}} align="middle">
                  <Col span={14} style={{marginLeft: 0}}>
                    <List.Item.Meta
                      title={
                        <div style={{fontSize: 18}} className={"cat-topic-header"}>
                          <NavLink to={"/forum/categories/" + item.uid + "/topics"}>
                            <FontAwesomeIcon icon={item.categoryIcon} className={"cat-topic-icon"}/>
                            {item.categoryTitle}
                          </NavLink>
                        </div>
                      }
                      description={<div>{item.categoryDescription}</div>}

                    />
                  </Col>

                  <Col span={6}>
                    <Col span={24}><FontAwesomeIcon icon={"pencil-alt"}/> {item.categoryTopicsNumber || 0} tematy</Col>
                    <Col span={24}><FontAwesomeIcon icon={"comment"}/> {item.categoryPostsNumber || 0} postów</Col>
                  </Col>

                  <Col span={4}>

                    {item.categoryLatestPostDate
                      ? <span style={{fontSize: 12}}>
                        <NavLink
                          to={"/forum/categories/" + item.uid + "/topics/" + item.categoryLatestTopicUid + "/posts?latest=" + item.categoryLatestPostUid}>
                          {moment(item.categoryLatestPostDate).fromNow()}
                        </NavLink> w temacie:
                        <div className={"category-latest truncate"} style={{fontSize: 12}}>
                          {htmlToText.fromString(item.categoryLatestTopic, {uppercaseHeadings: false})}
                        </div>
                      </span>
                      : "Brak postów"
                    }
                  </Col>
                </Row>
              </Skeleton>
            </List.Item>

          )}
        />
        <AuthContext.Consumer>
          {currentUser => currentUser.userRoles.includes('ROLE_ADMIN')
            ? <div className="forum-floating-drawer plus" hidden={drawerData.visibility}
                   onClick={() => this.handleDrawerVisible(true, {}, 'newCategory')}
            >
              <Icon type="plus"/>
            </div>
            : ''}
        </AuthContext.Consumer>
        <DrawerComponent
          drawerData={drawerData}
          handleDrawerVisible={this.handleDrawerVisible}
          handleSubmitDrawer={this.handleSubmitDrawer}
        />
      </div>
    );
  }
}

export default CategoriesComponent;
