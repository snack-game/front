import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { StatusType } from '@utils/types/member.type';

import { TIER_COLOR } from '@constants/tier.constant';

import type { ChartOptions, Plugin } from 'chart.js';

type Align =
  | 'bottom'
  | 'center'
  | 'end'
  | 'left'
  | 'right'
  | 'start'
  | 'top'
  | number;
type Anchor = 'center' | 'end' | 'start';

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartDataLabels);

const ExpBarChart = ({ status }: { status: StatusType }) => {
  const { level, exp, maxExp } = status;
  const currentRatio = (exp / maxExp) * 100;
  const tier = Math.floor(level / 10);

  const data = {
    labels: [''],
    datasets: [
      {
        data: [currentRatio],
        backgroundColor: TIER_COLOR[tier],
        barPercentage: 1,
      },
    ],
  };

  const labelPositionOptions: { align: Align; anchor: Anchor } = {
    align: currentRatio < 40 ? 'end' : 'center',
    anchor: currentRatio < 40 ? 'end' : 'center',
  };
  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 0,
        borderSkipped: false,
        borderRadius: 10,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { display: false },
        border: { display: false },
        min: 0,
        max: 100,
      },
      y: {
        grid: { display: false },
        ticks: { display: true, padding: -4 },
        border: { display: false },
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      datalabels: {
        formatter: () => `${currentRatio.toFixed()}%`,
        display: true,
        color: 'black',
        offset: 0,
        ...labelPositionOptions,
        font: { family: 'DovemayoGothic', weight: 'normal', size: 16 },
      },
    },
    events: [],
  };

  const backgroundPlugin: Plugin<'bar'> = {
    id: 'backgroundPlugin',
    beforeDatasetsDraw(chart) {
      const {
        ctx,
        chartArea: { left, width, height },
        scales: { y },
      } = chart;

      const barThickness = height * 0.8;

      ctx.save();
      ctx.fillStyle = 'rgba(234, 234, 234)';
      ctx.roundRect(
        left,
        y.getPixelForValue(0) - barThickness / 2,
        width,
        barThickness,
        10,
      );
      ctx.fill();
    },
  };
  const plugins = [backgroundPlugin];

  return (
    <div className="relative h-[50px] w-[300px] font-normal">
      <Bar data={data} options={options} plugins={plugins} />
      <p className="absolute bottom-[-15px] left-1">Lv {level}</p>
      <p className="absolute bottom-[-15px] right-1">Lv {level + 1}</p>
    </div>
  );
};

export default ExpBarChart;
