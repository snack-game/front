import { useLocation } from 'react-router-dom';

import GameIcon from '@assets/icon/game.svg?react';
import RankingIcon from '@assets/icon/ranking.svg?react';
import Header from '@components/Header/Header';
import RouterLink from '@components/RouterLink/RouterLink';

import PATH from '@constants/path.constant';

const AppleGameHeader = () => {
  const location = useLocation().pathname;

  return (
    <Header>
      <Header.ListItem>
        <RouterLink
          to={PATH.SNACK_GAME}
          className={'items-center'}
          isActivated={location == PATH.SNACK_GAME}
        >
          <GameIcon className={'mr-4 h-6 w-6'} />
          <span>게임</span>
        </RouterLink>
      </Header.ListItem>
      <RouterLink
        to={PATH.SNACK_GAME_RANKING}
        className={'items-center'}
        isActivated={location == PATH.SNACK_GAME_RANKING}
      >
        <RankingIcon className={'mr-4 h-6 w-6'} />
        <span>랭킹</span>
      </RouterLink>
    </Header>
  );
};

export default AppleGameHeader;
