import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import PageContainer from '@components/base/PageContainer';
import Input from '@components/common/Input';

interface AuthPageProps {
  children?: never;
}

const AuthPage: FC<AuthPageProps> = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || Auth</title>
      </Helmet>
      <PageContainer>
        <div>
          <Input placeholder={'테스트'} />
        </div>
      </PageContainer>
    </>
  );
};

export default AuthPage;
