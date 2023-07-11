import { FC } from 'react';

import Button from '@components/common/Button';
import Input from '@components/common/Input';

import useForm from '@hooks/useForm';

import * as Styled from './AuthForm.style';
import { MORE_2CHAR_REGEX } from '../../../constants/regex';

interface AuthFormProps {
  children?: never;
}

const AuthForm: FC<AuthFormProps> = () => {
  const { values, handleChangeValue } = useForm<string>({
    initialValues: {
      name: { value: '', isInvalid: (value) => MORE_2CHAR_REGEX.test(value) },
      group: { value: '', isInvalid: (value) => MORE_2CHAR_REGEX.test(value) },
    },
  });

  return (
    <Styled.Form>
      <Styled.Title>로그인 / 등록</Styled.Title>
      <Styled.InputWrapper>
        <Input
          placeholder={'이름'}
          type={'text'}
          id={'auth-name-input'}
          onChange={handleChangeValue('name')}
          errorMessage={'이름은 2글자 이상, 특수문자를 포함하지 않아야 해요.'}
          required={true}
          valid={values.name.valid}
        />
      </Styled.InputWrapper>
      <Styled.InputWrapper>
        <Input
          placeholder={'소속'}
          type={'text'}
          id={'auth-group-input'}
          onChange={handleChangeValue('group')}
          errorMessage={'소속은 2글자 이상, 특수문자를 포함하지 않아야 해요.'}
          valid={values.group.valid}
        />
      </Styled.InputWrapper>
      <Button content={'확인'} type={'submit'} />
      <Styled.Description>소속은 나중에 설정해도 괜찮아요!</Styled.Description>
    </Styled.Form>
  );
};

export default AuthForm;
