import React, {Component} from 'react';
import {Button, Col, Dropdown, Icon, List, Menu, Row} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faEye} from "@fortawesome/free-solid-svg-icons";
import "./TopicComponent.less";
import {NavLink} from "react-router-dom";
import {serviceAddTopic, serviceEditTopic, serviceGetTopics} from "../../../services/forum/ForumService";
import {WrappedTopicDrawer} from "./TopicDrawer";


class TopicComponent extends Component {

  state = {
    topics: [{
      uid: '',
      topicTitle: '',
      topicViews: '',
      postsCount: '',
    }],
    loading: true,
    categoryUid: null,
    category: null,
    drawerRecord: {},
    drawerType: '',
    paginationSize: null,
  };

  componentWillMount() {

    console.log(window.innerHeight);
    let paginationSize = Math.round((window.innerHeight - 280) / 60);
    console.log(paginationSize);

    const {match: {params}} = this.props;

    serviceGetTopics(params.categoryUid).then(response => {
      this.setState({
        topics: response.topics,
        category: response.category,
        loading: false,
        categoryUid: params.categoryUid,
        paginationSize: paginationSize
      });
    });
  }

  submitTopic = (data) => {
    console.log(data);
    return new Promise((resolve, reject) => {

          const categoryId = this.state.categoryId;
          const topicId = data.topicId || null;
          if (topicId === null) {
            const serviceData = {topicTitle: data.topicTitle, postContent: data.postContent};
            serviceAddTopic(categoryId, serviceData).then(response => {
              if (response) {
                this.setState({
                  topics: [{topicId: response, topicTitle: data.topicTitle}, ...this.state.topics]
                });
              }
              resolve(true);
            }).catch(error => {
              console.log(error);
              reject(false);
            });
          } else {
            const serviceData = {topicTitle: data.topicTitle};
            serviceEditTopic(categoryId, topicId, serviceData).then(response => {
              if (response) {
                let newTopicArray = [...this.state.topics];
                const index = newTopicArray.findIndex(item => response === item.topicId);
                const item = newTopicArray[index];
                const values = {topicId: response, topicTitle: data.topicTitle};
                newTopicArray.splice(index, 1, {
                  ...item,
                  ...values,
                });

                this.setState({
                  topics: newTopicArray,
                });
              }
              resolve(true);
            }).catch(error => {
              console.log(error);
              reject(false);
            });
          }
        }
    );
  };

  editTopic = (topic) => {
    this.handleDrawerVisible(true, topic, 'edit');
  };

  handleDrawerVisible = (flag, record, type) => {
    this.setState({
      drawerVisible: !!flag,
      drawerRecord: record || {},
      drawerType: type
    });
  };

  render() {

    const createDropdownMenu = (topic) => {
      return (
          <Menu>
            <Menu.Item onClick={() => this.editTopic(topic)} key="1">Edytuj</Menu.Item>
            {/*<Menu.Item key="2">Usuń</Menu.Item>*/}
          </Menu>
      )
    };

    return (
        <div>
          <List
              // bordered
              header={<div
                  className={"topic-header"}>{this.state.category ? this.state.category.categoryTitle : ''}</div>}
              dataSource={this.state.topics}
              loading={this.state.loading}
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: this.state.paginationSize,
              }}
              renderItem={topic => (
                  <List.Item className={"topic-list-item"}>

                    <Row gutter={16} type="flex" justify="space-between" style={{width: "100%"}}>
                      <Col span={14} md={14} xs={24} style={{margin: 'auto', marginLeft: 0}}>
                        <List.Item.Meta
                            title={<div className={"topic-title"}>
                              <NavLink
                                  to={"/forum/categories/" + this.state.categoryUid + "/topics/" + topic.uid + "/posts"}>
                                {topic.topicTitle}
                              </NavLink>
                            </div>}
                            description={<div className={"topic-description"}>Autor: Mateusz Piorowski | 24.03.2019
                              10:33</div>}
                        />
                      </Col>
                      <Col xl={5} md={4} sm={10} xs={0} style={{margin: "auto"}}>
                        <Col span={24}><FontAwesomeIcon icon={faComment}/> {topic.postsCount} postów</Col>
                        <Col span={24}><FontAwesomeIcon icon={faEye}/> {topic.topicViews} wyświetleń</Col>
                      </Col>

                      <Col xl={4} md={6} sm={0} xs={0} style={{margin: "auto"}}>
                        <div style={{fontSize: 12}}>
                          <div className={"topic-truncate"}>Najnowszy: Czy moglibysmy zaczac rozmowe na temat weqeq sd
                            dq wqeq eq eqe q
                          </div>
                          Autor: Mateusz Piórowski <br/>
                          Data: 24.03.2019, 14:30:33
                        </div>
                      </Col>
                      <Col xl={1} style={{margin: "auto"}}>
                        <Dropdown overlay={() => createDropdownMenu(topic)} placement="bottomRight">
                          <Button className={'topic-more-btn'}><Icon type="more"/></Button>
                        </Dropdown>
                      </Col>
                    </Row>
                  </List.Item>
              )}
          >
          </List>

          <WrappedTopicDrawer
              isTitle={true}
              isQuill={true}
              isChildrenDrawer={false}

              drawerTitle={'Dodaj nowy temat'}
              drawerPlaceholder={'Tytuł postu (maks 300 znaków)'}
              drawerVisible={this.state.drawerVisible}
              drawerRecord={this.state.drawerRecord}
              drawerType={this.state.drawerType}

              handleDrawerVisible={this.handleDrawerVisible}
              handleSubmit={this.submitTopic}
          />
        </div>

    );
  }
}

export default TopicComponent;
