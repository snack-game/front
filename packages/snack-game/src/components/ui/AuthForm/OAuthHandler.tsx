import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import { userState } from '@utils/atoms/member.atom';

import PATH from '@constants/path.constant';
import { useSocial } from '@hooks/queries/auth.query';
import { useIntegrateMember } from '@hooks/queries/members.query';

const OAuthHandler = () => {
  const navigate = useNavigate();
  const userStateValue = useRecoilValue(userState);
  const integrateMember = useIntegrateMember();
  const oAuthToken = useSocial();

  const handleOAuthLogin = async () => {
    if (userStateValue.member.type == 'GUEST' && userStateValue.accessToken) {
      await integrateMember.mutateAsync();
    } else {
      await oAuthToken.mutateAsync();
    }

    navigate(PATH.HOME);
  };

  useEffect(() => {
    handleOAuthLogin();
  }, []);

  return <></>;
};

export default OAuthHandler;
