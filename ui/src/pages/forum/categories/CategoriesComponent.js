import React, {Component} from 'react';
import {Col, Icon, List, Row, Skeleton} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";
import {faBullhorn, faComment, faPencilAlt} from "@fortawesome/free-solid-svg-icons/index";
import "./CategoriesComponent.less";
import {NavLink} from "react-router-dom";
import {serviceGetCategories} from "../../../services/forum/ForumService";
import * as htmlToText from "html-to-text";
import moment from "moment";
import DrawerComponent from "../drawer/DrawerComponent";

class CategoriesComponent extends Component {

  state = {
    categories: [{
      uid: '',
      categoryTitle: '',
      categoryDescription: '',
      categoryTopicsNumber: '',
      categoryPostsNumber: '',
      categoryLatestTopicUid: '',
      categoryLatestTopic: '',
      categoryLatestPostUid: '',
      categoryLatestPost: '',
      categoryLatestPostAuthor: '',
      categoryLatestPostDate: '',
    }],
    loading: true,
    drawerData: {
      visibility: false,
      record: {},
      type: ''
    },
  };

  componentDidMount() {
    serviceGetCategories().then(response => {
      console.log('category response', response);
      this.setState({
        categories: response,
        loading: false,
      });
    })
  }

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
          // pagination={{
          //   onChange: (page) => {
          //     console.log(page);
          //   },
          //   pageSize: 16,
          // }}
          dataSource={categories}
          renderItem={item => (

            <List.Item
              key={item.categoryTitle}
            >
              <Skeleton title={false} loading={loading} active>
                <Row gutter={16} type="flex" justify="space-between" style={{width: "100%"}}>
                  <Col span={14} style={{margin: 'auto', marginLeft: 0}}>
                    <List.Item.Meta
                      title={
                        <div style={{fontSize: 18}} className={"cat-topic-header"}>
                          <NavLink to={"/forum/categories/" + item.uid + "/topics"}><FontAwesomeIcon
                            icon={faBullhorn}
                            className={"cat-topic-icon"}/> {item.categoryTitle}
                          </NavLink>
                        </div>
                      }
                      description={<div>{item.categoryDescription}</div>}

                    />
                  </Col>

                  <Col span={6} style={{margin: "auto"}}>
                    <Col span={24}><FontAwesomeIcon icon={faPencilAlt}/> {item.categoryTopicsNumber || 0} tematy</Col>
                    <Col span={24}><FontAwesomeIcon icon={faComment}/> {item.categoryPostsNumber || 0} postów</Col>
                  </Col>

                  <Col span={4} style={{margin: "auto"}}>

                    {item.categoryLatestPostDate
                      ? <span style={{fontSize: 12}}>
                        <NavLink
                          to={"/forum/categories/" + item.uid + "/topics/" + item.categoryLatestTopicUid + "/posts?latest=" + item.categoryLatestPostUid}>
                          {moment(item.categoryLatestPostDate).fromNow()}
                        </NavLink> w temacie:
                        <div className={"truncate"} style={{fontSize: 12}}>
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
        <div className="forum-floating-drawer plus" hidden={drawerData.visibility}
             onClick={() => this.handleDrawerVisible(true, {}, 'newCategory')}
        >
          <Icon type="plus"/>
        </div>
        <DrawerComponent
          drawerData={drawerData}
          handleDrawerVisible={this.handleDrawerVisible}
          submitDrawer={this.submitDrawer}
        />
      </div>
    );
  }
}

export default CategoriesComponent;
