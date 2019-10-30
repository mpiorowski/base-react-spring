import React, {Component} from "react";
import {List} from "antd";
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
          postReplies: [{
            uid: '',
            postContent: '',
            postAuthor: '',
            createdAt: '',
            updatedAt: '',
          }]
        };
        console.log(this.state.posts);
        this.state.posts.unshift(data);
        this.setState({
          posts: this.state.posts
        });
        this.handleDrawerVisible(false, {});
        //
        // const element = document.getElementById(response);
        // const elementRect = element.getBoundingClientRect();
        // const absoluteElementTop = elementRect.top + window.pageYOffset;
        // const middle = absoluteElementTop - (window.innerHeight / 2);
        // window.scrollTo(0, middle);
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

  handleDrawerVisible = (flag, record, type) => {
    this.setState({
      drawerVisible: !!flag,
      drawerRecord: record || {},
      drawerType: type
    });
  };

  replyPost = (post) => {
    const replyPost = {postId: null, postContent: '', replyId: post.postId};
    this.handleDrawerVisible(true, replyPost, 'reply');
  };

  editPost = (post) => {
    this.handleDrawerVisible(true, post, 'edit');
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
          renderItem={post => (
            <li>
              <PostContent post={post} {...this.state}/>
            </li>
          )}
        >
        </List>
        <WrappedForumDrawer
          drawerTitle={'Dodaj nowy komentarz'}
          drawerPlaceholder={'Komentarz (maks 300 znaków)'}
          drawerVisible={drawerVisible}
          drawerRecord={drawerRecord}
          drawerType={'post'}

          handleDrawerVisible={this.handleDrawerVisible}
          submitDrawer={this.submitDrawer}
        />
      </div>
    );
  }
}

export default PostComponent;

