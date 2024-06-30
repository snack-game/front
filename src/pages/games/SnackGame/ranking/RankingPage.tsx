import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import QueryBoundary from '@components/base/QueryBoundary';
import Dropdown, { DropDownOptionType } from '@components/DropDown/DropDown';
import RetryError from '@components/Error/RetryError';
import Spacing from '@components/Spacing/Spacing';
import RankingSection from '@pages/games/SnackGame/ranking/components/RankingSection';

import { useGetSeasons } from '@hooks/queries/ranking.query';

const RankingPage = () => {
  const { t } = useTranslation('ranking');

  const seasonData = useGetSeasons();
  const latestSeason = seasonData[seasonData.length - 1].id;
  const dropdownOptions: DropDownOptionType[] = [
    {
      name: t('all_season'),
      onClick: () => setSelectedSeason(0),
    },
    ...seasonData.map((season) => ({
      name: t('season', {
        season: season.id - 1,
        postProcess: 'seasonHandler',
      }),
      onClick: () => setSelectedSeason(season.id),
    })),
  ];

  const [selectedSeason, setSelectedSeason] = useState<number>(latestSeason);

  return (
    <>
      <Helmet>
        <title>Snack Game || Ranking</title>
      </Helmet>

      <Spacing size={2} />
      <div className="mx-auto w-[90%] max-w-4xl">
        <Dropdown
          initialOption={latestSeason}
          options={dropdownOptions}
          className="max-w-[120px]"
        />
      </div>
      <Spacing size={6} />
      <QueryBoundary errorFallback={RetryError}>
        <RankingSection season={selectedSeason} />
      </QueryBoundary>
    </>
  );
};

export default RankingPage;
