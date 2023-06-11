import { FC } from "react";
import { ErrorBoundary as RErrorBoundary } from "react-error-boundary";
import { Helmet } from "react-helmet-async";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

const ErrorPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>ERROR | Title</title>
      </Helmet>
      <div>Error</div>
    </>
  );
};

const ErrorBoundary: FC<ErrorBoundaryProps> = ({ children }) => {
  return <RErrorBoundary fallback={<ErrorPage />}>{children}</RErrorBoundary>;
};
export default ErrorBoundary;
