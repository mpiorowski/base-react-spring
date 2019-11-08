import React, {Component} from "react";
import {Button, Dropdown, Icon, List, Menu} from "antd";
import "./PostComponent.less";
import "react-quill/dist/quill.snow.css";
import {serviceGetPosts} from "../../../services/forum/ForumService";
import PostContent from "./PostContent";
import {submitPost} from "./PostSubmit";
import * as moment from "moment";
import DrawerComponent from "../drawer/DrawerComponent";

class PostComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      loading: true,

      topicUid: props.match.params.topicUid,
      drawerData: {
        visibility: false,
        record: {},
        type: ''
      },

      topic: {},

      mapPosts: new Map(),
      response: {
        topic: {},
        posts: [{}],
      },
      openReplyArray: [],

      hoverCommentId: null,

      currentPage: 1,
      pageSize: 10,
    }
  }

  componentDidMount() {

    const {match: {params}} = this.props;
    serviceGetPosts(params.topicUid).then(response => {
        console.log('get posts', response);

        let mapPosts = new Map();
        let replies;

        response.posts.forEach(post => {
          replies = new Map();
          post.postReplies.forEach(reply => {
            replies.set(reply.uid, {...reply})
          });

          let data = {
            uid: post.uid,
            postContent: post.postContent,
            postAuthor: post.postAuthor,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            postReplies: replies
          };
          mapPosts.set(post.uid, data)
        });

        console.log('mapPosts', mapPosts);
        // console.log('replies', replies);

        this.setState({
          topic: response.topic,
          mapPosts: mapPosts,
          loading: false
        });
      }
    );
  }

  submitDrawer = (post) => {

    // return;

    const topicUid = this.state.topicUid;
    const mapPosts = this.state.mapPosts;
    submitPost(post, topicUid, mapPosts).then(postUid => {

      console.log(postUid);
      console.log(post);

        let data = {
          uid: postUid,
          postContent: post.postContent,
          postAuthor: this.state.currentUser.userName,
          createdAt: moment.now(),
        };

        let newPosts;
        //edit reply
        if (postUid && post.replyUid) {
          data = {
            ...data,
            updatedAt: moment.now(),
          };
          newPosts = mapPosts.get(post.replyUid).postReplies.set(postUid, data);
          // newPosts.postReplies.set(post.uid, data);
          // mapPosts.set(post.replyUid, data);
          this.openReply(post.replyUid);
        }
        //new reply
        else if (post.replyUid) {
          newPosts = mapPosts.get(post.replyUid);
          newPosts.postReplies.push(data);
          mapPosts.set(post.replyUid, newPosts);
          this.openReply(post.replyUid);
        }
        //edit post
        else {
          data = {
            ...data,
            postReplies: []
          };
          mapPosts.set(postUid, data);
          this.goToLast();
        }

        this.setState({
          mapPosts: newPosts
        });
        this.handleDrawerVisible(false, {});

        // TODO - choose scrolling position
        const element = document.getElementById(postUid);
        if (element) {
          const elementRect = element.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.pageYOffset;
          // const middle = absoluteElementTop - (window.innerHeight / 4);
          const middle = absoluteElementTop - 50;
          window.scrollTo(0, middle);
          // window.scrollTop(0);
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
  handleDrawerVisible = (flag, record, type) => {
    this.setState({
      drawerData: {
        visibility: !!flag,
        record: record || {},
        type: type,
      }
    });
  };
  replyPost = (post) => {
    const replyPost = {postUid: null, postContent: '', replyUid: post.uid};
    this.handleDrawerVisible(true, replyPost, 'replyPost');
  };
  editPost = (post) => {
    this.handleDrawerVisible(true, post, 'editPost');
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
  editTopic = (topic) => {
    this.handleDrawerVisible(true, topic, 'editTopic', 'Edytuj temat');
  };

  goToLast = () => {
    let {pageSize, mapPosts} = this.state;
    const current = Math.ceil(mapPosts.size / pageSize);
    this.setState({current: current});
  };

  render() {

    const {drawerData, topic, mapPosts, loading} = this.state;
    const {pageSize, currentPage} = this.state;

    const header =
      <div>
        <Dropdown overlay={
          <Menu><Menu.Item onClick={() => this.editTopic(topic)} key="1">Edytuj</Menu.Item></Menu>
        } placement="bottomRight" trigger={['click']}>
          <Button className={'post-more-btn'} type={'link'}><Icon type="more"/></Button>
        </Dropdown>
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
          dataSource={Array.from(mapPosts.values())}
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
          <div className="forum-floating-drawer-btn-initial" hidden={drawerData.visibility}
               onClick={() => this.handleDrawerVisible(true, {}, 'newPost')}
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

