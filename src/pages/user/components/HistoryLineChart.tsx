import { Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

import {
  ChartOptions,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';

import { HistoryViewType } from '@utils/types/common.type';

import { useGetGameHistory } from '@hooks/queries/history.query';

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
  currentTab,
}: {
  currentTab: HistoryViewType;
}) => {
  const { t } = useTranslation('user');

  const history = useGetGameHistory(currentTab);

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
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    scales: {
      x: {
        grid: { display: false },
        offset: true,
        ticks: { display: false },
      },
    },
    plugins: {
      tooltip: {
        yAlign: 'bottom',
        caretSize: 0,
        caretPadding: 12,

        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#EF8B5A',
        cornerRadius: 10,

        titleColor: '#000000',
        titleAlign: 'center',
        bodyColor: '#000000',
        bodyAlign: 'center',
        displayColors: false,
      },
      datalabels: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  if (history.length < 3)
    return (
      <p className="mb-8 whitespace-pre-line text-center">{t('graph_lack')}</p>
    );
  return <Line data={data} options={options} />;
};
