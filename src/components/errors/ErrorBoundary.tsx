import { Component } from 'react';

import logger from '../../services/logService';
import EmptyState from '../emptyState/EmptyState';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage?: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    hasError: false,
    errorMessage: '',
  };

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  componentDidCatch(error: Error, info: object) {
    logger.log(error);
    console.log(error, info);
  }

  render() {
    const { children } = this.props;
    const { hasError, errorMessage } = this.state;

    if (hasError) {
      return (
        <section
          className='error-boundary'
          role='alert'
          aria-live='assertive'
          aria-labelledby='error-title'
        >
          <span className='sr-only'>
            An unexpected error occurred: {errorMessage}
          </span>

          <EmptyState
            alt='Application error'
            imgSrc='/towing.svg'
            title='Uh oh!'
            subtitle='It looks like something went wrong on our end. Please try again.'
            formatImg
            showReload
          />
        </section>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
