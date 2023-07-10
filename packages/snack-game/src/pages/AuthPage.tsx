import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import PageContainer from '@components/base/PageContainer';
import Input from '@components/common/Input';

import useInput from '@hooks/useInput';

interface AuthPageProps {
  children?: never;
}

const AuthPage: FC<AuthPageProps> = () => {
  const { value, handleChangeValue } = useInput({
    initialValue: '',
  });

  return (
    <>
      <Helmet>
        <title>Snack Game || Auth</title>
      </Helmet>
      <PageContainer>
        <div>
          <Input placeholder={'테스트'} onChange={handleChangeValue} />
        </div>
      </PageContainer>
    </>
  );
};

export default AuthPage;
