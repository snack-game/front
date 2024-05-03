import { useState } from 'react';

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
  const TAB_OPTIONS: TabInfo[] = [
    { name: '일주일간 최고 점수', by: 'DATE' },
    { name: '최근 점수', by: 'SESSION' },
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
          {name}
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
