import Refresh from '@assets/images/refresh.png';

interface AppleGameHUDProps {
  time: number;
  handleRefresh: () => void;
  score: number;
}

const SnackGameHUD = ({ time, handleRefresh, score }: AppleGameHUDProps) => {
  const totalTime = 120;
  const remainingTimeRatio = (time / totalTime) * 100;

  return (
    <div className="mx-auto my-auto flex w-full max-w-xl flex-col gap-1 pt-2">
      <div
        className={
          'flex items-center justify-around text-xl text-primary-deep-dark'
        }
      >
        <p>{score + ' 점'}</p>
      </div>
      <div className="mx-auto flex w-[95%] items-center justify-between gap-4">
        <div className="relative w-full">
          <div className="absolute -top-2 left-0 flex  h-8 w-8 items-center justify-center rounded-full bg-primary text-xl text-primary-light shadow-md">
            {time}
          </div>
          <div
            className={`h-4 rounded-full bg-primary shadow-md before:w-full`}
            style={{
              width: `${remainingTimeRatio}%`,
            }}
          />
        </div>
        <img
          src={Refresh}
          alt={'새로고침'}
          onClick={handleRefresh}
          className={'h-8 w-8 cursor-pointer'}
        />
      </div>
    </div>
  );
};

export default SnackGameHUD;
