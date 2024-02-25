import { Doughnut } from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement } from 'chart.js';

import { StatusType } from '@utils/types/member.type';

import { TIER_COLOR, PRIMARY_COLOR } from '@constants/tier.constant';

ChartJS.register(ArcElement);

const ExpChart = ({ status }: { status: StatusType }) => {
  const { level, exp } = status;
  const tier = Math.floor(level / 10);

  const INITIAL_EXP_THRESHOLD = 200;
  const NEXT_THRESHOLD_RATIO = 1.2;

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
    const currentRatio =
      (exp / (INITIAL_EXP_THRESHOLD * NEXT_THRESHOLD_RATIO ** level)) * 100;

    return [currentRatio, 100 - currentRatio];
  }

  return (
    <div className="h-44 w-44">
      <Doughnut data={data} />
    </div>
  );
};

export default ExpChart;
