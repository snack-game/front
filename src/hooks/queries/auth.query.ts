import { useTranslation } from 'react-i18next';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import { guest, login, register, social } from '@api/auth.api';
import { userState } from '@utils/atoms/member.atom';
import { MemberType } from '@utils/types/member.type';

import { ServerError } from '@constants/api.constant';
import useModal from '@hooks/useModal';
import useToast from '@hooks/useToast';

interface useMemberAuthProps {
  apiMethod: (member: MemberType) => Promise<MemberType>;
}

const useMemberOnSuccess = () => {
  const { t } = useTranslation();
  const openToast = useToast();
  const setUserState = useSetRecoilState(userState);
  const { closeModal } = useModal();

  return (member: MemberType) => {
    setUserState(() => ({
      ...member,
    }));
    openToast(t('guest_login_success'), 'success');
    closeModal();
  };
};

const useOnError = () => {
  const openToast = useToast();

  return (error: AxiosError<ServerError>) => {
    if (!error.response) throw error;

    openToast(error.response.data.messages, 'error');
  };
};

const memberErrorBoundary = (error: AxiosError<ServerError>) => {
  if (!error.response) throw error;

  return error.response?.status >= 500;
};

export const useMemberAuth = ({ apiMethod }: useMemberAuthProps) => {
  const onSuccess = useMemberOnSuccess();

  return useMutation({
    mutationFn: apiMethod,
    onSuccess,
    onError: useOnError(),
    throwOnError: memberErrorBoundary,
  });
};

export const useGuest = () => {
  return useMutation({
    mutationFn: guest,
    onSuccess: useMemberOnSuccess(),
    onError: useOnError(),
    throwOnError: memberErrorBoundary,
  });
};

export const useRegister = () =>
  useMemberAuth({
    apiMethod: register,
  });

export const useLogin = () =>
  useMemberAuth({
    apiMethod: login,
  });

export const useSocial = () => {
  return useMutation({
    mutationFn: social,
  });
};
