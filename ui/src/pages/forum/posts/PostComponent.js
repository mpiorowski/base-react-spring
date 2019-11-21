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
  postReply;

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
        createdAt: '',
        updatedAt: '',
        topicAuthor: {}
      },

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
    const search = new URLSearchParams(this.props.location.search);

    serviceGetPosts(params.topicUid).then(response => {
        console.log('posts get', response);

        let mapPosts = new Map();
        let mapReplies = new Map();
        let postReplies = new Map();

        response.posts.forEach(post => {
          if (post.postReply) {
            if (!postReplies.get(post.postReply)) {
              postReplies.set(post.postReply, []);
            }
            postReplies.get(post.postReply).push(post.uid);
            mapReplies.set(post.uid, post);
          } else {
            mapPosts.set(post.uid, post);
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

  //TODO - optimize
  submitDrawer = (formData) => {

    const categoryUid = this.state.categoryUid;
    const topicUid = this.state.topicUid;
    const mapPosts = this.state.mapPosts;
    const postUid = formData.postUid;
    const replyUid = formData.replyUid;

    submitForumDrawer(formData, categoryUid, topicUid).then(response => {
        console.log('posts submit', response);
        //edit topic
        if (formData.title) {
          this.setState({
            topic: {...response}
          });
        } else {

          let data = {
            uid: response,
            postContent: formData.content,
            postAuthor: this.state.currentUser.userName,
          };

          //edit reply
          if (postUid && replyUid) {
            data = {
              ...data,
              createdAt: mapPosts.get(replyUid).postReplies.get(response).createdAt,
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
        }

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
    const data = {postUid: null, postContent: '', replyUid: post.uid};
    this.handleDrawerVisible(true, data, 'replyPost');
  };
  editPost = (post) => {
    const data = {uid: post.uid, content: post.postContent,}
    this.handleDrawerVisible(true, data, 'editPost');
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
          <div className="forum-floating-drawer plus" hidden={drawerData.visibility}
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

