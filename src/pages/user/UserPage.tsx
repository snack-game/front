import { Helmet } from 'react-helmet-async';

import { useRecoilValue } from 'recoil';

import QueryBoundary from '@components/base/QueryBoundary';
import RetryError from '@components/Error/RetryError';
import UserInfo from '@pages/user/components/UserInfo';
import { userState } from '@utils/atoms/member.atom';

const UserPage = () => {
  const userInfo = useRecoilValue(userState);

  return (
    <>
      <Helmet>
        <title>Snack Game || My Info</title>
      </Helmet>

      {userInfo.id && (
        <div className={'flex h-[100dvh] flex-col'}>
          <QueryBoundary errorFallback={RetryError}>
            <UserInfo />
          </QueryBoundary>
        </div>
      )}
    </>
  );
};

export default UserPage;
