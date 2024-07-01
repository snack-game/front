import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import Dropdown, { DropDownOptionType } from '@components/DropDown/DropDown';
import Spacing from '@components/Spacing/Spacing';
import RankingSection from '@pages/games/SnackGame/ranking/components/RankingSection';
import { RankingViewType } from '@utils/types/common.type';

import { useGetSeasons } from '@hooks/queries/ranking.query';

interface RankTabInfo {
  name: string;
  gameId: RankingViewType;
}

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
  const TAB_OPTIONS: RankTabInfo[] = [
    { name: 'ranking_default', gameId: 2 },
    { name: 'ranking_infinite', gameId: 3 },
  ];
  const [currentTab, setCurrentTab] = useState<RankingViewType>(2);
  const [selectedSeason, setSelectedSeason] = useState<number>(latestSeason);

  return (
    <>
      <Helmet>
        <title>Snack Game || Ranking</title>
      </Helmet>

      <Spacing size={2} />
      <div className="mx-auto w-[90%] max-w-4xl">
        {TAB_OPTIONS.map(({ name, gameId }) => (
          <span
            className={`mr-4 cursor-pointer text-lg ${
              currentTab === gameId ? 'text-primary' : 'text-[#6B7280]'
            }`}
            key={name}
            onClick={() => setCurrentTab(gameId)}
          >
            {t(name)}
          </span>
        ))}
        <Spacing size={1} />
        <Dropdown
          initialOption={latestSeason}
          options={dropdownOptions}
          className="max-w-[120px]"
        />
      </div>
      <Spacing size={6} />
      {/* TODO: 무한모드 준비 끝나면 gameId={currentTab} 으로 수정 */}
      <RankingSection season={selectedSeason} gameId={2} />
    </>
  );
};

export default RankingPage;
