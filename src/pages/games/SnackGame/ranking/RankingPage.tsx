import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Dropdown, { DropDownOptionType } from '@components/DropDown/DropDown';
import Footer from '@components/Footer/Footer';
import Spacing from '@components/Spacing/Spacing';
import AppleGameHeader from '@pages/games/SnackGame/components/AppleGameHeader';
import RankingSection from '@pages/games/SnackGame/ranking/components/RankingSection';

import { useGetSeasons } from '@hooks/queries/ranking.query';

const RankingPage = () => {
  const seasonData = useGetSeasons();
  const latestSeason = seasonData[seasonData.length - 1].id;
  const dropdownOptions: DropDownOptionType[] = [
    {
      name: '전체',
      onClick: () => setSelectedSeason(0),
    },
    ...seasonData.map((season) => ({
      name: season.name,
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
