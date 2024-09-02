import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import AppleSignin from '@assets/images/apple.png';
import GoogleSignin from '@assets/images/google.png';
import KakaoSignin from '@assets/images/kakao.png';
import { userState } from '@utils/atoms/member.atom';
import { MemberType } from '@utils/types/member.type';
import { isApp, isIOSApp } from '@utils/userAgentIdentifier';

import { QUERY_KEY } from '@constants/api.constant';
import { LOCAL_STORAGE_KEY } from '@constants/localStorage.constant';
import PATH from '@constants/path.constant';
import useLocalStorage from '@hooks/useLocalStorage';
import useToast from '@hooks/useToast';

interface DialogProps {
  url: string;
  name: string;
}

interface OAuthContainerProps {
  oAuthOnSuccess: () => Promise<MemberType>;
}

const OAuth = ({ oAuthOnSuccess }: OAuthContainerProps) => {
  const { t } = useTranslation();
  const [popup, setPopup] = useState<boolean>(false);
  const { setStorageValue } = useLocalStorage({
    key: LOCAL_STORAGE_KEY.USER_EXPIRE_TIME,
  });

  const setUserState = useSetRecoilState(userState);
  const openToast = useToast();

  const queryClient = useQueryClient();

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
      oAuthSuccessHandler();
    }
    if (event.data.type === 'oAuthError') {
      oAuthFailureHandler();
    }
  };

  const oAuthSuccessHandler = async () => {
    const member = await oAuthOnSuccess();
    openToast(t('login_success'), 'success');
    setUserState(() => ({
      ...member,
    }));
    setStorageValue(Date.now());

    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER_PROFILE] });
  };

  const oAuthFailureHandler = async () => {
    openToast(t('login_fail'), 'error');
  };

  const requestAppOAuth = (provider: 'google' | 'kakao' | 'apple') => {
    dispatchEvent(
      new CustomEvent(`app-oauth-requested`, { detail: { provider } }),
    );
  };

  useEffect(() => {
    if (!popup) return;

    window.addEventListener('message', OAuthListener, false);
    return () => {
      window.removeEventListener('message', OAuthListener);
      setPopup(!popup);
    };
  }, [popup]);

  useEffect(() => {
    window.addEventListener('app-oauth-succeeded', oAuthSuccessHandler);
    window.addEventListener('app-oauth-failed', oAuthFailureHandler);

    return () => {
      window.removeEventListener('app-oauth-succeeded', oAuthSuccessHandler);
      window.removeEventListener('app-oauth-failed', oAuthFailureHandler);
    };
  }, []);

  return (
    <div className={'flex flex-grow flex-col items-center justify-evenly'}>
      <div className={'flex w-full flex-col items-center gap-4'}>
        <span className={'font-semibold text-primary'}>{t('what_rank')}</span>
        <div
          className={
            'mx-auto w-1/2 rounded-xl border-2 border-primary px-4 py-2 text-center'
          }
        >
          <span>??? {t('rank')}</span>
        </div>
      </div>
      <div className={'flex flex-col items-center'}>
        <span className={'mt-2 text-xs text-gray-400 '}>
          {t('login_oauth')}
        </span>
        <div className={'mt-6 flex justify-center gap-12'}>
          <div
            className={'h-12 w-12 cursor-pointer rounded-full shadow-xl'}
            onClick={() => {
              if (isApp()) {
                requestAppOAuth('google');
                return;
              }
              openOAuthDialog({ url: PATH.GOOGLE, name: 'Signin with Google' });
            }}
          >
            <img src={GoogleSignin} alt={'구글 로그인'} />
          </div>
          <div
            className={'h-12 w-12 cursor-pointer rounded-full shadow-xl'}
            onClick={() => {
              if (isApp()) {
                requestAppOAuth('kakao');
                return;
              }
              openOAuthDialog({ url: PATH.KAKAO, name: 'Signin with Kakao' });
            }}
          >
            <img src={KakaoSignin} alt={'카카오 로그인'} />
          </div>
          {isIOSApp() && (
            <div
              className={'h-12 w-12 cursor-pointer rounded-full shadow-xl'}
              onClick={() => requestAppOAuth('apple')}
            >
              <img src={AppleSignin} alt={'Signin with Apple'} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OAuth;
