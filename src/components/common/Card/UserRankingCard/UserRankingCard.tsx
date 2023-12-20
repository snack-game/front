import { useTranslation } from 'react-i18next';

import * as Styled from '@components/common/Card/UserRankingCard/UserRankingCard.style';

import { useGetUserRanking } from '@hooks/queries/ranking.query';

const UserRankingCard = () => {
  const { t } = useTranslation();
  const userRanking = useGetUserRanking();

  return (
    <>
      {userRanking?.rank && (
        <Styled.UserRankingCardWrapper>
          <Styled.UserRankingCardItem>
            <p>{userRanking.owner.name}</p>
            <p>{userRanking.owner.group?.name || t('group_none')}</p>
            <span>{`${t('rank_title')} ${userRanking.rank}${t('rank')}!`}</span>
            <span>{`${userRanking.score}${t('game_score')}!`}</span>
          </Styled.UserRankingCardItem>
        </Styled.UserRankingCardWrapper>
      )}
    </>
  );
};

export default UserRankingCard;
