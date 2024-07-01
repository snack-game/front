import { Component, ComponentType, PropsWithChildren } from 'react';

import * as Sentry from '@sentry/react';

export interface FallbackProps {
  error?: Error & { code?: string };
  resetErrorBoundary?: () => void;
  message?: string;
}

interface ErrorBoundaryProps {
  fallback: ComponentType<FallbackProps>;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  error: (Error & { code?: string }) | null;
  message?: string;
}

const initialState: ErrorBoundaryState = {
  error: null,
};

class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: null,
  };

  resetErrorBoundary = () => {
    this.props.onReset?.();
    this.setState(initialState);
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const errorWithCode = error as Error & { code?: string };
    errorWithCode.code = errorWithCode.code || 'UNKNOWN_ERROR';
    return { error: errorWithCode };
  }

  componentDidCatch(error: Error): void {
    Sentry.withScope((scope) => {
      scope.setLevel('error');
      Sentry.captureMessage(
        `[🚨 ${import.meta.env.VITE_NODE_ENV}에러 ${error.name}]: ${window.location.href}`,
      );

      Sentry.captureException(error, {
        mechanism: { handled: !!this.props.fallback },
      });
    });
  }

  render() {
    const { fallback: FallbackComponent } = this.props;

    if (this.state.error) {
      return (
        <FallbackComponent
          error={this.state.error}
          resetErrorBoundary={this.resetErrorBoundary}
          message={this.state.error.message}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
