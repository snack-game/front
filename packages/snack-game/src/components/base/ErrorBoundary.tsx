import { Component, ComponentType, PropsWithChildren } from 'react';

export interface FallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
  message?: string;
}

interface ErrorBoundaryProps {
  fallback: ComponentType<FallbackProps>;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  error: Error | null;
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
    return { error };
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
