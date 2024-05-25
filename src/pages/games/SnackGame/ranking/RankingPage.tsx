import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import Dropdown, { DropDownOptionType } from '@components/DropDown/DropDown';
import Spacing from '@components/Spacing/Spacing';
import RankingSection from '@pages/games/SnackGame/ranking/components/RankingSection';

import { useGetSeasons } from '@hooks/queries/ranking.query';

const RankingPage = () => {
  const { t } = useTranslation();

  const seasonData = useGetSeasons();
  const latestSeason = seasonData[seasonData.length - 1].id;
  const dropdownOptions: DropDownOptionType[] = [
    {
      name: t('rank_all_season'),
      onClick: () => setSelectedSeason(0),
    },
    ...seasonData.map((season) => ({
      name: t('rank_season', { season: season.id - 1 }), // TODO: 베타 시즌을 시즌 0으로 띄우는 문제 (별도 처리 필요)
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
      <Spacing size={8} />
      <RankingSection season={selectedSeason} />
    </>
  );
};

export default RankingPage;
