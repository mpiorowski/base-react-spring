import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import GlobalErrorBoundary from "./main/GlobalErrorBoundary";

ReactDOM.render(
  <BrowserRouter>
    <GlobalErrorBoundary>
      {/*todo - dynamic global state with hooks*/}
      {/*<GlobalStateProvider>*/}
      <App/>
      {/*</GlobalStateProvider>*/}
    </GlobalErrorBoundary>
  </BrowserRouter>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
