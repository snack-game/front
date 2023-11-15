import { useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import membersApi from '@api/members.api';
import { userState } from '@utils/atoms/member.atom';
import { AuthType } from '@utils/types/member.type';

import { ServerError } from '@constants/api.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import useOnError from '@hooks/useOnError';
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

export const useIntegrateMember = () => {
  const openToast = useToast();
  const setUserState = useSetRecoilState(userState);

  return useMutation({
    mutationFn: membersApi.integrateMember,
    onSuccess: ({ accessToken, member }: AuthType) => {
      setUserState(() => ({
        id: member.id,
        name: member.name,
        group: member.group,
        accessToken: accessToken,
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
