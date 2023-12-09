import { FormEvent } from 'react';

import Button from '@components/common/Button/Button';
import Input from '@components/common/Input/Input';
import OAuthContainer from '@components/ui/AuthForm/OAuthContainer';

import { NAME_REGEXP } from '@constants/regexp.constant';
import { useLogin, useSocial } from '@hooks/queries/auth.query';
import useForm from '@hooks/useForm';

import * as Styled from './Auth.style';

const LoginForm = () => {
  const loginMutate = useLogin();
  const oAuthToken = useSocial();

  const { values, handleChangeValue } = useForm<string>({
    initialValues: {
      name: {
        value: '',
        isInvalid: (value) => NAME_REGEXP.test(value),
        valid: false,
      },
    },
  });

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    loginMutate.mutate({ member: { name: values.name.value, group: null } });
  };

  return (
    <Styled.Form onSubmit={handleOnSubmit}>
      <Styled.Title>로그인</Styled.Title>
      <Styled.InputContainer>
        <Input
          placeholder={'이름'}
          type={'text'}
          id={'auth-name-input'}
          onChange={handleChangeValue('name')}
          errorMessage={'이름은 2글자 이상, 특수문자를 포함하지 않아야 해요.'}
          required={true}
          valid={values.name.valid}
        />
      </Styled.InputContainer>
      <Button content={'확인'} disabled={!values.name.valid} />
      <Styled.SocialLoginContainer>
        <p>간편하게 시작하기</p>
        <OAuthContainer oAuthOnSuccess={oAuthToken.mutateAsync} />
      </Styled.SocialLoginContainer>
    </Styled.Form>
  );
};

export default LoginForm;
