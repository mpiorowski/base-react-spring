import React, {Component} from 'react';
import {Icon, Table} from "antd";
import "./TopicsComponent.less";
import {serviceAddTopic, serviceGetTopics} from "../../../services/forum/ForumService";
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
      type: 'newTopic'
    },

  };

  componentDidMount() {

    const {match: {params}} = this.props;
    let paginationSize = Math.round((window.innerHeight - 280) / 60);

    serviceGetTopics(params.categoryUid).then(response => {
      console.log('topic response', response);
      this.setState({
        topics: response.topics,
        category: response.category,
        loading: false,
        categoryUid: params.categoryUid,
        paginationSize: paginationSize
      });
    });
  }

  submitDrawer = (data) => {
    const categoryUid = this.state.categoryUid;
    const topicData = {topicTitle: data.title, topicDescription: data.content};
    serviceAddTopic(categoryUid, topicData).then(response => {
      if (response) {
        this.props.history.push('/forum/categories/' + categoryUid + '/topics/' + response.topicUid + "/posts");
      }
    }).catch(error => {
      console.log(error);
    });
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

    const {category, topics, loading, drawerData} = this.state;

    const columns = [
        {
          title: 'Temat',
          dataIndex: 'topicTitle',
          key: 'topicTitle',
          width: '70%',
          sorter: (a, b) => a.topicTitle.localeCompare(b.topicTitle),
          render: (text, row, index) => {
            return <NavLink
              to={"/forum/categories/" + this.state.categoryUid + "/topics/" + row.uid + "/posts"}>{text}</NavLink>
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
                to={"/forum/categories/" + this.state.categoryUid + "/topics/" + row.uid + "/posts?latest=" + row.latestPostUid}>
                {moment(text).fromNow()}
              </NavLink>
              : 'Brak postów'
          }
        },
      ]
    ;

    return (
      <div>

        <div
          className={'cat-header'}>{category ? category.categoryTitle : ''}

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
          handleDrawerVisible={this.handleDrawerVisible}
          submitDrawer={this.submitDrawer}
        />
      </div>

    );
  }
}

export default TopicsComponent;
