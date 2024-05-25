import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';

import First from '@assets/images/first.png';
import Second from '@assets/images/second.png';
import Third from '@assets/images/third.png';
import { Level } from '@components/Level/Level';
import { RankingType } from '@utils/types/common.type';

interface TopRankingProps {
  topRanking: RankingType[];
}

const loadedImages = [First, Second, Third].map((src) => {
  const img = new Image();
  img.src = src;
  return img;
});

const TopRanking = ({ topRanking }: TopRankingProps) => {
  const { t } = useTranslation();

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
            className={`flex flex-col items-center gap-4 font-semibold text-primary-deep-dark
            ${index == 0 && 'order-2 -mt-12'}
            ${index == 1 && 'order-1'}
            ${index == 2 && 'order-3'}`}
          >
            <img
              className={'h-16 w-16 lg:h-20 lg:w-20'}
              src={loadedImages[top.rank - 1].src}
              alt={`ranking ${top.rank} image`}
            />
            <div className={'flex flex-col items-center justify-center gap-2'}>
              <div className={'flex flex-col items-center'}>
                {top.owner.group && (
                  <span className={'text-xs font-bold'}>
                    {top.owner.group.name}
                  </span>
                )}
                <span className={'text-xl text-primary'}>{top.owner.name}</span>
                {top.owner.status?.level !== undefined && (
                  <Level level={top.owner.status.level} />
                )}
              </div>
              <span>{top.score + t('game_score')}</span>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default TopRanking;
