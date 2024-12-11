import { Component } from 'react';

import logger from '../../services/logService';
import EmptyState from '../emptyState/EmptyState';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: error,
    };
  }

  componentDidCatch(error: Error, info: object) {
    logger.log(error);
    console.log(error, info);
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <EmptyState
          alt='error'
          imgSrc='towing'
          title='Uh oh!'
          subtitle='It looks like something went wrong on our end. Please try again.'
          showReload
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
