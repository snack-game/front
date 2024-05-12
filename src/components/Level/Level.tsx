import { TIER_COLOR } from '@constants/common.constant';

interface LevelProps {
  level: number;
}

export const Level = ({ level }: LevelProps) => {
  const tier = Math.floor(level / 10);

  return (
    <div
      className={`flex h-5 w-5 items-center justify-center rounded-full text-sm text-white`}
      style={{ backgroundColor: TIER_COLOR[tier] }}
    >
      {level}
    </div>
  );
};
