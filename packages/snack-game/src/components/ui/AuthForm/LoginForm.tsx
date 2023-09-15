import Button from '@components/common/Button/Button';
import Input from '@components/common/Input/Input';

import { NAME_REGEXP } from '@constants/regexp.constant';
import { useMemberLogin } from '@hooks/queries/members.query';
import useForm from '@hooks/useForm';

import * as Styled from './Auth.style';

const LoginForm = () => {
  const loginMutate = useMemberLogin();

  const { values, handleChangeValue } = useForm<string>({
    initialValues: {
      name: {
        value: '',
        isInvalid: (value) => NAME_REGEXP.test(value),
        valid: false,
      },
    },
  });

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutate.mutate({ name: values.name.value });
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
      <Button content={'확인'} type={'submit'} disabled={!values.name.valid} />
    </Styled.Form>
  );
};

export default LoginForm;
