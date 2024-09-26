import Button from '@components/Button/Button';
import useModal from '@hooks/useModal';

interface GameResultProps {
  score: number;
  percentile: number;
  reStart: () => void;
}

const GameResult = ({ score, percentile, reStart }: GameResultProps) => {
  const { closeModal } = useModal();

  const handleReStartButton = () => {
    reStart();
    closeModal();
  };

  return (
    <div className={'flex w-full flex-grow flex-col justify-evenly gap-4'}>
      <div className={'mx-auto flex flex-col items-center gap-4 font-semibold'}>
        <p className="text-6xl text-primary">{score}점</p>

        <p>전체 사용자 중 상위 {percentile}%의 점수에요!</p>

        <Button onClick={handleReStartButton} size={'lg'}>
          재시작!
        </Button>
      </div>
    </div>
  );
};

export default GameResult;
