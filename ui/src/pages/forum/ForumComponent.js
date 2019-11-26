import React, {Component} from 'react';
import CategoriesComponent from "./categories/CategoriesComponent";
import PostComponent from "./posts/PostComponent";
import {Route, Switch} from "react-router-dom";
import TopicsComponent from "./topics/TopicsComponent";

class ForumComponent extends Component {

  state = {
    loading: false,
  };

  render() {
    const {match} = this.props;
    return (
      <div>
        <Switch>
          {/*<Skeleton title={false} loading={this.state.loading} active>*/}
          <Route exact path={`${match.path}/categories`}
                 render={(props) => <CategoriesComponent {...props} currentUser={this.props.currentUser}/>}
          />
          <Route exact path={`${match.path}/categories/:categoryUid/topics`}
                 render={(props) => <TopicsComponent {...props} currentUser={this.props.currentUser}/>}
          />
          <Route exact path={`${match.path}/categories/:categoryUid/topics/:topicUid/posts`}
                 render={(props) => <PostComponent {...props} currentUser={this.props.currentUser}/>}
          />
          {/*</Skeleton>*/}
        </Switch>
      </div>
    );
  }
}

export default ForumComponent;
