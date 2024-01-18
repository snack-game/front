import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSetRecoilState } from 'recoil';

import GoogleSingIn from '@assets/images/google.png';
import KaKaoSingIn from '@assets/images/kakao.png';
import { userState } from '@utils/atoms/member.atom';
import { MemberType } from '@utils/types/member.type';

import PATH from '@constants/path.constant';
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
      openToast('로그인 성공!', 'success');
      setUserState(() => ({
        member,
        accessToken,
      }));
    }

    if (event.data.type === 'oAuthError') {
      openToast('로그인 실패', 'error');
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
    <div className={'flex h-full flex-col items-center justify-evenly'}>
      <div className={'flex w-full flex-col items-center gap-4'}>
        <span className={'font-semibold text-primary'}>나는 몇 등일까?</span>
        <div
          className={
            'mx-auto w-1/2 rounded-xl border-2 border-primary px-4 py-2 text-center'
          }
        >
          <span>??? 등</span>
        </div>
      </div>
      <div className={'flex flex-col items-center'}>
        <span className={'mt-2 text-xs text-gray-400 '}>
          간편하게 시작하기!
        </span>
        <div className={'mt-6 flex justify-center gap-12'}>
          <div
            className={'h-12 w-12 cursor-pointer rounded-full shadow-xl'}
            onClick={() =>
              openOAuthDialog({ url: PATH.GOOGLE, name: 'Login with Google' })
            }
          >
            <img src={GoogleSingIn} alt={'구글 로그인'} />
          </div>
          <div
            className={'h-12 w-12 cursor-pointer rounded-full shadow-xl'}
            onClick={() =>
              openOAuthDialog({ url: PATH.KAKAO, name: 'Login with KAKAO' })
            }
          >
            <img src={KaKaoSingIn} alt={'카카오 로그인'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OAuth;
