import { useState } from 'react';

import Spacing from '@components/Spacing/Spacing';

import { useGetGameHistory } from '@hooks/queries/history.query';

import { HistoryLineChart } from './HistoryLineChart';

type ViewType = 'DATE' | 'SESSION';
interface TabInfo {
  name: string;
  by: ViewType;
}

const ChartSection = () => {
  const TAB_OPTIONS: TabInfo[] = [
    { name: '일주일간 최고 점수', by: 'DATE' },
    { name: '최근 점수', by: 'SESSION' },
  ];
  const [currentTab, setCurrentTab] = useState<ViewType>('DATE');
  const data = useGetGameHistory(currentTab);

  return (
    <div className={'w-full bg-white px-4 py-2'}>
      <div>
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
      </div>
      <Spacing size={2} />
      <HistoryLineChart history={data} />
    </div>
  );
};

export default ChartSection;
