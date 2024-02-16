import { useState } from 'react';

const ChartSection = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const tabOption = ['탭 0', '탭 1'];

  const onClick = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

  return (
    <div className={`w-4/5 rounded-md bg-white px-4 py-2`}>
      <div>
        {tabOption.map((tab, index) => (
          <span
            className={`mr-4 cursor-pointer text-lg ${
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
      {currentTab}번째 탭 조회중
    </div>
  );
};

export default ChartSection;
