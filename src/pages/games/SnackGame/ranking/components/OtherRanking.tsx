import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';

import { Level } from '@components/Level/Level';
import { RankingType } from '@utils/types/ranking.type';

interface OtherRankingProps {
  otherRanking: RankingType[];
}

const OtherRanking = ({ otherRanking }: OtherRankingProps) => {
  const { t } = useTranslation('ranking');

  return (
    <table className={'mx-auto mt-10 w-full table-fixed lg:mt-24 lg:w-[80%]'}>
      <thead className={'h-10 bg-primary text-primary-light'}>
        <tr>
          <th className={'w-[20%]'}>#</th>
          <th>{t('name_column')}</th>
          <th className={'w-[20%]'}>{t('score_column')}</th>
        </tr>
      </thead>
      <motion.tbody>
        {otherRanking.map((rank, index) => {
          return (
            <motion.tr
              key={`rank-${index}-${rank.owner.name}`}
              className={'h-24 border-b-2 border-b-gray-200 font-semibold'}
              initial={{ y: -40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.1, type: 'spring', stiffness: 150 }}
              viewport={{ once: true }}
            >
              <td className={'text-center'}>{rank.rank}</td>
              <td>
                <div className={'flex flex-col justify-start'}>
                  <span className={'text-xs'}>
                    {rank.owner.group && rank.owner.group.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={'text-lg text-primary'}>
                      {rank.owner.name}
                    </span>
                    {rank.owner.status?.level !== undefined && (
                      <Level level={rank.owner.status.level} />
                    )}
                  </div>
                </div>
              </td>
              <td className={'text-center'}>{rank.score}</td>
            </motion.tr>
          );
        })}
      </motion.tbody>
    </table>
  );
};

export default OtherRanking;
