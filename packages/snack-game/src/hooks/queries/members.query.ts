import { useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import membersApi from '@api/members.api';
import { userState } from '@utils/atoms/member.atom';
import { MemberType } from '@utils/types/member.type';

import { ServerError } from '@constants/api.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import useToast from '@hooks/useToast';

export const useChangeUserName = () => {
  const openToast = useToast();

  return useMutation({
    mutationFn: membersApi.changeMemberName,
    onSuccess: () => {
      openToast(TOAST_MESSAGE.CHANGE_USER_NAME, 'success');
    },
    onError: useOnError(),
    useErrorBoundary: (error: AxiosError<ServerError>) => {
      if (!error.response) throw error;

      return error.response?.status >= 500;
    },
  });
};

const useOnError = () => {
  const openToast = useToast();

  return (error: AxiosError<ServerError>) => {
    if (!error.response) throw error;

    openToast(error.response.data.messages, 'error');
  };
};

export const useIntegrateMember = () => {
  const openToast = useToast();
  const setUserState = useSetRecoilState(userState);

  return useMutation({
    mutationFn: membersApi.integrateMember,
    onSuccess: ({ accessToken, member }: MemberType) => {
      setUserState(() => ({
        member,
        accessToken,
      }));
      openToast(TOAST_MESSAGE.AUTH_SOCIAL, 'success');
    },
    onError: useOnError(),
    useErrorBoundary: (error: AxiosError<ServerError>) => {
      if (!error.response) throw error;

      return error.response?.status >= 500;
    },
  });
};
