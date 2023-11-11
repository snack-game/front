import { FormEvent } from 'react';

import QueryBoundary from '@components/base/QueryBoundary';
import Button from '@components/common/Button/Button';
import RetryError from '@components/common/Error/RetryError';
import Input from '@components/common/Input/Input';
import SearchResultList from '@components/ui/SearchResultList/SearchResultList';

import { GROUP_REGEXP, NAME_REGEXP } from '@constants/regexp.constant';
import { useRegister } from '@hooks/queries/auth.query';
import useForm from '@hooks/useForm';

import * as Styled from './Auth.style';

const RegisterForm = () => {
  const registerMutate = useRegister();

  const { values, handleChangeValue, setFieldValue } = useForm<string>({
    initialValues: {
      name: {
        value: '',
        isInvalid: (value) => NAME_REGEXP.test(value),
        valid: false,
      },
      group: {
        value: '',
        isInvalid: (value) => GROUP_REGEXP.test(value),
        valid: true,
      },
    },
  });

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    registerMutate.mutate({
      name: values.name.value,
      group: { name: values.group.value } || null,
    });
  };

  return (
    <Styled.Form onSubmit={handleOnSubmit}>
      <Styled.Title>등록</Styled.Title>
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
      <Styled.InputContainer>
        <Input
          placeholder={'그룹'}
          type={'text'}
          id={'auth-group-input'}
          onChange={handleChangeValue('group')}
          errorMessage={'그룹은 2글자 이상, 특수문자를 포함하지 않아야 해요.'}
          valid={values.group.valid}
          value={values.group.value}
        />
        <QueryBoundary errorFallback={RetryError}>
          <SearchResultList
            value={values.group.value}
            onClick={setFieldValue('group')}
            message={'일치하는 그룹이 없어요! 새로 만들어 보아요!'}
          />
        </QueryBoundary>
      </Styled.InputContainer>
      <Button
        content={'확인'}
        disabled={!values.name.valid || !values.group.valid}
      />
      <Styled.Description>
        {
          '그룹은 나중에 설정해도 괜찮아요!\n존재하지 않는 그룹이면 새로 만들어져요!'
        }
      </Styled.Description>
    </Styled.Form>
  );
};

export default RegisterForm;
