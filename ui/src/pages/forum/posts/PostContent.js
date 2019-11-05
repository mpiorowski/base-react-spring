import React, {Component} from 'react';
import moment from "moment";
import {Button, Comment, Divider, Dropdown, Icon, Menu, Tooltip} from "antd";
import ReactHtmlParser from "react-html-parser";
import './PostContent.less';

class PostContent extends Component {

  state = {
    hoverCommentId: null,
  };

  handleMouseHover = (postId) => {
    this.setState({
      hoverCommentId: postId,
    })
  };

  render() {

    const {openReplyArray} = this.props;
    const {hoverCommentId} = this.state;

    const post = this.props.post[1];

    let postCreated = moment(post.createdAt);
    let postUpdated = moment(post.updatedAt);
    let actions = [
      <span><Button type="link" size={"small"} onClick={() => this.props.replyPost(post)}>Odpowiedz</Button></span>
    ];

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
                {hoverCommentId === reply.uid ?
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
                      type="link"
                      onClick={() => this.props.closeReply(post.uid)}>Ukryj odpowiedzi ({repliesCount}) <Icon
                type="caret-up"/></Button>
            </span>
          );
        } else {
          actions.push(
            <span>
              <Button size={"small"}
                      type="link"
                      onClick={() => this.props.openReply(post.uid)}>Pokaż odpowiedzi ({repliesCount}) <Icon
                type="caret-down"/></Button>
            </span>
          );
        }
      }

      return (
        <div key={post.uid} id={post.uid} className={'post-content'}>
          {hoverCommentId === post.uid ?
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
  }
}

export default PostContent;
