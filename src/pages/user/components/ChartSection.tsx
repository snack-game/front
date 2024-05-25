import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import QueryBoundary from '@components/base/QueryBoundary';
import RetryError from '@components/Error/RetryError';
import Spacing from '@components/Spacing/Spacing';
import { HistoryViewType } from '@utils/types/common.type';

import { HistoryLineChart } from './HistoryLineChart';

interface TabInfo {
  name: string;
  by: HistoryViewType;
}

const ChartSection = () => {
  const { t } = useTranslation();

  const TAB_OPTIONS: TabInfo[] = [
    { name: 'user_graph_week', by: 'DATE' },
    { name: 'user_graph_recent', by: 'SESSION' },
  ];
  const [currentTab, setCurrentTab] = useState<HistoryViewType>('DATE');

  return (
    <div className={'w-full bg-white px-4 py-2'}>
      {TAB_OPTIONS.map(({ name, by }) => (
        <span
          className={`mr-4 cursor-pointer text-lg ${
            currentTab === by ? 'text-primary' : 'text-[#6B7280]'
          }`}
          key={name}
          onClick={() => setCurrentTab(by)}
        >
          {t(name)}
        </span>
      ))}
      <Spacing size={2} />
      <QueryBoundary errorFallback={RetryError}>
        <HistoryLineChart currentTab={currentTab} />
      </QueryBoundary>
    </div>
  );
};

export default ChartSection;
