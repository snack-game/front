import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Dropdown, { DropDownOptionType } from '@components/DropDown/DropDown';
import Footer from '@components/Footer/Footer';
import Spacing from '@components/Spacing/Spacing';
import AppleGameHeader from '@pages/games/SnackGame/components/AppleGameHeader';
import RankingSection from '@pages/games/SnackGame/ranking/components/RankingSection';

const RankingPage = () => {
  const [selectedSeason, setSelectedSeason] = useState<number>(1);

  const dropdownOptions: DropDownOptionType[] = [
    {
      name: '전체',
      onClick: () => setSelectedSeason(0),
    },
    {
      name: '시즌 1',
      onClick: () => setSelectedSeason(1),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Snack Game || Ranking</title>
      </Helmet>

      <AppleGameHeader />
      <Spacing size={2} />
      <div className="mx-auto w-[90%] max-w-4xl">
        <Dropdown
          initialOption={1}
          options={dropdownOptions}
          className="max-w-[120px]"
        />
      </div>
      <Spacing size={8} />
      <RankingSection season={selectedSeason} />
      <Footer />
    </>
  );
};

export default RankingPage;
