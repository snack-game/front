import { useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import membersApi from '@api/members';
import { userState } from '@utils/atoms/auth';
import { MemberType } from '@utils/types/member.type';

import { ServerError } from '@constants/api.constant';
import PATH from '@constants/path.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import useError from '@hooks/useError';
import { useInternalRouter } from '@hooks/useInternalRouter';
import useToast from '@hooks/useToast';

interface useMemberAuthProps {
  apiMethod: (member: MemberType) => Promise<MemberType>;
  message: string;
}

const useMemberMutation = <T>(
  apiMethod: (args: T) => Promise<MemberType>,
  onSuccess: (data: MemberType) => void,
) => {
  const errorPopup = useError();
  return useMutation<MemberType, AxiosError<ServerError>, T>(apiMethod, {
    retry: 0,
    onError: (error: AxiosError<ServerError>) => {
      if (error.response) {
        if (error.response.status >= 500) {
          throw error;
        }
        errorPopup(error.response.status, error.response.data.messages);
      }
    },
    onSuccess,
  });
};

const useMemberOnSuccess = (message: string, redirect?: string) => {
  const openToast = useToast();
  const setUserState = useSetRecoilState(userState);
  const router = useInternalRouter();

  return (member: MemberType) => {
    setUserState(() => ({
      id: member.id,
      name: member.name,
      group: member.group,
    }));
    openToast(message, 'success');
    if (redirect) router.push(redirect);
  };
};

export const useMemberAuth = ({ apiMethod, message }: useMemberAuthProps) => {
  const onSuccess = useMemberOnSuccess(message, PATH.HOME);
  const { mutate } = useMemberMutation<MemberType>(apiMethod, onSuccess);
  return { authMutate: mutate };
};

export const useMemberGuest = () => {
  const onSuccess = useMemberOnSuccess(TOAST_MESSAGE.AUTH_GUEST);
  const { mutateAsync } = useMemberMutation<void>(membersApi.guest, onSuccess);
  return { guestMutate: mutateAsync };
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
