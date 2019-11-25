import React, {Component} from "react";
import {Button, Dropdown, Icon, List, Menu} from "antd";
import "./PostComponent.less";
import "react-quill/dist/quill.snow.css";
import {serviceGetPosts} from "../../../services/forum/ForumService";
import PostContent from "./PostContent";
import * as moment from "moment";
import {submitForumDrawer} from "../drawer/DrawerSubmit";
import DrawerComponent from "../drawer/DrawerComponent";
import {scrollToElementId} from "../../../utils/UtilsApp";

const {OrderedMap} = require('immutable');

class PostComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      loading: true,

      categoryUid: props.match.params.categoryUid,
      topicUid: props.match.params.topicUid,
      drawerData: {
        visibility: false,
        record: {},
        type: ''
      },

      topic: {
        topicTitle: '',
        topicDescription: '',
        topicAuthor: {},
        createdAt: '',
        updatedAt: ''
      },

      response: {
        topic: {},
        posts: [],
      },
      openReplyArray: [],

      mapPosts: OrderedMap(),
      mapReplies: OrderedMap(),
      postReplies: OrderedMap(),

      hoverCommentId: null,

      currentPage: 1,
      pageSize: 10,
    }
  }

  componentDidMount() {

    const {match: {params}} = this.props;
    const search = new URLSearchParams(this.props.location.search);

    serviceGetPosts(params.topicUid).then(response => {
        console.log('posts get', response);

        let mapPosts = OrderedMap();
        let mapReplies = OrderedMap();
        let postReplies = OrderedMap();

        response.posts.forEach(post => {
          if (post.replyUid) {
            if (!postReplies.get(post.replyUid)) {
              postReplies = postReplies.set(post.replyUid, []);
            }
            postReplies.get(post.replyUid).push(post.uid);
            mapReplies = mapReplies.set(post.uid, post);
          } else {
            mapPosts = mapPosts.set(post.uid, post);
          }
        });

        this.setState({
          topic: response.topic,
          mapPosts: mapPosts,
          mapReplies: mapReplies,
          postReplies: postReplies,
          loading: false
        });

        //TODO - open reply
        if (search.get('latest')) {
          this.goToLast();
          scrollToElementId(search.get('latest'));
        }
      }
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('update');
  }

  //TODO - optimize
  submitDrawer = (formData) => {

    let {categoryUid, topicUid, mapPosts, mapReplies, postReplies} = this.state;

    let newMapPosts, newMapReplies, newPostReplies;

    submitForumDrawer(formData, categoryUid, topicUid).then(response => {

        switch (formData.type) {
          case 'newPost': {
            if (formData.replyUid) {
              if (!postReplies.get(formData.replyUid)) {
                newPostReplies = postReplies.set(formData.replyUid, []);
              } else {
                newPostReplies = postReplies;
              }
              newPostReplies = newPostReplies.set(
                formData.replyUid, newPostReplies.get(formData.replyUid).concat([response.uid])
              );
              newMapReplies = mapReplies.set(response.uid, response);
              this.setState({
                postReplies: newPostReplies,
                mapReplies: newMapReplies,
              });
              this.openReply(formData.replyUid);
            } else {
              newMapPosts = mapPosts.set(response.uid, response);
              this.goToLast();
              this.setState({
                mapPosts: newMapPosts,
              });
            }
            break;
          }
          case 'editPost': {
            newMapPosts = mapPosts.set(response.uid, response);
            this.setState({
              mapPosts: newMapPosts,
            });
            break;
          }
        }
        this.handleDrawerVisible(false, {});
        scrollToElementId(response.uid);
      }
    );
  };

  openReply = (uid) => {
    let newOpenReplyArray = this.state.openReplyArray.concat(uid);
    this.setState({
      openReplyArray: newOpenReplyArray
    })
  };
  closeReply = (uid) => {
    let openReplyArray = this.state.openReplyArray;
    let filtered = openReplyArray.filter(value => value !== uid);
    this.setState({
      openReplyArray: filtered
    })
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

  newPost = (replyUid) => {
    const data = {uid: null, replyUid: replyUid || null, content: ''};
    this.handleDrawerVisible(true, data, 'newPost');
  };
  newReply = (post) => {
    const data = {uid: post.uid, content: ''};
    this.handleDrawerVisible(true, data, 'newReply');
  };
  editPost = (post) => {
    const data = {uid: post.uid, content: post.postContent,};
    this.handleDrawerVisible(true, data, 'editPost');
  };
  editReply = (post) => {
    const data = {uid: post.uid, content: post.postContent,};
    this.handleDrawerVisible(true, data, 'editReply');
  };
  editTopic = (topic) => {
    const data = {uid: topic.uid, title: topic.topicTitle, content: topic.topicDescription};
    this.handleDrawerVisible(true, data, 'editTopic');
  };

  handleMouseHover = (postId) => {
    this.setState({
      hoverCommentId: postId,
    })
  };
  onPaginationChange = (page, pageSize) => {
    window.scrollTo(0, 0);
    this.setState({currentPage: page});
  };

  goToLast = () => {
    let {pageSize, mapPosts} = this.state;
    const currentPage = Math.ceil(mapPosts.size / pageSize);
    this.setState({currentPage: currentPage});
  };

  render() {

    const {drawerData, topic, mapPosts, loading, currentUser} = this.state;
    const {pageSize, currentPage} = this.state;

    let topicCreated = moment(topic.createdAt);
    let topicUpdated = moment(topic.updatedAt);
    const topicDatetime =
      <div>
        Autor: {topic.topicAuthor.userName} |
        Stworzono: {topicCreated.format('YYYY-MM-DD HH:mm:ss')}
        {topicUpdated.isSame(topicCreated) ? '' :
          <span> | <span
            className={'topic-updated'}>Edytowano: {topicUpdated.format('YYYY-MM-DD HH:mm:ss')}</span></span>
        }
      </div>;
    const header =
      <div>

        {currentUser.userName === topic.topicAuthor.userName
          ? <Dropdown placement="bottomRight" trigger={['click']}
                      overlay={
                        <Menu><Menu.Item onClick={() => this.editTopic(topic)} key="1">Edytuj</Menu.Item></Menu>
                      }
          >
            <Button className={'post-more-btn'} type={'link'}><Icon type="more"/></Button>
          </Dropdown>
          : ''}

        <div className={"topic-datetime"}>{topicDatetime}</div>
        <div className={"post-header"}>
          {topic.topicTitle}
          <div className={"post-header-description"}>
            {topic.topicDescription}
          </div>
        </div>
      </div>
    ;

    return (
      <div>
        <List
          locale={{emptyText: 'Brak wpisów'}}
          loading={loading}
          header={header}
          dataSource={[...mapPosts.values()]}
          pagination={{
            position: 'both',
            size: 'small',
            pageSize: pageSize,
            total: mapPosts.size,
            current: currentPage,
            onChange: this.onPaginationChange
          }}
          renderItem={post => (
            <li>
              <PostContent
                post={post}
                newPost={this.newPost}
                editPost={this.editPost}
                editReply={this.editReply}
                openReply={this.openReply}
                closeReply={this.closeReply}
                newReply={this.newReply}
                handleMouseHover={this.handleMouseHover}
                {...this.state}
              />
            </li>
          )}
        >
        </List>
        <div>
          <div className="forum-floating-drawer plus" hidden={drawerData.visibility}
               onClick={() => this.newPost(null)}
          >
            <Icon type="plus"/>
          </div>
          <DrawerComponent
            drawerData={drawerData}

            handleDrawerVisible={this.handleDrawerVisible}
            submitDrawer={this.submitDrawer}
          />
        </div>
      </div>
    );
  }
}

export default PostComponent;

