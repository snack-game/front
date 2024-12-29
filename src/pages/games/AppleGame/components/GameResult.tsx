import { useEffect } from 'react';

import { useRecoilValue } from 'recoil';

import { getMemberProfile } from '@api/members.api';
import OAuth from '@components/Auth/OAuth';
import Button from '@components/Button/Button';
import { HapticFeedback } from '@pages/games/SnackGame/game/util/hapticFeedback';
import { userState } from '@utils/atoms/member.atom';
import { isApp } from '@utils/userAgentIdentifier';

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
  const { data: profile } = useGetMemberProfile();
  const userStateValue = useRecoilValue(userState);
  const integrateMember = useIntegrateMember();
  const { closeModal } = useModal();

  const handleReStartButton = () => {
    reStart();
    closeModal();
  };

  const onOAuthSuccess = async () => {
    if (isApp()) {
      return await getMemberProfile();
    }
    return await integrateMember.mutateAsync();
  };

  useEffect(() => {
    HapticFeedback.invokeImpactHeavy();
  });

  return (
    <div className={'flex w-full flex-grow flex-col justify-evenly gap-4'}>
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
