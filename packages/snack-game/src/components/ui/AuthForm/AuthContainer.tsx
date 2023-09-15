import { useState } from 'react';

import QueryBoundary from '@components/base/QueryBoundary';
import RetryError from '@components/common/Error/RetryError';
import ToggleSwitch from '@components/common/Toggle/ToggleSwitch';
import * as Styled from '@components/ui/AuthForm/Auth.style';
import LoginForm from '@components/ui/AuthForm/LoginForm';
import RegisterForm from '@components/ui/AuthForm/RegisterForm';

const AuthContainer = () => {
  const [authToggle, setAuthToggle] = useState(false);

  return (
    <QueryBoundary errorFallback={RetryError}>
      <>
        <Styled.AuthTypeContainer>
          <ToggleSwitch
            toggle={authToggle}
            left={'로그인'}
            right={'등록'}
            onClick={() => setAuthToggle(!authToggle)}
          />
        </Styled.AuthTypeContainer>
        {authToggle ? <RegisterForm /> : <LoginForm />}
      </>
    </QueryBoundary>
  );
};

export default AuthContainer;
