import OAuth from '@components/Auth/OAuth';
import QueryBoundary from '@components/base/QueryBoundary';
import RetryError from '@components/Error/RetryError';

import { useSocial } from '@hooks/queries/auth.query';
import useModal from '@hooks/useModal';

const Auth = () => {
  const { closeModal } = useModal();
  const oAuthToken = useSocial();

  const onOAuthSuccess = async () => {
    const member = await oAuthToken.mutateAsync();
    closeModal();
    return member;
  };

  return (
    <>
      <QueryBoundary errorFallback={RetryError}>
        <OAuth oAuthOnSuccess={onOAuthSuccess} />
      </QueryBoundary>
    </>
  );
};

export default Auth;
