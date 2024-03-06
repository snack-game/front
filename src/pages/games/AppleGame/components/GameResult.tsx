import { useRecoilValue } from 'recoil';

import OAuth from '@components/Auth/OAuth';
import Button from '@components/Button/Button';
import { userState } from '@utils/atoms/member.atom';

import { useIntegrateMember } from '@hooks/queries/members.query';
import useModal from '@hooks/useModal';

interface GameResultProps {
  score: number;
  reStart: () => void;
}

const GameResult = ({ score, reStart }: GameResultProps) => {
  const userStateValue = useRecoilValue(userState);
  const integrateMember = useIntegrateMember();
  const { closeModal } = useModal();

  const handleReStartButton = () => {
    reStart();
    closeModal();
  };

  const onOAuthSuccess = async () => {
    return await integrateMember.mutateAsync();
  };

  return (
    <div className={'flex h-full w-full flex-col justify-evenly'}>
      <div className={'mx-auto flex flex-col gap-4 font-semibold'}>
        <p>최종점수: {score}점!</p>
        <Button onClick={handleReStartButton} size={'lg'}>
          재시작!
        </Button>
      </div>
      {userStateValue.type === 'GUEST' && (
        <OAuth oAuthOnSuccess={onOAuthSuccess} />
      )}
    </div>
  );
};

export default GameResult;
