import React, {useEffect, useState} from "react";
import {Button, Dropdown, Icon, List, Menu} from "antd";
import "./PostComponent.less";
import "react-quill/dist/quill.snow.css";
import {serviceGetPosts} from "../../../services/forum/ForumService";
import PostContent from "./PostContent";
import * as moment from "moment";
import DrawerComponent from "../drawer/DrawerComponent";
import {scrollToElementId} from "../../../utils/UtilsApp";
import {breadcrumbNameMap} from "../../../config/BreadcrumbsConfig";
import {useBreadcrumbsState} from "../../../context/GlobalContext";

const {OrderedMap} = require('immutable');

const PostComponent = (props) => {

  const {setBreadcrumbs} = useBreadcrumbsState();

  const [categoryUid, setCategoryUid] = useState(props.match.params.categoryUid);
  const [topicUid, setTopicUid] = useState(props.match.params.topicUid);
  const [loading, setLoading] = useState(true);
  const [drawerData, setDrawerData] = useState({
    visibility: false,
    record: {},
    type: '',
  });
  const [topic, setTopic] = useState({topicCreated: null, topicUpdated: null, topicAuthor: {userName: null}});

  const [mapPosts, setMapPosts] = useState(OrderedMap());
  const [mapReplies, setMapReplies] = useState(OrderedMap());
  const [postReplies, setPostReplies] = useState(OrderedMap());
  const [openReplyArray, setOpenReplyArray] = useState([]);
  const [hoverCommentId, setHoverCommentId] = useState(null);

  const [pageSize, setPageSize] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  //todo - change to authContext
  const [currentUser, setCurrentUser] = useState(props.currentUser);

  useEffect(() => {
    const {match: {params}} = props;
    const search = new URLSearchParams(props.location.search);

    serviceGetPosts(params.topicUid).then(response => {
        console.log('posts get', response);

        let newPostReplies = OrderedMap();
        let newMapPosts = OrderedMap();

        response.posts.forEach(post => {
          if (post.replyUid) {
            if (!newPostReplies.get(post.replyUid)) {
              newPostReplies = newPostReplies.set(post.replyUid, []);
            }
            newPostReplies.get(post.replyUid).push(post.uid);
          }
          newMapPosts = newMapPosts.set(post.uid, post);
        });

        addBreadcrumbs(response.category, response.topic);

        setTopic(response.topic);
        setMapPosts(newMapPosts);
        setPostReplies(newPostReplies);
        setLoading(false);

        console.log(newMapPosts.values());

        //TODO - open reply
        if (search.get('latest')) {
          goToLast();
          scrollToElementId(search.get('latest'));
        }
      }
    );
  }, []);

  const addBreadcrumbs = (categoryData, topicData) => {
    let newBreadcrumbs = {};
    newBreadcrumbs['/forum/categories/' + categoryData.uid + '/topics'] = categoryData.categoryTitle;
    newBreadcrumbs['/forum/categories/' + categoryData.uid + '/topics/' + topicData.uid + '/posts'] = topicData.topicTitle;
    console.log(newBreadcrumbs);
    newBreadcrumbs = {...breadcrumbNameMap, ...newBreadcrumbs};
    setBreadcrumbs(newBreadcrumbs);
  };


  //TODO - optimize
  const handleSubmitDrawer = (formData, response) => {

    let newMapPosts, newPostReplies;

    switch (formData.type) {

      case 'editTopic': {
        setTopic(response);
        break;
      }

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
          newMapPosts = mapPosts.set(response.uid, response);

          setPostReplies(newPostReplies);
          setMapPosts(newMapPosts);

          openReply(formData.replyUid);
        } else {
          newMapPosts = mapPosts.set(response.uid, response);

          setMapPosts(newMapPosts);

          goToLast();
        }
        scrollToElementId(response.uid);
        break;
      }

      case 'editPost': {
        newMapPosts = mapPosts.set(response.uid, response);

        setMapPosts(newMapPosts);

        scrollToElementId(response.uid);
        break;
      }
      default:
        throw new Error('Something is wrong with post submit type');

    }
    handleDrawerVisible(false, {});

  };

  const openReply = (uid) => {
    let newOpenReplyArray = openReplyArray.concat(uid);
    setOpenReplyArray(newOpenReplyArray);
  };

  const closeReply = (uid) => {
    let filtered = openReplyArray.filter(value => value !== uid);
    setOpenReplyArray(filtered);
  };

  const handleDrawerVisible = (flag, record, type) => {
    const newDrawerData = {
      visibility: !!flag,
      record: record || {},
      type: type,
    };
    setDrawerData(newDrawerData);
  };

  const newPost = (replyUid) => {
    const data = {uid: null, replyUid: replyUid || null, content: ''};
    handleDrawerVisible(true, data, 'newPost');
  };
  const editPost = (post) => {
    const data = {uid: post.uid, content: post.postContent,};
    handleDrawerVisible(true, data, 'editPost');
  };
  const editTopic = (topicData) => {
    const data = {uid: topicData.uid, title: topicData.topicTitle, content: topic.topicDescription};
    handleDrawerVisible(true, data, 'editTopic');
  };

  const handleMouseHover = (postId) => {
    setHoverCommentId(postId);
  };
  const onPaginationChange = (page, pageSize) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const goToLast = () => {
    const newCurrentPage = Math.ceil(mapPosts.size / pageSize);
    setCurrentPage(newCurrentPage);
  };

  const posts = () => {
    return [...mapPosts.values()].filter(value => value.replyUid === null);
  };

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

      {(topic.topicAuthor) && currentUser.userName === topic.topicAuthor.userName
        ? <Dropdown placement="bottomRight" trigger={['click']}
                    overlay={
                      <Menu><Menu.Item onClick={() => editTopic(topic)} key="1">Edytuj</Menu.Item></Menu>
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

  const initialPost = posts();

  return (
    <div>
      <List
        locale={{emptyText: 'Brak wpisów'}}
        loading={loading}
        header={header}
        dataSource={initialPost}
        pagination={{
          position: 'both',
          size: 'small',
          pageSize: pageSize,
          total: initialPost.length,
          current: currentPage,
          onChange: onPaginationChange
        }}
        renderItem={post => (
          <li>
            <PostContent
              post={post}
              postReplies={postReplies}
              mapPosts={mapPosts}
              hoverCommentId={hoverCommentId}
              currentUser={currentUser}
              openReplyArray={openReplyArray}
              newPost={newPost}
              editPost={editPost}
              openReply={openReply}
              closeReply={closeReply}
              handleMouseHover={handleMouseHover}

            />
          </li>
        )}
      >
      </List>
      <div>
        <div className="forum-floating-drawer plus" hidden={drawerData.visibility}
             onClick={() => newPost(null)}
        >
          <Icon type="plus"/>
        </div>
        <DrawerComponent
          drawerData={drawerData}
          categoryUid={categoryUid}
          topicUid={topicUid}

          handleDrawerVisible={handleDrawerVisible}
          handleSubmitDrawer={handleSubmitDrawer}
        />
      </div>
    </div>
  );
}

export default PostComponent;
