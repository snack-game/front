import { useSetRecoilState } from 'recoil';

import membersApi from '@api/members';
import { userState } from '@utils/atoms/auth';
import { AuthType, MemberType } from '@utils/types/member.type';

import PATH from '@constants/path.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import useGenericMutation from '@hooks/useGenericMutation';
import { useInternalRouter } from '@hooks/useInternalRouter';
import useToast from '@hooks/useToast';

interface useMemberAuthProps {
  apiMethod: (member: MemberType) => Promise<AuthType>;
  message: string;
}

const useMemberOnSuccess = (message: string, redirect?: string) => {
  const openToast = useToast();
  const setUserState = useSetRecoilState(userState);
  const router = useInternalRouter();

  return ({ accessToken, member }: AuthType) => {
    setUserState(() => ({
      id: member.id,
      name: member.name,
      group: member.group,
      accessToken,
    }));
    openToast(message, 'success');
    if (redirect) router.push(redirect);
  };
};

export const useMemberAuth = ({ apiMethod, message }: useMemberAuthProps) => {
  const onSuccess = useMemberOnSuccess(message, PATH.HOME);
  return useGenericMutation<MemberType, AuthType>({
    apiMethod,
    onSuccess,
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
