import { Helmet } from 'react-helmet-async';

import QueryBoundary from '@components/base/QueryBoundary';
import RetryError from '@components/Error/RetryError';
import Footer from '@components/Footer/Footer';
import AppleGameHeader from '@pages/games/AppleGame/components/AppleGameHeader';
import UserInfo from '@pages/user/components/UserInfo';

const UserPage = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || My Info</title>
      </Helmet>
      <AppleGameHeader />
      <div className="flex flex-col">
        <QueryBoundary errorFallback={RetryError}>
          <UserInfo />
        </QueryBoundary>
      </div>
      <Footer />
    </>
  );
};

export default UserPage;
