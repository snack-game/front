import { useEffect, useState } from 'react';

import { useSetRecoilState } from 'recoil';

import GoogleSingIn from '@assets/images/google.png';
import KaKaoSingIn from '@assets/images/kakao.png';
import * as Styled from '@components/ui/AuthForm/Auth.style';
import { userState } from '@utils/atoms/member.atom';
import { MemberType } from '@utils/types/member.type';

import PATH from '@constants/path.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import useToast from '@hooks/useToast';

interface DialogProps {
  url: string;
  name: string;
}

interface OAuthContainerProps {
  oAuthOnSuccess: () => Promise<MemberType>;
}

const OAuthContainer = ({ oAuthOnSuccess }: OAuthContainerProps) => {
  const [popup, setPopup] = useState<boolean>(false);

  const setUserState = useSetRecoilState(userState);
  const openToast = useToast();

  const openOAuthDialog = ({ url, name }: DialogProps) => {
    const width = 600;
    const height = 800;

    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    window.open(
      url,
      name,
      `menubar=no,toolbar=no,status=no,width=${width},height=${height},left=${left},top=${top}`,
    );
    setPopup(!popup);
  };

  const OAuthListener = async (event: MessageEvent) => {
    if (event.origin !== window.location.origin) return;

    if (event.data.type === 'oAuthSuccess') {
      const { member, accessToken } = await oAuthOnSuccess();
      openToast(TOAST_MESSAGE.AUTH_SOCIAL, 'success');
      setUserState(() => ({
        member,
        accessToken,
      }));
    }

    if (event.data.type === 'oAuthError') {
      openToast(TOAST_MESSAGE.AUTH_ERROR, 'error');
    }
  };

  useEffect(() => {
    if (!popup) return;

    window.addEventListener('message', OAuthListener, false);
    return () => {
      window.removeEventListener('message', OAuthListener);
      setPopup(!popup);
    };
  }, [popup]);

  return (
    <Styled.SocialLoginImgContainer>
      <Styled.SocialLoginDiv
        onClick={() =>
          openOAuthDialog({ url: PATH.GOOGLE, name: 'Login with Google' })
        }
      >
        <img src={GoogleSingIn} alt={'구글 로그인'} />
      </Styled.SocialLoginDiv>
      <Styled.SocialLoginDiv
        onClick={() =>
          openOAuthDialog({ url: PATH.KAKAO, name: 'Login with KAKAO' })
        }
      >
        <img src={KaKaoSingIn} alt={'카카오 로그인'} />
      </Styled.SocialLoginDiv>
    </Styled.SocialLoginImgContainer>
  );
};

export default OAuthContainer;
