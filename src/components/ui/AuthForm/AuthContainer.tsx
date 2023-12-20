import QueryBoundary from '@components/base/QueryBoundary';
import RetryError from '@components/common/Error/RetryError';
import LoginForm from '@components/ui/AuthForm/LoginForm';

const AuthContainer = () => {
  return (
    <>
      <QueryBoundary errorFallback={RetryError}>
        <LoginForm />
      </QueryBoundary>
    </>
  );
};

export default AuthContainer;
