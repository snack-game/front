import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';

import membersApi from '@api/members';
import useUserStore from '@utils/store/auth';
import { MemberType } from '@utils/types/member.type';

import LOCAL_STORAGE from '@constants/localstorage';
import PATH from '@constants/path';
import useLocalStorage from '@hooks/useLocalStorage';

export const useAuthUser = ({ name, group }: MemberType) => {
  const { user, updateUser } = useUserStore();
  const { setStorageValue } = useLocalStorage(LOCAL_STORAGE.ACCESS_TOKEN);

  const navigate = useNavigate();
  // const { openSnackBar } = useSnackBar();

  const { mutate } = useMutation<string, AxiosError>(
    () => membersApi.authUser({ name, group }),
    {
      retry: 0,
      onError: () => navigate(PATH.HOME),
      onSuccess: (accessToken: string) => {
        updateUser({ name, group });
        setStorageValue(accessToken);
        navigate(PATH.HOME);
      },
    },
  );

  return {
    mutate,
  };
};
