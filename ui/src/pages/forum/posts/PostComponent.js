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

    console.log('submit', post);

    const topicUid = this.state.topicUid;
    const mapPosts = this.state.mapPosts;
    submitPost(post, topicUid, mapPosts).then(response => {

        let data = {
          uid: response,
          postContent: post.postContent,
          postAuthor: this.state.currentUser.userName,
          createdAt: moment.now(),
        };

        let newPosts;
        //reply
        if (post.replyUid) {
          newPosts = mapPosts.get(post.replyUid);
          newPosts.postReplies.push(data);
          mapPosts.set(post.replyUid, newPosts);
          this.openReply(post.replyUid);
        }
        //edit
        else if (post.uid) {
          data = {
            ...data,
            updatedAt: moment.now(),
          };
          mapPosts.set(response, data);
        }
        //new
        else {
          data = {
            ...data,
            postReplies: []
          };
          mapPosts.set(response, data);
          this.goToLast();
        }

        this.setState({
          mapPosts: mapPosts
        });
        this.handleDrawerVisible(false, {});

        // TODO - choose scrolling position
        const element = document.getElementById(response);
        if (element) {
          const elementRect = element.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.pageYOffset;
          // const middle = absoluteElementTop - (window.innerHeight / 2);
          window.scrollTo(0, absoluteElementTop);
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
        <Dropdown overlay={() => createDropdownMenu(topic)} placement="bottomRight" trigger={['click']}>
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
    const createDropdownMenu = (data) => {
      return (
        <Menu><Menu.Item onClick={() => this.editTopic(data)} key="1">Edytuj</Menu.Item></Menu>
      )
    };


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

