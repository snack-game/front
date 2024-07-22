import { useRecoilValue } from 'recoil';

import OAuth from '@components/Auth/OAuth';
import Button from '@components/Button/Button';
import { userState } from '@utils/atoms/member.atom';

import {
  useGetMemberProfile,
  useIntegrateMember,
} from '@hooks/queries/members.query';
import useModal from '@hooks/useModal';

import ExpBarChart from './ExpBarChart';

interface GameResultProps {
  score: number;
  percentile: number;
  reStart: () => void;
}

const GameResult = ({ score, percentile, reStart }: GameResultProps) => {
  const profile = useGetMemberProfile();
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
      <div className={'mx-auto flex flex-col items-center gap-4 font-semibold'}>
        <p className="text-6xl text-primary">{score}점</p>

        {userStateValue.type !== 'GUEST' && (
          <>
            <p>전체 사용자 중 상위 {percentile}%의 점수에요!</p>
            {profile.status && <ExpBarChart status={profile.status} />}
          </>
        )}

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
