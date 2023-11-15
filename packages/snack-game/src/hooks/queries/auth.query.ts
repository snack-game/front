import { useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import authApi from '@api/auth.api';
import { userState } from '@utils/atoms/member.atom';
import { AuthType, MemberType } from '@utils/types/member.type';

import { ServerError } from '@constants/api.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import useModal from '@hooks/useModal';
import useOnError from '@hooks/useOnError';
import useToast from '@hooks/useToast';

interface useMemberAuthProps {
  apiMethod: (member: MemberType) => Promise<AuthType>;
  message: string;
}

interface useMemberOnSuccessProps {
  message: string;
  guest?: boolean;
}

const useMemberOnSuccess = ({ message, guest }: useMemberOnSuccessProps) => {
  const openToast = useToast();
  const setUserState = useSetRecoilState(userState);
  const { closeModal } = useModal();

  return ({ accessToken, member }: AuthType) => {
    setUserState(() => ({
      id: member.id,
      name: member.name,
      group: member.group,
      guest,
      accessToken,
    }));
    openToast(message, 'success');
    closeModal();
  };
};

const userMemberErrorBoundary = (error: AxiosError<ServerError>) => {
  if (!error.response) throw error;

  return error.response?.status >= 500;
};

export const useMemberAuth = ({ apiMethod, message }: useMemberAuthProps) => {
  const onSuccess = useMemberOnSuccess({ message });

  return useMutation({
    mutationFn: apiMethod,
    onSuccess,
    onError: useOnError(),
    useErrorBoundary: userMemberErrorBoundary,
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
    useErrorBoundary: userMemberErrorBoundary,
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
