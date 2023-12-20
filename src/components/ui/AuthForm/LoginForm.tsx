import { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@components/common/Button/Button';
import Input from '@components/common/Input/Input';
import OAuthContainer from '@components/ui/AuthForm/OAuthContainer';

import { NAME_REGEXP } from '@constants/regexp.constant';
import { useLogin, useSocial } from '@hooks/queries/auth.query';
import useForm from '@hooks/useForm';
import useModal from '@hooks/useModal';

import * as Styled from './Auth.style';

const LoginForm = () => {
  const { t } = useTranslation();
  const loginMutate = useLogin();
  const oAuthToken = useSocial();
  const { closeModal } = useModal();

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

  const onOAuthSuccess = async () => {
    const member = await oAuthToken.mutateAsync();
    closeModal();
    return member;
  };

  return (
    <Styled.Form onSubmit={handleOnSubmit}>
      <Styled.Title>{t('login_title')}</Styled.Title>
      <Styled.InputContainer>
        <Input
          placeholder={t('login_name')}
          type={'text'}
          id={'auth-name-input'}
          onChange={handleChangeValue('name')}
          errorMessage={t('login_desc')}
          required={true}
          valid={values.name.valid}
        />
      </Styled.InputContainer>
      <Button content={t('login_submit')} disabled={!values.name.valid} />
      <Styled.SocialLoginContainer>
        <p>{t('login_oauth')}</p>
        <OAuthContainer oAuthOnSuccess={onOAuthSuccess} />
      </Styled.SocialLoginContainer>
    </Styled.Form>
  );
};

export default LoginForm;
