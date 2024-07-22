import { Doughnut } from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement, ChartOptions } from 'chart.js';

import { StatusType } from '@utils/types/member.type';

import { PRIMARY_COLOR, TIER_COLOR } from '@constants/common.constant';

ChartJS.register(ArcElement);

const ExpChart = ({ status }: { status: StatusType }) => {
  const { level, exp, maxExp } = status;
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

  const options: ChartOptions<'doughnut'> = {
    plugins: {
      datalabels: {
        display: false,
      },
    },
    events: [],
  };

  function calculateData() {
    const currentRatio = (exp / maxExp) * 100;
    return [currentRatio, 100 - currentRatio];
  }

  return (
    <div className="flex h-44 w-44 justify-center">
      <Doughnut data={data} options={options} />
      <div
        className={`z-levelBadge absolute bottom-[-16px] flex h-10 w-10 items-center justify-center rounded-full text-xl text-white drop-shadow`}
        style={{ backgroundColor: TIER_COLOR[tier] }}
      >
        {level}
      </div>
    </div>
  );
};

export default ExpChart;
