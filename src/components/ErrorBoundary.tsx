import React, { ErrorInfo } from 'react';

export interface ErrorBoundaryState {
  hasError: boolean,
  error?: Error,
}

export default class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
  constructor(props: Readonly<any>) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // console.log(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      const { error } = this.state;

      return (
        <>
          <h2>Something went wrong.</h2>
          <p>
            <strong>Details:</strong>
            <br />
            <strong>
              {error!.name}
              :
            </strong>
            {' '}
            {error!.message}
          </p>
        </>
      );
    }

    const { children } = this.props;

    return children;
  }
}
