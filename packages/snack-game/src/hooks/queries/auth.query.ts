import { useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import authApi from '@api/auth.api';
import { userState } from '@utils/atoms/member.atom';
import { MemberType } from '@utils/types/member.type';

import { ServerError } from '@constants/api.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import useModal from '@hooks/useModal';
import useToast from '@hooks/useToast';

interface useMemberAuthProps {
  apiMethod: (member: MemberType) => Promise<MemberType>;
  message: string;
}

interface useMemberOnSuccessProps {
  message: string;
  guest?: boolean;
}

const useMemberOnSuccess = ({ message }: useMemberOnSuccessProps) => {
  const openToast = useToast();
  const setUserState = useSetRecoilState(userState);
  const { closeModal } = useModal();

  return ({ accessToken, member }: MemberType) => {
    setUserState(() => ({
      member,
      accessToken,
    }));
    openToast(message, 'success');
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

export const useMemberAuth = ({ apiMethod, message }: useMemberAuthProps) => {
  const onSuccess = useMemberOnSuccess({ message });

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
    onSuccess: useMemberOnSuccess({
      message: TOAST_MESSAGE.AUTH_GUEST,
      guest: true,
    }),
    onError: useOnError(),
    useErrorBoundary: memberErrorBoundary,
  });
};

export const useRegister = () =>
  useMemberAuth({
    apiMethod: authApi.register,
    message: TOAST_MESSAGE.AUTH_REGISTER,
  });

export const useLogin = () =>
  useMemberAuth({
    apiMethod: authApi.login,
    message: TOAST_MESSAGE.AUTH_LOGIN,
  });

export const useSocial = () => {
  return useMutation({
    mutationFn: authApi.social,
    onSuccess: useMemberOnSuccess({ message: TOAST_MESSAGE.AUTH_SOCIAL }),
    onError: useOnError(),
    useErrorBoundary: true,
  });
};
