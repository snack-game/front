import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSetRecoilState } from 'recoil';

import GoogleIcon from '@assets/icon/google.svg?react';
import KakakoIcon from '@assets/icon/kakao.svg?react';
import Lottie from '@components/Lottie/Lottie';
import { userState } from '@utils/atoms/member.atom';
import { lottieOptions } from '@utils/commonFuc';

import { LOCAL_STORAGE_KEY } from '@constants/localStorage.constant';
import PATH from '@constants/path.constant';
import { useGuest, useSocial } from '@hooks/queries/auth.query';
import useLocalStorage from '@hooks/useLocalStorage';
import useToast from '@hooks/useToast';

interface DialogProps {
  url: string;
  name: string;
}

export const AuthPage = () => {
  const guestMutation = useGuest();
  const navigate = useNavigate();
  const oAuthToken = useSocial();
  const [popup, setPopup] = useState<boolean>(false);
  const { setStorageValue } = useLocalStorage({
    key: LOCAL_STORAGE_KEY.USER_EXPIRE_TIME,
  });

  const setUserState = useSetRecoilState(userState);
  const openToast = useToast();

  const onOAuthSuccess = async () => {
    const member = await oAuthToken.mutateAsync();
    return member;
  };

  const openOAuthDialog = ({ url, name }: DialogProps) => {
    const oAuthURL = import.meta.env.VITE_API_URL + url;
    const width = 600;
    const height = 800;

    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    window.open(
      oAuthURL,
      name,
      `menubar=no,toolbar=no,status=no,width=${width},height=${height},left=${left},top=${top}`,
    );
    setPopup(!popup);
  };

  const OAuthListener = async (event: MessageEvent) => {
    if (event.origin !== window.location.origin) return;

    if (event.data.type === 'oAuthSuccess') {
      const member = await onOAuthSuccess();
      openToast('로그인 성공!', 'success');
      setUserState(() => ({
        ...member,
      }));
      setStorageValue(Date.now());
      navigate(PATH.APPLE_GAME, { replace: true });
    }

    if (event.data.type === 'oAuthError') {
      openToast('로그인 실패', 'error');
    }
  };

  const handleGuestLogin = () => {
    guestMutation.mutateAsync().then(() => {
      navigate(PATH.APPLE_GAME, { replace: true });
    });
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
    <div className="h-screen w-screen bg-game">
      <div className="flex h-full flex-col justify-evenly">
        <div className="flex h-full flex-col items-center justify-center gap-4 text-3xl text-primary-deep-dark">
          <Lottie lottieOptions={lottieOptions} className="max-w-80" />
          <div>스낵 게임</div>
        </div>
        <div className="mx-auto my-12 flex w-5/6  flex-col items-center justify-end gap-4">
          <div
            className="flex h-10 w-full max-w-52 items-center justify-center gap-4 rounded-xl bg-[#FEE500]"
            onClick={() =>
              openOAuthDialog({ url: PATH.KAKAO, name: 'Login with KAKAO' })
            }
          >
            <KakakoIcon className="h-10 w-10" />
            <span className="text-sm">카카오 로그인</span>
          </div>
          <div
            className="flex h-10 w-full max-w-52 items-center justify-center gap-4 rounded-xl bg-white"
            onClick={() =>
              openOAuthDialog({ url: PATH.GOOGLE, name: 'Login with Google' })
            }
          >
            <GoogleIcon className="h-10 w-10" />
            <span className="text-sm text-[#6B7280]">구글 로그인</span>
          </div>
          <div className="text-gray-400" onClick={handleGuestLogin}>
            게스트로 시작하기
          </div>
        </div>
      </div>
    </div>
  );
};
