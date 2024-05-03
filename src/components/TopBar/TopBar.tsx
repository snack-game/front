import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import DownArrow from '@assets/icon/down-arrow.svg?react';
import RouterLink from '@components/RouterLink/RouterLink';
import Spacing from '@components/Spacing/Spacing';
import { userState } from '@utils/atoms/member.atom';

import PATH from '@constants/path.constant';

const TopBar = ({ title, backUrl }: { title: string; backUrl: string }) => {
  const navigate = useNavigate();
  const userStateValue = useRecoilValue(userState);

  useEffect(() => {
    if (!userStateValue.id) {
      navigate(PATH.AUTH, { replace: true });
    }
  }, []);

  return (
    <>
      <div className="fixed top-0 flex h-12 w-screen items-center justify-between border-b-[1px] border-gray-200 bg-primary-light">
        <RouterLink to={backUrl} className="z-10 ml-4">
          <DownArrow className="h-8 w-8 rotate-90 text-black" />
        </RouterLink>
        <p className="absolute w-full text-center text-lg font-semibold">
          {title}
        </p>
      </div>
      <Spacing size={3} />
    </>
  );
};

export default TopBar;
