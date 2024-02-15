import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import authApi from '@api/auth.api';
import { userState } from '@utils/atoms/member.atom';
import { MemberType } from '@utils/types/member.type';

import { ServerError } from '@constants/api.constant';
import { LOCAL_STORAGE_KEY } from '@constants/localStorage.constant';
import useLocalStorage from '@hooks/useLocalStorage';
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
  const { setStorageValue } = useLocalStorage({
    key: LOCAL_STORAGE_KEY.USER_EXPIRE_TIME,
  });

  return ({ member }: MemberType) => {
    setUserState(() => ({
      member,
    }));
    setStorageValue(Date.now());
    openToast(t('login_success'), 'success');
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
    useErrorBoundary: memberErrorBoundary,
  });
};

export const useGuest = () => {
  return useMutation({
    mutationFn: authApi.guest,
    onSuccess: useMemberOnSuccess(),
    onError: useOnError(),
    useErrorBoundary: memberErrorBoundary,
  });
};

export const useRegister = () =>
  useMemberAuth({
    apiMethod: authApi.register,
  });

export const useLogin = () =>
  useMemberAuth({
    apiMethod: authApi.login,
  });

export const useSocial = () => {
  return useMutation({
    mutationFn: authApi.social,
  });
};
