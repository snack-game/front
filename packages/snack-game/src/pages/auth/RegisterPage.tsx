import { Helmet } from 'react-helmet-async';

import PageContainer from '@components/base/PageContainer';
import RegisterForm from '@components/ui/AuthForm/RegisterForm';
import * as Styled from '@pages/auth/AuthPage.style';

const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || Register</title>
      </Helmet>
      <PageContainer>
        <Styled.Wrapper>
          <Styled.TextWrapper>
            <Styled.Title>
              이름과 소속을 입력하고 랭킹을 경쟁해 보아요!
            </Styled.Title>
            <Styled.Description>
              이미 만든적이 있다면 이름만으로 로그인할 수 있어요!
            </Styled.Description>
          </Styled.TextWrapper>
          <RegisterForm />
        </Styled.Wrapper>
      </PageContainer>
    </>
  );
};

export default RegisterPage;
