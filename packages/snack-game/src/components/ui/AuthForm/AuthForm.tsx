import Button from '@components/common/Button';
import Input from '@components/common/Input';
import SearchResultList from '@components/ui/SearchResultList/SearchResultList';

import useForm from '@hooks/useForm';

import * as Styled from './AuthForm.style';
import { GROUP_REGEXP, NAME_REGEXP } from '../../../constants/regex';

const AuthForm = () => {
  const { values, handleChangeValue, handleOnSubmit, setFieldValue } =
    useForm<string>({
      initialValues: {
        name: { value: '', isInvalid: (value) => NAME_REGEXP.test(value) },
        group: {
          value: '',
          isInvalid: (value) => GROUP_REGEXP.test(value),
          valid: true,
        },
      },
    });

  return (
    <Styled.Form onSubmit={handleOnSubmit}>
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
          value={values.group.value}
        />
        <SearchResultList
          value={values.group.value}
          onSelect={setFieldValue('group')}
        />
      </Styled.InputWrapper>
      <Button content={'확인'} type={'submit'} />
      <Styled.Description>소속은 나중에 설정해도 괜찮아요!</Styled.Description>
    </Styled.Form>
  );
};

export default AuthForm;
