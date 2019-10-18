import React, {Component} from 'react';
import {Col, List, Row, Skeleton} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";
import {faBullhorn, faComment, faPencilAlt} from "@fortawesome/free-solid-svg-icons/index";
import "./CategoriesComponent.less";
import {NavLink} from "react-router-dom";
import {serviceGetCategories} from "../../../services/forum/ForumService";

class CategoriesComponent extends Component {

  state = {
    categories: [{
      uid: '',
      categoryTitle: '',
      categoryDescription: ''
    }],
    loading: true
  };

  componentWillMount() {
    serviceGetCategories().then(response => {
      this.setState({
        categories: response,
        loading: false,
      });
    })
  }

  render() {
    return (
      <div>
        <List
          // bordered={true}
          header={<div className={"cat-header"}>Kategorie</div>}
          itemLayout="horizontal"
          loading={this.state.loading}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 16,
          }}
          dataSource={this.state.categories}
          renderItem={item => (

            <List.Item
              key={item.categoryTitle}
            >
              <Skeleton title={false} loading={this.state.loading} active>
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
                    <Col span={24}><FontAwesomeIcon icon={faPencilAlt}/> 4 tematy</Col>
                    <Col span={24}><FontAwesomeIcon icon={faComment}/> 6 postów</Col>
                  </Col>

                  <Col span={4} style={{margin: "auto"}}>
                    <div style={{fontSize: 12}}>
                      Najnowszy: Ostatnia nadzieja<br/>
                      Autor: Mateusz Piórowski <br/>
                      Data: 24.03.2019, 14:30:33
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
