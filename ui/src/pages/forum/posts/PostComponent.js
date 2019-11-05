import React, {Component} from "react";
import {Icon, List} from "antd";
import "./PostComponent.less";
import "react-quill/dist/quill.snow.css";
import {serviceGetPosts} from "../../../services/forum/ForumService";
import {WrappedForumDrawer} from "../common/ForumDrawer";
import PostContent from "./PostContent";
import {submitPost} from "./PostSubmit";
import * as moment from "moment";

class PostComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      loading: true,

      topicUid: props.match.params.topicUid,
      topicTitle: '',
      drawerRecord: {},

      posts: [{
        uid: '',
        postContent: '',
        postAuthor: '',
        createdAt: '',
        updatedAt: '',
        postReplies: [{
          uid: '',
          postContent: '',
          postAuthor: '',
          createdAt: '',
          updatedAt: '',
        }]
      }],
      response: {
        topic: {},
        posts: [{}],
      },
      openReplyArray: [],

      current: 1,
      pageSize: 3,
    }
  }

  componentDidMount() {

    const {match: {params}} = this.props;
    serviceGetPosts(params.topicUid).then(response => {
        console.log('post response', response);
        this.setState({
          topicTitle: response.topic.topicTitle,
          topicDescription: response.topic.topicDescription,
          posts: response.posts,
          loading: false
        });
      }
    );
  }

  submitDrawer = (postContent) => {
    const topicUid = this.state.topicUid;
    submitPost(postContent, topicUid).then(response => {
        console.log(postContent);
        const data = {
          uid: response,
          postContent: postContent.content,
          postAuthor: this.state.currentUser.userName,
          createdAt: moment.now(),
          updatedAt: moment.now(),
          replyUid: postContent.replyUid || null,
          postReplies: []
        };
        console.log(this.state.posts);
        this.state.posts.push(data);
        this.setState({
          posts: this.state.posts
        });
        this.handleDrawerVisible(false, {});

        const element = document.getElementById(response);
        if (element) {
          const elementRect = element.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.pageYOffset;
          const middle = absoluteElementTop - (window.innerHeight / 2);
          window.scrollTo(0, middle);
        }
      }
    );
  };

  openReply = (uid) => {
    let openReplyArray = this.state.openReplyArray;
    openReplyArray.push(uid);
    this.setState({
      openReplyArray: openReplyArray
    })
  };
  closeReply = (uid) => {
    let openReplyArray = this.state.openReplyArray;
    let filtered = openReplyArray.filter(value => value !== uid);
    this.setState({
      openReplyArray: filtered
    })
  };

  handleDrawerVisible = (flag, record, type, title) => {
    this.setState({
      drawerVisible: !!flag,
      drawerRecord: record || {},
      drawerType: type,
      drawerTitle: title,
    });
  };

  replyPost = (post) => {
    const replyPost = {postUid: null, postContent: '', replyUid: post.uid};
    this.handleDrawerVisible(true, replyPost, 'reply', 'Odpowiedz na komentarz');
  };

  editPost = (post) => {
    this.handleDrawerVisible(true, post, 'edit');
  };

  onPaginationChange = (page, pageSize) => {
    this.setState({current: page});
  };

  render() {

    const {drawerVisible, drawerRecord} = this.state;

    return (
      <div>
        <List
          loading={this.state.loading}
          header={
            <div className={"post-header"}>
              {this.state.topicTitle}
              <div className={"post-header-description"}>
                {this.state.topicDescription}
              </div>
            </div>
          }
          dataSource={this.state.posts}
          pagination={{
            position: 'both',
            pageSize: this.state.pageSize,
            size: 'small',
            current: this.state.current,
            onChange: this.onPaginationChange
          }}
          renderItem={post => (
            <li>
              <PostContent
                post={post}
                openReply={this.openReply}
                closeReply={this.closeReply}
                replyPost={this.replyPost}
                {...this.state}
              />
            </li>
          )}
        >
        </List>
        <div>
          <div className="forum-floating-drawer-btn-initial" hidden={drawerVisible}
               onClick={() => this.handleDrawerVisible(true, {}, 'new', 'Dodaj nowy komentarz')}
          >
            <Icon type="plus"/>
          </div>
          <WrappedForumDrawer
            drawerTitle={this.state.drawerTitle}
            drawerPlaceholder={'Komentarz (maks 300 znaków)'}
            drawerVisible={drawerVisible}
            drawerRecord={drawerRecord}
            drawerType={'post'}

            handleDrawerVisible={this.handleDrawerVisible}
            submitDrawer={this.submitDrawer}
          />
        </div>
      </div>
    );
  }
}

export default PostComponent;

