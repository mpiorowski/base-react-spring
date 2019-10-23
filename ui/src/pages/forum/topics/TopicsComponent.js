import React, {Component} from 'react';
import {Table} from "antd";
import "./TopicsComponent.less";
import {serviceAddTopic, serviceEditTopic, serviceGetTopics} from "../../../services/forum/ForumService";
import moment from "moment";
import {WrappedForumDrawer} from "../common/ForumDrawer";


class TopicsComponent extends Component {

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

  componentDidMount() {

    console.log(window.innerHeight);
    let paginationSize = Math.round((window.innerHeight - 280) / 60);
    console.log(paginationSize);

    const {match: {params}} = this.props;

    serviceGetTopics(params.categoryUid).then(response => {
      console.log(response);
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

  handleDrawerVisible = (flag, record, type) => {
    this.setState({
      drawerVisible: !!flag,
      drawerRecord: record || {},
      drawerType: type
    });
  };

  render() {

    const {category, topics, loading, drawerVisible, drawerRecord, drawerType} = this.state;

    const columns = [
        {
          title: 'Temat',
          dataIndex: 'topicTitle',
          key: 'topicTitle',
          sorter: (a, b) => a.topicTitle.localeCompare(b.topicTitle),
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
          dataIndex: 'newestPost.newestDate',
          key: 'newest',
          align: 'center',
          sorter: (a, b) => {
            let startDate = a.newestPost ? moment(a.newestPost.newestDate) : moment(0);
            let endDate = b.newestPost ? moment(b.newestPost.newestDate) : moment(0);
            return startDate.diff(endDate);
          },
          render: (text, row, index) => {
            return text ? moment(text).fromNow() : 'Brak postów'
          }
        },
      ]
    ;

    return (
      <div>

        <div
          className={"topic-header"}>{category ? category.categoryTitle : ''}
        </div>

        <Table columns={columns} dataSource={topics} onChange={this.handleChange} size="middle" loading={loading}/>

        <WrappedForumDrawer
          isTitle={true}
          isQuill={true}
          isChildrenDrawer={false}

          drawerTitle={'Dodaj nowy temat'}
          drawerPlaceholder={'Temat (maks 300 znaków)'}
          drawerVisible={drawerVisible}
          drawerRecord={drawerRecord}
          drawerType={'topic'}

          handleDrawerVisible={this.handleDrawerVisible}
          handleSubmit={this.submitTopic}
        />
      </div>

    );
  }
}

export default TopicsComponent;
