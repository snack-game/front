import { useMutation } from 'react-query';

import { AxiosError } from 'axios/index';
import { useSetRecoilState } from 'recoil';

import membersApi from '@api/members.api';
import { userState } from '@utils/atoms/member.atom';
import { AuthType, MemberType } from '@utils/types/member.type';

import { ServerError } from '@constants/api.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import useGenericMutation from '@hooks/queries/useGenericMutation';
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

export const useMemberAuth = ({ apiMethod, message }: useMemberAuthProps) => {
  const openToast = useToast();
  const onSuccess = useMemberOnSuccess(message);

  return useMutation({
    mutationFn: apiMethod,
    onSuccess,
    useErrorBoundary: (error: AxiosError<ServerError>) => {
      if (!error.response) throw error;

      openToast(error.response.data.messages, 'error');

      return error.response?.status >= 500;
    },
  });
};

export const useMemberGuest = () => {
  return useGenericMutation<void, AuthType>({
    apiMethod: membersApi.guest,
    onSuccess: useMemberOnSuccess(TOAST_MESSAGE.AUTH_GUEST),
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

export const useUserChangeName = () => {
  const openToast = useToast();

  return useGenericMutation<MemberType, void>({
    apiMethod: membersApi.changeName,
    onSuccess: () => {
      openToast(TOAST_MESSAGE.USER_CHANGE_NAME, 'success');
    },
  });
};
