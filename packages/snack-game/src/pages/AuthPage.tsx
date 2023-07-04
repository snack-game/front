import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import PageContainer from '@components/base/PageContainer';

interface AuthPageProps {
  children?: never;
}

const AuthPage: FC<AuthPageProps> = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || Main</title>
      </Helmet>
      <PageContainer>
        <div></div>
      </PageContainer>
    </>
  );
};

export default AuthPage;
