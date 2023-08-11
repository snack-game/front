import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import PageContainer from '@components/base/PageContainer';
import QueryBoundary from '@components/base/QueryBoundary';
import RetryError from '@components/common/RetryError';
import ToggleSwitch from '@components/common/Toggle/ToggleSwitch';
import LoginForm from '@components/ui/AuthForm/LoginForm';
import RegisterForm from '@components/ui/AuthForm/RegisterForm';
import * as Styled from '@pages/auth/AuthPage.style';

const AuthPage = () => {
  const [authToggle, setAuthToggle] = useState(false);

  return (
    <>
      <Helmet>
        <title>Snack Game || Register</title>
      </Helmet>
      <PageContainer>
        <Styled.AuthTypeContainer>
          <ToggleSwitch
            toggle={authToggle}
            left={'로그인'}
            right={'등록'}
            onClick={() => setAuthToggle(!authToggle)}
          />
        </Styled.AuthTypeContainer>
        <Styled.Container>
          {authToggle ? (
            <>
              <Styled.TextContainer>
                <Styled.Title>
                  이름과 소속을 입력하고 랭킹을 경쟁해 보아요!
                </Styled.Title>
                <Styled.Description>
                  이미 만든적이 있다면 이름만으로 로그인할 수 있어요!
                  <br />
                  새로운 소을 만들고 싶다면 중복되지 않는 소속이름을 적어주세요!
                </Styled.Description>
              </Styled.TextContainer>
              <QueryBoundary errorFallback={RetryError}>
                <RegisterForm />
              </QueryBoundary>
            </>
          ) : (
            <>
              <Styled.TextContainer>
                <Styled.Title>
                  이름을 입력하고 랭킹을 경쟁해 보아요!
                </Styled.Title>
              </Styled.TextContainer>
              <QueryBoundary errorFallback={RetryError}>
                <LoginForm />
              </QueryBoundary>
            </>
          )}
        </Styled.Container>
      </PageContainer>
    </>
  );
};

export default AuthPage;
