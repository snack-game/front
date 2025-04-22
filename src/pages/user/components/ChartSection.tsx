import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import QueryBoundary from '@components/base/QueryBoundary';
import RetryError from '@components/Error/RetryError';
import Spacing from '@components/Spacing/Spacing';
import { Tab, TabOptionType } from '@components/Tab/Tab';
import { HistoryViewType } from '@utils/types/history.type';

import { HistoryLineChart } from './HistoryLineChart';

const ChartSection = () => {
  const { t } = useTranslation('user');

  const [currentTab, setCurrentTab] = useState<HistoryViewType>('DATE');
  const tabOptions: TabOptionType[] = [
    { name: t('graph_week'), onClick: () => setCurrentTab('DATE') },
    { name: t('graph_recent'), onClick: () => setCurrentTab('SESSION') },
  ];

  return (
    <div className={'w-full bg-white px-4 py-2'}>
      <Tab options={tabOptions} />
      <Spacing size={2} />
      <QueryBoundary errorFallback={RetryError}>
        <HistoryLineChart currentTab={currentTab} />
      </QueryBoundary>
    </div>
  );
};

export default ChartSection;
