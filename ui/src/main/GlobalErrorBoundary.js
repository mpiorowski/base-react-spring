import * as React from 'react';
import {serviceError} from '../services/ErrorService';

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    serviceError(error.message, error.stack, errorInfo.componentStack).then(() => {
      console.log(error.message);
      console.log(error.stack);
      console.log(errorInfo.componentStack);
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default GlobalErrorBoundary;
