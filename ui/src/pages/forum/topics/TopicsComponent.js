import React, {Component} from 'react';
import {Button, Dropdown, Icon, Menu, Table} from "antd";
import "./TopicsComponent.less";
import {serviceGetTopics} from "../../../services/forum/ForumService";
import moment from "moment";
import {NavLink} from "react-router-dom";
import DrawerComponent from "../drawer/DrawerComponent";


class TopicsComponent extends Component {

  state = {
    topics: [{
      uid: '',
      topicTitle: '',
      topicViews: '',
      postsCount: '',
      latestPostUid: '',
      latestPostDate: ''
    }],
    loading: true,
    categoryUid: null,
    category: null,
    drawerRecord: {},
    drawerType: '',
    paginationSize: null,

    drawerData: {
      visibility: false,
      record: {},
      type: ''
    },

  };

  componentDidMount() {

    const {match: {params}} = this.props;
    let paginationSize = Math.round((window.innerHeight - 280) / 60);

    serviceGetTopics(params.categoryUid).then(response => {
      console.log('topics get', response);
      this.setState({
        topics: response.topics,
        category: response.category,
        loading: false,
        categoryUid: params.categoryUid,
        paginationSize: paginationSize
      });
    });
  }

  handleSubmitDrawer = (formData, response) => {
    const categoryUid = this.state.categoryUid;
    if (response) {
      this.props.history.push('/forum/categories/' + categoryUid + '/topics/' + response.uid + "/posts");
    }
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

  render() {

    const {category, categoryUid, topics, loading, drawerData} = this.state;

    const columns = [
        {
          title: 'Temat',
          dataIndex: 'topicTitle',
          key: 'topicTitle',
          width: '70%',
          sorter: (a, b) => a.topicTitle.localeCompare(b.topicTitle),
          render: (text, row, index) => {
            return <NavLink
              to={"/forum/categories/" + categoryUid + "/topics/" + row.uid + "/posts"}>{text}</NavLink>
          }
        },
        {
          title: 'Posty',
          dataIndex: 'postsCount',
          key: 'postsCount',
          align: 'center',
          sorter: (a, b) => a.postsCount - b.postsCount,
        },
        {
          title: 'Najnowszy',
          dataIndex: 'latestPostDate',
          key: 'newest',
          align: 'center',
          sorter: (a, b) => {
            let startDate = a.latestPostDate ? moment(a.latestPostDate) : moment(0);
            let endDate = b.latestPostDate ? moment(b.latestPostDate) : moment(0);
            return startDate.diff(endDate);
          },
          render: (text, row, index) => {
            return text
              ? <NavLink
                to={"/forum/categories/" + categoryUid + "/topics/" + row.uid + "/posts?latest=" + row.latestPostUid}>
                {moment(text).fromNow()}
              </NavLink>
              : 'Brak postów'
          }
        },
      ]
    ;

    return (
      <div>

        {/*//todo - edit category only for author*/}
        <div
          className={'cat-header'}>{category ? category.categoryTitle : ''}
          <Dropdown placement="bottomRight" trigger={['click']}
                    overlay={
                      <Menu><Menu.Item onClick={() => this.editCategory(category)} key="1">Edytuj</Menu.Item></Menu>
                    }
          >
            <Button className={'category-more-btn'} type={'link'}><Icon type="more"/></Button>
          </Dropdown>
        </div>

        <Table
          columns={columns}
          dataSource={topics}
          onChange={this.handleChange}
          size='middle'
          loading={loading}
          className={'topic-table'}
          rowKey={record => record.uid}
        />
        <div className="forum-floating-drawer plus" hidden={drawerData.visibility}
             onClick={() => this.handleDrawerVisible(true, {}, 'newTopic')}
        >
          <Icon type="plus"/>
        </div>
        <DrawerComponent
          drawerData={drawerData}
          categoryUid={categoryUid}

          handleDrawerVisible={this.handleDrawerVisible}
          handleSubmitDrawer={this.handleSubmitDrawer}
        />
      </div>

    );
  }
}

export default TopicsComponent;
