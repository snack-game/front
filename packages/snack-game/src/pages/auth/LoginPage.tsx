import { Helmet } from 'react-helmet-async';

import PageContainer from '@components/base/PageContainer';
import LoginForm from '@components/ui/AuthForm/LoginForm';
import * as Styled from '@pages/auth/AuthPage.style';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || Login</title>
      </Helmet>
      <PageContainer>
        <Styled.Wrapper>
          <Styled.TextWrapper>
            <Styled.Title>이름을 입력하고 랭킹을 경쟁해 보아요!</Styled.Title>
          </Styled.TextWrapper>
          <LoginForm />
        </Styled.Wrapper>
      </PageContainer>
    </>
  );
};

export default LoginPage;
