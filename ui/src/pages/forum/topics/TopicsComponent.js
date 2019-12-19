import React, {useCallback, useEffect, useState} from 'react';
import {Button, Dropdown, Icon, Menu, Table} from "antd";
import "./TopicsComponent.less";
import {serviceGetTopics} from "../../../services/forum/ForumService";
import moment from "moment";
import {NavLink} from "react-router-dom";
import DrawerComponent from "../drawer/DrawerComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AuthContext} from "../../../App";
import {breadcrumbNameMap} from "../../../config/BreadcrumbsConfig";
import {useBreadcrumbsState} from "../../../context/GlobalContext";

const TopicsComponent = (props) => {

  const {setBreadcrumbs} = useBreadcrumbsState();

  const [categoryUid] = useState(props.match.params.categoryUid);
  const [category, setCategory] = useState(0);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerData, setDrawerData] = useState({
    visibility: false,
    record: {},
    type: '',
  });
  const [paginationSize, setPaginationSize] = useState(0);

  const addBreadcrumbs = useCallback((data) => {
    let newBreadcrumbs = {};
    newBreadcrumbs['/forum/categories/' + data.uid + '/topics'] = data.categoryTitle;
    newBreadcrumbs = {...breadcrumbNameMap, ...newBreadcrumbs};
    setBreadcrumbs(newBreadcrumbs);
  }, [setBreadcrumbs]);

  useEffect(() => {
    serviceGetTopics(categoryUid).then(response => {
      console.log('topics get', response);
      let newPaginationSize = Math.round((window.innerHeight - 280) / 60);
      setTopics(response.topics);
      setCategory(response.category);
      setLoading(false);
      setPaginationSize(newPaginationSize);

      addBreadcrumbs(response.category);
    });
  }, [addBreadcrumbs, categoryUid]);


  const handleSubmitDrawer = (formData, response) => {
    console.log(response);
    if (formData.type === 'editCategory') {
      setCategory(response.categoryDataDto);
      addBreadcrumbs(response.categoryDataDto);
    } else if (formData.type === 'newTopic') {
      response['postsCount'] = 0;
      const newTopics = [response].concat(topics);
      setTopics(newTopics);
    }
    handleDrawerVisible(false);
  };

  const handleDrawerVisible = (flag, record, type) => {
    const newDrawerData = {
      visibility: !!flag,
      record: record || {},
      type: type,
    };
    setDrawerData(newDrawerData);
  };

  const editCategory = (newCategory) => {
    const record = {
      uid: newCategory.uid,
      title: newCategory.categoryTitle,
      content: newCategory.categoryDescription,
      icon: newCategory.categoryIcon
    };
    handleDrawerVisible(true, record, 'editCategory');
  };


  const columns = [
    {
      title: 'Temat',
      dataIndex: 'topicTitle',
      key: 'topicTitle',
      width: '70%',
      sorter: (a, b) => a.topicTitle.localeCompare(b.topicTitle),
      render: (text, row, index) => {
        return <NavLink
          to={"/forum/categories/" + categoryUid + "/topics/" + row.uid + "/posts"}>{text}</NavLink>
      }
    },
    {
      title: 'Posty',
      dataIndex: 'postsCount',
      key: 'postsCount',
      align: 'center',
      sorter: (a, b) => a.postsCount - b.postsCount,
    },
    {
      title: 'Najnowszy',
      dataIndex: 'latestPostDate',
      key: 'newest',
      align: 'center',
      sorter: (a, b) => {
        let startDate = a.latestPostDate ? moment(a.latestPostDate) : moment(0);
        let endDate = b.latestPostDate ? moment(b.latestPostDate) : moment(0);
        return startDate.diff(endDate);
      },
      render: (text, row, index) => {
        return text
          ? <NavLink
            to={"/forum/categories/" + categoryUid + "/topics/" + row.uid + "/posts?latest=" + row.latestPostUid}>
            {moment(text).fromNow()}
          </NavLink>
          : 'Brak postów'
      }
    },];

  return (
    <div>

      {/*//todo - edit category only for author*/}
      <div className={'topic-header'}>
        <div className={'topic-header-text'}>
          <div>
            {category ? <FontAwesomeIcon icon={category.categoryIcon}/> : ''}
            &nbsp;{category ? category.categoryTitle : ''}&nbsp;-&nbsp;
          </div>
          <div className={'topic-header-description'}>{category ? category.categoryDescription : ''}</div>
        </div>
        <AuthContext.Consumer>
          {currentUser => currentUser.userRoles.includes('ROLE_ADMIN')
            ? <Dropdown placement="bottomRight" trigger={['click']}
                        overlay={
                          <Menu><Menu.Item onClick={() => editCategory(category)}
                                           key="1">Edytuj</Menu.Item></Menu>
                        }
            >
              <Button className={'topic-more-btn'} type={'link'}><Icon type="more"/></Button>
            </Dropdown>
            : ''}
        </AuthContext.Consumer>
      </div>

      {/*todo - paginationSize*/}
      <Table
        columns={columns}
        dataSource={topics}
        size='middle'
        loading={loading}
        className={'topic-table'}
        rowKey={record => record.uid}
        pagination={{pageSize: paginationSize}}
      />
      <div className="forum-floating-drawer plus" hidden={drawerData.visibility}
           onClick={() => handleDrawerVisible(true, {}, 'newTopic')}
      >
        <Icon type="plus"/>
      </div>
      <DrawerComponent
        drawerData={drawerData}
        categoryUid={categoryUid}

        handleDrawerVisible={handleDrawerVisible}
        handleSubmitDrawer={handleSubmitDrawer}
      />
    </div>

  );
}

export default TopicsComponent;
