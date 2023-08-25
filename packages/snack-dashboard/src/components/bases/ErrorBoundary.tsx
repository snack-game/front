import { ErrorBoundary as RErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet-async';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>ERROR | Title</title>
      </Helmet>
      <div>Error</div>
    </>
  );
};

const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  return <RErrorBoundary fallback={<ErrorPage />}>{children}</RErrorBoundary>;
};
export default ErrorBoundary;
