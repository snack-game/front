import { Helmet } from 'react-helmet-async';

import styled from '@emotion/styled';

import PageContainer from '@components/base/PageContainer';
import AuthForm from '@components/ui/AuthForm/AuthForm';

const AuthPage = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || Auth</title>
      </Helmet>
      <PageContainer>
        <Wrapper>
          <TextWrapper>
            <Title>이름과 소속을 입력하고 랭킹을 경쟁해 보아요!</Title>
            <Description>
              이미 만든적이 있다면 이름만으로 로그인할 수 있어요!
            </Description>
          </TextWrapper>
          <AuthForm />
        </Wrapper>
      </PageContainer>
    </>
  );
};

export default AuthPage;

const Wrapper = styled.div`
  display: flex;
  padding: 6rem 1.25rem;
  flex-wrap: wrap;
  align-items: center;
`;

const TextWrapper = styled.div`
  padding-right: 0;

  @media (min-width: 768px) {
    padding-right: 4rem;
    width: 50%;
  }
  @media (min-width: 1024px) {
    padding-right: 0;
    width: 60%;
  }
`;

const Title = styled.h1`
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 500;
  color: #111827;
`;

const Description = styled.p`
  margin-top: 1rem;
  line-height: 1.625;
`;
