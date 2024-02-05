import { useState } from 'react';

const HistoryChart = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const tabOption = ['탭 0', '탭 1'];

  const onClick = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

  return (
    <div className={`h-56 w-4/5`}>
      <div className={`flex gap-2`}>
        {tabOption.map((tab, index) => (
          <span
            className={`cursor-pointer text-lg ${
              currentTab === index ? 'text-primary' : 'text-[#6B7280]'
            }`}
            key={tab}
            onClick={() => {
              onClick(index);
            }}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className={`mt-2 h-52 w-full rounded-md bg-game`}>
        {currentTab}번째 탭 조회중
      </div>
    </div>
  );
};

export default HistoryChart;
