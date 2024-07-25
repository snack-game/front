import { useLocation } from 'react-router-dom';

import GameIcon from '@assets/icon/game.svg?react';
import ProfileIcon from '@assets/icon/profile.svg?react';
import RankingIcon from '@assets/icon/ranking.svg?react';
import RouterLink from '@components/RouterLink/RouterLink';

import PATH from '@constants/path.constant';

export const BottomNav = () => {
  const location = useLocation().pathname;

  return (
    <div className="fixed bottom-0 z-bottomNav flex w-full justify-center">
      <div className="flex h-16 w-full max-w-3xl items-center justify-around rounded-t-2xl bg-primary-light text-gray-500 shadow-navigation">
        <RouterLink
          to={PATH.SNACK_GAME}
          className={'flex-col items-center justify-between'}
          isActivated={location == PATH.SNACK_GAME}
        >
          <GameIcon className={'h-6 w-6'} />
          <span>게임</span>
        </RouterLink>
        <RouterLink
          to={PATH.SNACK_GAME_RANKING}
          className={'flex-col items-center justify-between'}
          isActivated={location == PATH.SNACK_GAME_RANKING}
        >
          <RankingIcon className={'h-6 w-6'} />
          <span>랭킹</span>
        </RouterLink>
        <RouterLink
          to={PATH.USER}
          className={'flex-col items-center justify-between'}
          isActivated={location == PATH.USER}
        >
          <ProfileIcon className={'h-6 w-6'} />
          <span>프로필</span>
        </RouterLink>
      </div>
    </div>
  );
};
