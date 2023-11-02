import { useMutation } from 'react-query';

import { AxiosError } from 'axios/index';
import { useSetRecoilState } from 'recoil';

import membersApi from '@api/members.api';
import { userState } from '@utils/atoms/member.atom';
import { AuthType, MemberType } from '@utils/types/member.type';

import { ServerError } from '@constants/api.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import useModal from '@hooks/useModal';
import useToast from '@hooks/useToast';

interface useMemberAuthProps {
  apiMethod: (member: MemberType) => Promise<AuthType>;
  message: string;
}

const useMemberOnSuccess = (message: string) => {
  const openToast = useToast();
  const setUserState = useSetRecoilState(userState);
  const { closeModal } = useModal();

  return ({ accessToken, member }: AuthType) => {
    setUserState(() => ({
      id: member.id,
      name: member.name,
      group: member.group,
      accessToken,
    }));
    openToast(message, 'success');
    closeModal();
  };
};

const useMemberOnError = () => {
  const openToast = useToast();

  return (error: AxiosError<ServerError>) => {
    if (!error.response) throw error;

    openToast(error.response.data.messages, 'error');
  };
};

const userMemberErrorBoundary = (error: AxiosError<ServerError>) => {
  if (!error.response) throw error;

  return error.response?.status >= 500;
};

export const useMemberAuth = ({ apiMethod, message }: useMemberAuthProps) => {
  const onSuccess = useMemberOnSuccess(message);

  return useMutation({
    mutationFn: apiMethod,
    onSuccess,
    onError: useMemberOnError(),
    useErrorBoundary: userMemberErrorBoundary,
  });
};

export const useMemberGuest = () => {
  return useMutation({
    mutationFn: membersApi.guest,
    onSuccess: useMemberOnSuccess(TOAST_MESSAGE.AUTH_GUEST),
    onError: useMemberOnError(),
    useErrorBoundary: userMemberErrorBoundary,
  });
};

export const useMemberRegister = () =>
  useMemberAuth({
    apiMethod: membersApi.register,
    message: TOAST_MESSAGE.AUTH_REGISTER,
  });

export const useMemberLogin = () =>
  useMemberAuth({
    apiMethod: membersApi.login,
    message: TOAST_MESSAGE.AUTH_LOGIN,
  });

export const useChangeUserName = () => {
  const openToast = useToast();

  return useMutation({
    mutationFn: membersApi.changeMemberName,
    onSuccess: () => {
      openToast(TOAST_MESSAGE.CHANGE_USER_NAME, 'success');
    },
    onError: useMemberOnError(),
    useErrorBoundary: userMemberErrorBoundary,
  });
};
