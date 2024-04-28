import { Line } from 'react-chartjs-2';

import {
  ChartOptions,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';

import { GameHistoryResponse } from '@utils/types/common.type';

ChartJS.defaults.font.family = 'DovemayoGothic';
ChartJS.defaults.font.size = 18;
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

export const HistoryLineChart = ({
  history,
}: {
  history: GameHistoryResponse[];
}) => {
  const scores: number[] = history.map((round) => round.score);
  const labels: string[] = history.map((round) => {
    const [, month, day] = round.updatedAt.split('-');
    return `${month}/${day}`;
  });

  const data = {
    labels,
    datasets: [
      {
        data: scores,
        borderColor: '#EF8B5A',
        borderWidth: 2,
        pointBackgroundColor: '#EF8B5A',
        pointRadius: 4,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    scales: {
      x: {
        grid: { display: false },
        offset: true,
      },
    },
    plugins: {
      tooltip: {
        yAlign: 'bottom',
        caretSize: 0,
        caretPadding: 12,

        backgroundColor: '#FFFFFF',
        bodyColor: '#000000',
        borderWidth: 2,
        borderColor: '#EF8B5A',
        cornerRadius: 10,

        displayColors: false,
        callbacks: {
          title: () => '',
        },
      },
      datalabels: {
        display: false,
      },
    },
  };

  return <Line data={data} options={options} />;
};
