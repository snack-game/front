import { useEffect } from 'react';

import { useRecoilValue } from 'recoil';

import { userState } from '@utils/atoms/member.atom';
import { MemberType } from '@utils/types/member.type';

import { useSocial } from '@hooks/queries/auth.query';
import { useIntegrateMember } from '@hooks/queries/members.query';

const useOAuth = () => {
  const userStateValue = useRecoilValue(userState);
  const integrateMember = useIntegrateMember();
  const oAuthToken = useSocial();

  const handleOAuthLogin = async () => {
    try {
      if (window.opener) {
        let memberData: MemberType;
        if (
          userStateValue.member.type == 'GUEST' &&
          userStateValue.accessToken
        ) {
          memberData = await integrateMember.mutateAsync();
        } else {
          memberData = await oAuthToken.mutateAsync();
        }

        window.opener.postMessage(
          { type: 'oAuth', memberData },
          window.location.origin,
        );
        window.close();
      }
    } catch (e) {
      window.opener.postMessage({ type: 'oAuthError' }, window.location.origin);
      window.close();
    }
  };

  useEffect(() => {
    handleOAuthLogin();
  }, []);
};

export default useOAuth;
