import { Component, type ReactNode, type ErrorInfo } from 'react';
import { Result, Button } from 'antd';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Result
              status="error"
              title="Something went wrong"
              subTitle="An unexpected error occurred. Please try refreshing the page."
              extra={
                <Button type="primary" onClick={() => window.location.reload()}>
                  Refresh Page
                </Button>
              }
            />
          </div>
        )
      );
    }

    return this.props.children;
  }
}
