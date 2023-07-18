import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';

import membersApi from '@api/members';
import { MemberType } from '@utils/types/member.type';

import LOCAL_STORAGE from '@constants/localstorage.constant';
import Path from '@constants/path.constant';
import useLocalStorage from '@hooks/useLocalStorage';

export const useAuthUser = ({ name, group }: MemberType) => {
  const { setStorageValue } = useLocalStorage({
    key: LOCAL_STORAGE.ACCESS_TOKEN,
  });

  const navigate = useNavigate();
  // const { openSnackBar } = useSnackBar();

  const { mutate } = useMutation<string, AxiosError>(
    () => membersApi.authUser({ name, group }),
    {
      retry: 0,
      onError: () => navigate(Path.HOME),
      onSuccess: (accessToken: string) => {
        setStorageValue(accessToken);
        navigate(Path.HOME);
      },
    },
  );

  return {
    mutate,
  };
};
