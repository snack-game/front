import { useSetRecoilState } from 'recoil';

import membersApi from '@api/members.api';
import { userState } from '@utils/atoms/member.atom';
import { AuthType, MemberType } from '@utils/types/member.type';

import { TOAST_MESSAGE } from '@constants/toast.constant';
import useGenericMutation from '@hooks/useGenericMutation';
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
  const onSuccess = useMemberOnSuccess(message);
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
