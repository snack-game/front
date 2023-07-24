import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import membersApi from '@api/members';
import { userState } from '@utils/atoms/auth';
import { MemberType } from '@utils/types/member.type';

import { ServerError } from '@constants/api.constant';
import LOCAL_STORAGE from '@constants/localstorage.constant';
import PATH from '@constants/path.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import useError from '@hooks/useError';
import useLocalStorage from '@hooks/useLocalStorage';
import useToast from '@hooks/useToast';

export const useMemberAuth = (
  apiMethod: (member: MemberType) => Promise<string>,
) => {
  const openToast = useToast();
  const errorPopup = useError();
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userState);
  const { setStorageValue } = useLocalStorage({
    key: LOCAL_STORAGE.ACCESS_TOKEN,
  });

  const { mutate } = useMutation<string, AxiosError<ServerError>, MemberType>(
    apiMethod,
    {
      retry: 0,
      onError: (error: AxiosError<ServerError>) => {
        if (error.response) {
          errorPopup(error.response.status, error.response.data.messages);
        }
      },
      onSuccess: (accessToken: string, context: MemberType) => {
        setStorageValue(accessToken);
        setUserState(() => ({
          id: context.id,
          name: context.name,
          group: context.group,
          accessToken,
        }));
        openToast(TOAST_MESSAGE.AUTH_LOGIN, 'success');
        navigate(PATH.HOME);
      },
    },
  );

  return {
    authMutate: mutate,
  };
};

export const useMemberRegister = () => useMemberAuth(membersApi.register);
export const useMemberLogin = () => useMemberAuth(membersApi.login);
