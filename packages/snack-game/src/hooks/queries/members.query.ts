import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';

import membersApi from '@api/members';
import { MemberType } from '@utils/types/member.type';

export const useAuthUser = ({ name, group }: MemberType) => {
  // const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  // const { openSnackBar } = useSnackBar();

  const { mutate } = useMutation<string, AxiosError>(
    () => membersApi.authUser({ name, group }),
    {
      retry: 0,
      onError: () => onErrorAuth(),
      // onSuccess: ({ accessToken }) => {},
    },
  );

  const onErrorAuth = () => {
    navigate('/');
  };

  // const onSuccessAuth = (accessToken: string, refreshToken: string) => {
  //   setUser({ ...user, accessToken, refreshToken });
  //   setAccessToken(accessToken);
  //   setRefreshToken(refreshToken);
  //
  //   navigate(PATH.MAIN);
  // };
  //
  // return {
  //   mutate,
  // };
};
