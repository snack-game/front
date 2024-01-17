import { useLocation } from 'react-router-dom';

import GameIcon from '@assets/icon/game.svg?react';
import RankingIcon from '@assets/icon/ranking.svg?react';
import Header from '@components/Header/Header';
import RouterLink from '@components/RouterLink/RouterLink';
import Spacing from '@components/Spacing/Spacing';

import PATH from '@constants/path.constant';

const AppleGameHeader = () => {
  return <Header nav={<HeaderNav />} />;
};

const HeaderNav = () => {
  const location = useLocation().pathname;

  console.log(PATH.APPLE_GAME);
  return (
    <div className={'flex'}>
      <RouterLink
        to={PATH.APPLE_GAME}
        className={'items-center'}
        isActivated={location == PATH.APPLE_GAME}
      >
        <GameIcon className={'mr-4 h-6 w-6'} />
        <span>게임</span>
      </RouterLink>

      <Spacing size={3} direction={'horizontal'} />

      <RouterLink
        to={PATH.APPLE_GAME_RANKING}
        className={'items-center'}
        isActivated={location == PATH.APPLE_GAME_RANKING}
      >
        <RankingIcon className={'mr-4 h-6 w-6'} />
        <span>랭킹</span>
      </RouterLink>
    </div>
  );
};

export default AppleGameHeader;
