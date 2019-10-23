import React, {Component} from 'react';
import {Col, List, Row, Skeleton} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";
import {faBullhorn, faComment, faPencilAlt} from "@fortawesome/free-solid-svg-icons/index";
import "./CategoriesComponent.less";
import {NavLink} from "react-router-dom";
import {serviceGetCategories} from "../../../services/forum/ForumService";
import * as htmlToText from "html-to-text";
import moment from "moment";

class CategoriesComponent extends Component {

  state = {
    categories: [{
      uid: '',
      categoryTitle: '',
      categoryDescription: '',
      categoryTopicsNumber: '',
      categoryPostsNumber: '',
      categoryNewestPost: '',
      categoryNewestTopic: '',
      categoryNewestPostAuthor: '',
      categoryNewestPostDate: '',
    }],
    loading: true
  };

  componentDidMount() {
    serviceGetCategories().then(response => {
      console.log(response);
      this.setState({
        categories: response,
        loading: false,
      });
    })
  }

  //TODO - add option to choose icon, dynamic pagination
  render() {
    const {categories, loading} = this.state;

    return (
      <div>
        <List
          // bordered={true}
          header={<div className={"cat-header"}>Kategorie</div>}
          itemLayout="horizontal"
          loading={loading}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 16,
          }}
          dataSource={categories}
          renderItem={item => (

            <List.Item
              key={item.categoryTitle}
            >
              <Skeleton title={false} loading={loading} active>
                <Row gutter={16} type="flex" justify="space-between" style={{width: "100%"}}>
                  <Col span={14} style={{margin: 'auto', marginLeft: 0}}>
                    <List.Item.Meta
                      title={
                        <div style={{fontSize: 18}} className={"cat-topic-header"}>
                          <NavLink to={"/forum/categories/" + item.uid + "/topics"}><FontAwesomeIcon
                            icon={faBullhorn}
                            className={"cat-topic-icon"}/> {item.categoryTitle}
                          </NavLink>
                        </div>
                      }
                      description={<div>{item.categoryDescription}</div>}

                    />
                  </Col>

                  <Col span={6} style={{margin: "auto"}}>
                    <Col span={24}><FontAwesomeIcon icon={faPencilAlt}/> {item.categoryTopicsNumber || 0} tematy</Col>
                    <Col span={24}><FontAwesomeIcon icon={faComment}/> {item.categoryPostsNumber || 0} postów</Col>
                  </Col>

                  {/*TODO - navlink to newest*/}
                  <Col span={4} style={{margin: "auto"}}>
                    {item.categoryNewestPostDate
                      ? <span style={{fontSize: 10}}><NavLink to={"/home"}>{moment(item.categoryNewestPostDate).fromNow()}</NavLink> w temacie:</span>
                      : "Brak postów"
                    }
                    <div style={{fontSize: 12}}>
                      <div className={"truncate"}>
                        {htmlToText.fromString(item.categoryNewestTopic, {uppercaseHeadings: false})}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Skeleton>
            </List.Item>

          )}
        />
      </div>
    );
  }
}

export default CategoriesComponent;
