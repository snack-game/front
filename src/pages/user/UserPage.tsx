import { Helmet } from 'react-helmet-async';

import QueryBoundary from '@components/base/QueryBoundary';
import RetryError from '@components/Error/RetryError';
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import Spacing from '@components/Spacing/Spacing';
import UserInfo from '@pages/user/components/UserInfo';

const UserPage = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || My Info</title>
      </Helmet>
      <Header className={'fixed'} />
      <Spacing size={4} />
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
