import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';

import First from '@assets/images/first.avif';
import FirstWebp from '@assets/images/first.webp';
import Second from '@assets/images/second.avif';
import SecondWebp from '@assets/images/second.webp';
import Third from '@assets/images/third.avif';
import ThirdWebp from '@assets/images/third.webp';
import ImageWithFallback from '@components/ImageWithFallback/ImageWithFallback';
import { Level } from '@components/Level/Level';
import { RankingType } from '@utils/types/ranking.type';

interface TopRankingProps {
  topRanking: RankingType[];
}

const TOP_RANKING_IMAGES = [
  [First, FirstWebp],
  [Second, SecondWebp],
  [Third, ThirdWebp],
];

const TopRanking = ({ topRanking }: TopRankingProps) => {
  const { t } = useTranslation('ranking');

  return (
    <motion.div
      className={'flex flex-row justify-around'}
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
      viewport={{ once: true }}
    >
      {topRanking.map((top, index) => {
        return (
          <div
            key={`top-rank-${top.owner.name}`}
            className={`flex flex-1 flex-col items-center gap-4 font-semibold text-primary-deep-dark
            ${index == 0 && 'order-2 -mt-12'}
            ${index == 1 && 'order-1'}
            ${index == 2 && 'order-3'}`}
          >
            <ImageWithFallback
              sources={[
                { srcSet: TOP_RANKING_IMAGES[top.rank - 1][0], type: 'avif' },
              ]}
              src={TOP_RANKING_IMAGES[top.rank - 1][1]}
              alt={`ranking ${top.rank} image`}
              className={'h-16 w-16 lg:h-20 lg:w-20'}
            />
            <div className={'flex flex-col items-center justify-center gap-2'}>
              <div className={'flex flex-col items-center'}>
                {top.owner.group && (
                  <span className={'text-xs font-bold'}>
                    {top.owner.group.name}
                  </span>
                )}
                <span className={'text-center text-xl text-primary'}>
                  {top.owner.name}
                </span>
                {top.owner.status?.level !== undefined && (
                  <Level level={top.owner.status.level} />
                )}
              </div>
              <span>{top.score + t('score')}</span>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default TopRanking;
