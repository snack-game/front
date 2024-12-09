import { Link } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import { getMemberProfile } from '@api/members.api';
import OAuth from '@components/Auth/OAuth';
import Button from '@components/Button/Button';
import { userState } from '@utils/atoms/member.atom';
import { isApp } from '@utils/userAgentIdentifier';

import PATH from '@constants/path.constant';
import {
  useGetMemberProfile,
  useIntegrateMember,
} from '@hooks/queries/members.query';
import useModal from '@hooks/useModal';

import ExpBarChart from './ExpBarChart';
import { useEffect } from 'react';
import { HapticFeedback } from '../../util/hapticFeedback';

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
  })

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

        <div className="mt-4 flex w-full items-center justify-evenly">
          <Link
            target="_blank"
            to={PATH.FEED_BACK_EVENT}
            className="rounded-md border border-primary px-4 py-2 text-xl text-primary"
          >
            이벤트 참여
          </Link>
          <Button onClick={handleReStartButton} size={'lg'}>
            재시작!
          </Button>
        </div>
      </div>
      {userStateValue.type === 'GUEST' && (
        <OAuth oAuthOnSuccess={onOAuthSuccess} />
      )}
    </div>
  );
};

export default GameResult;
