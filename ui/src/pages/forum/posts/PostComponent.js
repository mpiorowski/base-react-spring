import React, {Component} from "react";
import {Button, Comment, Divider, Dropdown, Icon, List, Menu, Tooltip} from "antd";
import "./PostComponent.less";
import ReactHtmlParser from "react-html-parser";
import "react-quill/dist/quill.snow.css";
import {serviceGetPosts} from "../../../services/forum/ForumService";
import {WrappedPostDrawer} from "./PostDrawer";
import moment from "moment";

class PostComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
      loading: true,
      topicUid: props.match.params.topicUid,
      topicTitle: '',
      drawerRecord: {},
      drawerType: '',
      hoverCommentId: 0,
      currentUser: props.currentUser,
    }
  }


  componentDidMount() {

    const {match: {params}} = this.props;
    serviceGetPosts(params.topicUid).then(response => {
        console.log('post response', response);
        this.setState({
          posts: response.posts,
          topicTitle: response.topic.topicTitle,
          loading: false
        });
      }
    );
    console.log(this.state.currentUser);
  }

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

  handleMouseHover = (postId) => {
    this.setState({
      hoverCommentId: postId,
    })
  };

  createContent = (post) => {

    let postCreated = moment(post.createdAt);
    let postUpdated = moment(post.updatedAt);
    let actions = [
      <span><Button size={"small"} onClick={() => this.replyPost(post)}>Odpowiedz</Button></span>
    ];

    const {openReplyArray} = this.state;
    const author = <span className={'post-author'}>{post.postAuthor}</span>;
    const postDatetime =
      <div>
        <Tooltip title={postCreated.format('YYYY-MM-DD HH:mm:ss')}>
          <span>{postCreated.fromNow()}</span>
        </Tooltip>
        {postUpdated.isSame(postCreated) ? '' :
          <span> | <span
            className={'post-updated'}>Edytowano: {postUpdated.format('YYYY-MM-DD HH:mm:ss')}</span></span>
        }
      </div>;
    const createDropdownMenu = (post) => {
      return (
        <Menu>
          <Menu.Item onClick={() => this.editPost(post)} key="1">Edytuj</Menu.Item>
          {/*<Menu.Item key="2">Usuń</Menu.Item>*/}
        </Menu>
      )
    };
    let replies = [];
    if (post.postReplies !== undefined) {

      // const replies = replyArray.filter(item => post.postUid === item.replyId);
      const repliesCount = post.postReplies.length;

      if (repliesCount > 0) {
        if (openReplyArray.includes(post.uid)) {
          replies = post.postReplies.map(reply => {
            let replyCreated = moment(reply.createdAt);
            let replyUpdated = moment(reply.updatedAt);
            const replyDatetime =
              <div>
                <Tooltip title={replyCreated.format('YYYY-MM-DD HH:mm:ss')}>
                  <span>{replyCreated.fromNow()}</span>
                </Tooltip>
                {replyUpdated.isSame(replyCreated) ? '' :
                  <span> | <span
                    className={'post-updated'}>Edytowano: {replyUpdated.format('YYYY-MM-DD HH:mm:ss')}</span></span>
                }
              </div>;
            return (
              <div className={'post-reply-comment'} key={reply.uid} id={reply.uid}>
                {this.state.hoverCommentId === reply.uid ?
                  <Dropdown overlay={() => createDropdownMenu(reply)} placement="bottomRight">
                    <Button className={'post-more-btn'}><Icon type="more"/></Button>
                  </Dropdown> : ''
                }
                <Comment
                  author={author}
                  content={ReactHtmlParser(reply.postContent)}
                  datetime={replyDatetime}
                  onMouseEnter={() => this.handleMouseHover(reply.uid)}
                >
                </Comment>
              </div>)
          });
          actions.push(
            <span>
              <Button size={"small"}
                      onClick={() => this.closeReply(post.uid)}>Ukryj odpowiedzi ({repliesCount}) <Icon
                type="caret-up"/></Button>
            </span>
          );
        } else {
          actions.push(
            <span>
              <Button size={"small"}
                      onClick={() => this.openReply(post.uid)}>Pokaż odpowiedzi ({repliesCount}) <Icon
                type="caret-down"/></Button>
            </span>
          );
        }
      }

      return (
        <div key={post.uid} id={post.uid} className={'post-content'}>
          {this.state.hoverCommentId === post.uid ?
            <Dropdown overlay={() => createDropdownMenu(post)} placement="bottomRight">
              <Button className={'post-more-btn'}><Icon type="more"/></Button>
            </Dropdown> : ''
          }
          <Comment
            actions={actions}
            author={author}
            content={
              ReactHtmlParser(post.postContent)
            }
            datetime={postDatetime}
            className={'post-comment'}
            onMouseEnter={() => this.handleMouseHover(post.uid)}
            // onMouseLeave={() => this.handleMouseHover(0)}
          >
          </Comment>
          <div className={'post-reply'}>
            {replies}
          </div>
          <Divider style={{padding: 0, margin: 0}}/>
        </div>
      );
    }
    return '';
  };

  render() {
    return (
      <div>
        <List
          loading={this.state.loading}
          header={
            <div className={"post-header"}>
              {this.state.topicTitle}
            </div>
          }
          dataSource={this.state.posts}
          renderItem={post => (
            <li>
              {this.createContent(post)}
            </li>
          )}
        >
        </List>
        <WrappedPostDrawer
          isChildrenDrawer={true}
          isQuill={true}

          drawerTitle={'Dodaj nowy post'}
          drawerPlaceholder={'Tytuł postu (max 300 znaków)'}
          drawerVisible={this.state.drawerVisible}
          drawerRecord={this.state.drawerRecord}
          drawerType={this.state.drawerType}

          handleDrawerVisible={this.handleDrawerVisible}
          handleSubmit={this.submitPost}
        />
      </div>
    );
  }
}

export default PostComponent;

