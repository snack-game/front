import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import QueryBoundary from '@components/base/QueryBoundary';
import Dropdown, { DropDownOptionType } from '@components/DropDown/DropDown';
import RetryError from '@components/Error/RetryError';
import Spacing from '@components/Spacing/Spacing';
import { Tab, TabOptionType } from '@components/Tab/Tab';
import RankingSection from '@pages/games/SnackGame/ranking/components/RankingSection';
import { RankingViewType } from '@utils/types/common.type';

import { useGetSeasons } from '@hooks/queries/ranking.query';

import { NoticeSection } from './components/NoticeSection';

const RankingPage = () => {
  const { t } = useTranslation('ranking');

  const seasonData = useGetSeasons();
  const latestSeason = seasonData[seasonData.length - 1].id;

  const tabOptions: TabOptionType[] = [
    { name: t('ranking_default'), onClick: () => setCurrentTab(2) },
    { name: t('ranking_infinite'), onClick: () => setCurrentTab(3) },
  ];
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

  const [currentTab, setCurrentTab] = useState<RankingViewType>(2);
  const [selectedSeason, setSelectedSeason] = useState<number>(latestSeason);

  return (
    <>
      <Helmet>
        <title>Snack Game || Ranking</title>
      </Helmet>

      <Spacing size={2} />
      <div className="mx-auto w-[90%] max-w-4xl">
        <NoticeSection />
        <Spacing size={1} />
        {/* TODO: 무한모드 준비 끝나면 해제 */}
        {/* <Tab options={tabOptions} /> */}
        <Dropdown
          initialOption={latestSeason}
          options={dropdownOptions}
          className="max-w-[120px]"
        />
      </div>
      {/* TODO: 무한모드 준비 끝나면 gameId={currentTab} 으로 수정 */}
      <QueryBoundary errorFallback={RetryError}>
        <RankingSection season={selectedSeason} gameId={2} />
      </QueryBoundary>
    </>
  );
};

export default RankingPage;
