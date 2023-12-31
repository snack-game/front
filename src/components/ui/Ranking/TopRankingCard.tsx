import { useTranslation } from 'react-i18next';

import styled from '@emotion/styled';

import First from '@assets/images/first.png';
import Second from '@assets/images/second.png';
import Third from '@assets/images/third.png';
import ThumbnailCard from '@components/common/Card/ThumbnailCard/ThumbnailCard';
import { RankingType } from '@utils/types/common.type';

interface TopRankingCardProps {
  rankInfo: RankingType;
}

const loadedImages = [First, Second, Third].map((src) => {
  const img = new Image();
  img.src = src;
  return img;
});

const TopRankingCard = ({ rankInfo }: TopRankingCardProps) => {
  const { t } = useTranslation();

  return (
    <TopRankingCardWrapper rank={rankInfo.rank}>
      <ThumbnailCard
        imgSrc={loadedImages[rankInfo.rank - 1].src}
        title={rankInfo.owner.name}
        subTitle={rankInfo.owner.group?.name || t('group_none')}
        content={rankInfo.score + t('game_score') + '!'}
      ></ThumbnailCard>
    </TopRankingCardWrapper>
  );
};

interface TopRankingCardWrapperProps {
  rank: number;
}

const TopRankingCardWrapper = styled.div<TopRankingCardWrapperProps>`
  margin: auto;
  width: ${(props) => (props.rank === 1 ? '60%' : '40%')};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default TopRankingCard;
