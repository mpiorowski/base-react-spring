import React, {Component} from 'react';
import {apiRequest} from "../../services/ApiRequest";

function serviceCleanDatabase() {
  return apiRequest({
    url: `/api/test/clean`,
    method: "GET"
  })
}

class TestComponent extends Component {


  componentDidMount() {
    serviceCleanDatabase().then();
  }


  render() {
    return (
        <div>
          <h1>Clean database:</h1>
        </div>
    );
  }
}

export default TestComponent;
