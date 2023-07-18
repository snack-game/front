import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import membersApi from '@api/members';
import { userState } from '@utils/atoms/auth';
import { MemberType } from '@utils/types/member.type';

import { ServerError } from '@constants/api.constant';
import LOCAL_STORAGE from '@constants/localstorage.constant';
import Path from '@constants/path.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import useError from '@hooks/useError';
import useLocalStorage from '@hooks/useLocalStorage';
import useToast from '@hooks/useToast';

export const useMemberRegister = () => {
  const { openToast } = useToast();
  const errorPopup = useError();
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userState);
  const { setStorageValue } = useLocalStorage({
    key: LOCAL_STORAGE.ACCESS_TOKEN,
  });

  const { mutate } = useMutation<string, AxiosError<ServerError>, MemberType>(
    (member: MemberType) => membersApi.register(member),
    {
      retry: 0,
      onError: (error: AxiosError<ServerError>) => {
        if (error.response) {
          errorPopup(error.response?.status, error.response.data.messages);
        }
      },
      onSuccess: (accessToken: string, context: MemberType) => {
        setStorageValue(accessToken);
        setUserState(() => ({
          name: context.name,
          group: context.group,
          accessToken,
        }));
        openToast(TOAST_MESSAGE.AUTH_LOGIN, 'success');
        navigate(Path.HOME);
      },
    },
  );

  return {
    registerMutate: mutate,
  };
};

export const useMemberLogin = () => {
  const { openToast } = useToast();
  const errorPopup = useError();
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userState);
  const { setStorageValue } = useLocalStorage({
    key: LOCAL_STORAGE.ACCESS_TOKEN,
  });

  const { mutate } = useMutation<string, AxiosError<ServerError>, MemberType>(
    (member: MemberType) => membersApi.login(member),
    {
      retry: 0,
      onError: (error: AxiosError<ServerError>) => {
        if (error.response) {
          errorPopup(error.response?.status, error.response.data.messages);
        }
      },
      onSuccess: (accessToken: string, context: MemberType) => {
        setStorageValue(accessToken);
        setUserState(() => ({
          name: context.name,
          group: context.group,
          accessToken,
        }));
        openToast(TOAST_MESSAGE.AUTH_LOGIN, 'success');
        navigate(Path.HOME);
      },
    },
  );

  return {
    loginMutate: mutate,
  };
};
