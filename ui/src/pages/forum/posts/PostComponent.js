import React, {Component} from "react";
import {Icon, List} from "antd";
import "./PostComponent.less";
import "react-quill/dist/quill.snow.css";
import {serviceGetPosts} from "../../../services/forum/ForumService";
import {WrappedPostDrawer} from "./PostDrawer";
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
      drawerRecord: {},

      topic: {},

      mapPosts: new Map(),
      response: {
        topic: {},
        posts: [{}],
      },
      openReplyArray: [],

      hoverCommentId: null,

      current: 1,
      pageSize: 3,
    }
  }

  componentDidMount() {

    const {match: {params}} = this.props;
    serviceGetPosts(params.topicUid).then(response => {
        console.log('get posts', response);

        let mapPosts = new Map();

        response.posts.forEach(post => {
          mapPosts.set(post.uid, {...post})
        });

        console.log('mapPosts', mapPosts);

        this.setState({
          topic: response.topic,
          mapPosts: mapPosts,
          loading: false
        });
      }
    );
  }

  submitDrawer = (post) => {
    const topicUid = this.state.topicUid;
    const mapPosts = this.state.mapPosts;
    submitPost(post, topicUid, mapPosts).then(response => {

        let data = {
          uid: response,
          postContent: post.postContent,
          postAuthor: this.state.currentUser.userName,
          createdAt: moment.now(),
          updatedAt: moment.now()
        };

        let newPosts;
        if (post.replyUid) {
          newPosts = mapPosts.get(post.replyUid);
          newPosts.postReplies.push(data);
          mapPosts.set(post.replyUid, newPosts);
          this.openReply(post.replyUid);
        } else {
          data = {
            ...data,
            postReplies: []
          };
          mapPosts.set(response, data);
        }

        console.log('mapPosts', mapPosts);

        this.setState({
          mapPosts: mapPosts
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
    console.log(post);
    this.handleDrawerVisible(true, post, 'edit', 'Edytuj komentarz');
  };

  handleMouseHover = (postId) => {
    this.setState({
      hoverCommentId: postId,
    })
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
              {this.state.topic.topicTitle}
              <div className={"post-header-description"}>
                {this.state.topic.topicDescription}
              </div>
            </div>
          }
          dataSource={Array.from(this.state.mapPosts.values())}
          pagination={{
            position: 'both',
            pageSize: 3,
            size: 'small',
            // pageSize: this.state.pageSize,
            // total: this.state.mapPosts.size,
            current: this.state.current,
            onChange: this.onPaginationChange
          }}
          renderItem={post => (
            <li>
              <PostContent
                post={post}
                editPost={this.editPost}
                openReply={this.openReply}
                closeReply={this.closeReply}
                replyPost={this.replyPost}
                handleMouseHover={this.handleMouseHover}
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
          <WrappedPostDrawer
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

