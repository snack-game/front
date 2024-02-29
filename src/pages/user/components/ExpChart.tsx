import { Doughnut } from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement } from 'chart.js';

import { StatusType } from '@utils/types/member.type';

import { TIER_COLOR, PRIMARY_COLOR } from '@constants/tier.constant';

ChartJS.register(ArcElement);

const ExpChart = ({ status }: { status: StatusType }) => {
  const { level, exp, maximumExp } = status;
  const tier = Math.floor(level / 10);

  const data = {
    datasets: [
      {
        data: calculateData(),
        backgroundColor: [TIER_COLOR[tier], PRIMARY_COLOR],
        borderWidth: 0,
      },
    ],
  };

  function calculateData() {
    const currentRatio = (exp / maximumExp) * 100;
    return [currentRatio, 100 - currentRatio];
  }

  return (
    <div className="flex h-44 w-44 justify-center">
      <Doughnut data={data} />
      <div
        className={`absolute bottom-[-16px] z-10 flex h-10 w-10 items-center justify-center rounded-full text-xl text-white drop-shadow`}
        style={{ backgroundColor: TIER_COLOR[tier] }}
      >
        {level}
      </div>
    </div>
  );
};

export default ExpChart;
