import React, {Component} from "react";
import {Button, Dropdown, Icon, List, Menu} from "antd";
import "./PostComponent.less";
import "react-quill/dist/quill.snow.css";
import {serviceGetPosts} from "../../../services/forum/ForumService";
import PostContent from "./PostContent";
import {submitForumDrawer} from "./PostSubmit";
import * as moment from "moment";
import DrawerComponent from "../drawer/DrawerComponent";
import {scrollToElementId} from "../../../utils/UtilsApp";

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

        // console.log('mapPosts', mapPosts);
        // console.log('replies', replies);

        this.setState({
          topic: response.topic,
          mapPosts: mapPosts,
          loading: false
        });
      }
    );
  }

  //TODO - optimize
  submitDrawer = (formData) => {

    const categoryUid = this.state.categoryUid;
    const topicUid = this.state.topicUid;
    const mapPosts = this.state.mapPosts;
    const postUid = formData.postUid;
    const replyUid = formData.replyUid;

    submitForumDrawer(formData, categoryUid, topicUid).then(response => {

        let data = {
          uid: response,
          postContent: formData.content,
          postAuthor: this.state.currentUser.userName,
        };
        //edit reply
        if (postUid && data.replyUid) {
          data = {
            ...data,
            createdAt: mapPosts.get(data.replyUid).postReplies.get(response).createdAt,
            updatedAt: moment().format("YYYY-MM-DDTHH:mm:ssZZ"),
          };
          mapPosts.get(replyUid).postReplies.set(response, data);
          this.openReply(replyUid);
        }
        //new reply
        else if (replyUid) {
          data = {
            ...data,
            createdAt: moment().format("YYYY-MM-DDTHH:mm:ssZZ"),
            updatedAt: moment().format("YYYY-MM-DDTHH:mm:ssZZ"),
          };
          mapPosts.get(replyUid).postReplies.set(response, data);
          this.openReply(replyUid);
        }
        //edit post
        else if (postUid) {
          data = {
            ...data,
            createdAt: mapPosts.get(postUid).createdAt,
            updatedAt: moment().format("YYYY-MM-DDTHH:mm:ssZZ"),
            postReplies: mapPosts.get(postUid).postReplies,
          };
          mapPosts.set(response, data);
        }
        //new post
        else {
          data = {
            ...data,
            createdAt: moment().format("YYYY-MM-DDTHH:mm:ssZZ"),
            updatedAt: moment().format("YYYY-MM-DDTHH:mm:ssZZ"),
            postReplies: new Map()
          };
          mapPosts.set(response, data);
          this.goToLast();
        }

        this.setState({
          mapPosts: mapPosts
        });
        this.handleDrawerVisible(false, {});
        scrollToElementId(response);
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
  editTopic = (topic) => {
    this.handleDrawerVisible(true, topic, 'editTopic');
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

