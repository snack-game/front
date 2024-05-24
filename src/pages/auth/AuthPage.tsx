import { useState, useEffect, useRef, RefObject } from 'react';
import { useNavigate } from 'react-router-dom';

import gsap from 'gsap';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import GoogleIcon from '@assets/icon/google.svg?react';
import KakakoIcon from '@assets/icon/kakao.svg?react';
import LogoImage from '@assets/images/logo-snack-game-letter.png';
import SnackRainContainer from '@components/SnackRain/SnackRainContainer';
import { userState } from '@utils/atoms/member.atom';

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
  const logoRef = useRef<HTMLImageElement>(null);

  const guestMutation = useGuest();
  const navigate = useNavigate();
  const oAuthToken = useSocial();
  const [popup, setPopup] = useState<boolean>(false);
  const { setStorageValue } = useLocalStorage({
    key: LOCAL_STORAGE_KEY.USER_EXPIRE_TIME,
  });
  const userStateValue = useRecoilValue(userState);

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
      navigate(PATH.SNACK_GAME, { replace: true });
    }

    if (event.data.type === 'oAuthError') {
      openToast('로그인 실패', 'error');
    }
  };

  const handleGuestLogin = () => {
    guestMutation.mutateAsync().then(() => {
      navigate(PATH.SNACK_GAME, { replace: true });
    });
  };

  const authPageLogoAnimation = (ref: RefObject<HTMLImageElement>) => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      y: 50,
      yoyo: true,
      rotate: -2,
      repeat: -1,
      duration: 1,
    });
  };

  useEffect(() => {
    authPageLogoAnimation(logoRef);
  }, [logoRef.current]);

  useEffect(() => {
    if (userStateValue.id) {
      navigate(PATH.SNACK_GAME, { replace: true });
    }
    if (!popup) return;

    window.addEventListener('message', OAuthListener, false);
    return () => {
      window.removeEventListener('message', OAuthListener);
      setPopup(!popup);
    };
  }, [popup]);

  return (
    <>
      <SnackRainContainer />
      <div className="h-screen w-screen ">
        <div className="flex h-full flex-col justify-evenly">
          <div className="flex h-full flex-col items-center justify-evenly gap-4 text-3xl text-primary-deep-dark">
            <img
              className="w-1/2 "
              ref={logoRef}
              src={LogoImage}
              alt="무한 모드"
            />
          </div>
          <div className="mx-auto my-12 flex w-5/6  flex-col items-center justify-end gap-4">
            <div
              className="mx-4 flex h-10 w-full max-w-52 items-center justify-center gap-4 rounded-xl bg-[#FEE500]"
              onClick={() =>
                openOAuthDialog({ url: PATH.KAKAO, name: 'Login with KAKAO' })
              }
            >
              <KakakoIcon className="h-10 w-10" />
              <span className="w-20  text-center text-sm">카카오 로그인</span>
            </div>
            <div
              className="mx-4 flex h-10 w-full max-w-52 items-center justify-center gap-4 rounded-xl bg-white"
              onClick={() =>
                openOAuthDialog({ url: PATH.GOOGLE, name: 'Login with Google' })
              }
            >
              <GoogleIcon className="h-10 w-10" />
              <span className="w-20 text-center text-sm text-[#6B7280]">
                구글 로그인
              </span>
            </div>
            <div className="text-gray-400" onClick={handleGuestLogin}>
              게스트로 시작하기
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
