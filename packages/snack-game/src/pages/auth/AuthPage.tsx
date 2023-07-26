import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import PageContainer from '@components/base/PageContainer';
import Button from '@components/common/Button';
import LoginForm from '@components/ui/AuthForm/LoginForm';
import RegisterForm from '@components/ui/AuthForm/RegisterForm';
import * as Styled from '@pages/auth/AuthPage.style';

const AuthPage = () => {
  const [authType, setAuthType] = useState('등록');

  return (
    <>
      <Helmet>
        <title>Snack Game || Register</title>
      </Helmet>
      <PageContainer>
        <Styled.AuthTypeWrapper>
          <Button
            content={authType}
            onClick={() => setAuthType(authType == '등록' ? '로그인' : '등록')}
            size={'medium'}
          />
        </Styled.AuthTypeWrapper>
        <Styled.Wrapper>
          {authType === '등록' ? (
            <>
              <Styled.TextWrapper>
                <Styled.Title>
                  이름과 소속을 입력하고 랭킹을 경쟁해 보아요!
                </Styled.Title>
                <Styled.Description>
                  이미 만든적이 있다면 이름만으로 로그인할 수 있어요!
                  <br />
                  새로운 소을 만들고 싶다면 중복되지 않는 소속이름을 적어주세요!
                </Styled.Description>
              </Styled.TextWrapper>
              <RegisterForm />
            </>
          ) : (
            <>
              <Styled.TextWrapper>
                <Styled.Title>
                  이름을 입력하고 랭킹을 경쟁해 보아요!
                </Styled.Title>
              </Styled.TextWrapper>
              <LoginForm />
            </>
          )}
        </Styled.Wrapper>
      </PageContainer>
    </>
  );
};

export default AuthPage;
