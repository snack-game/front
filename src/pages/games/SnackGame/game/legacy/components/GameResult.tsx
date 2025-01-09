import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useRecoilValue } from 'recoil';

import { getMemberProfile } from '@api/members.api';
import OAuth from '@components/Auth/OAuth';
import Button from '@components/Button/Button';
import { userState } from '@utils/atoms/member.atom';
import { isApp } from '@utils/userAgentIdentifier';

import {
  useGetMemberProfile,
  useIntegrateMember,
} from '@hooks/queries/members.query';
import useModal from '@hooks/useModal';

import ExpBarChart from './ExpBarChart';
import { HapticFeedback } from '../../util/hapticFeedback';

interface GameResultProps {
  score: number;
  percentile: number;
  reStart: () => void;
}

const GameResult = ({ score, percentile, reStart }: GameResultProps) => {
  const { t } = useTranslation('game');

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
    HapticFeedback.invoke('impactHeavy');
  });

  return (
    <div className={'flex w-full flex-grow flex-col justify-evenly gap-4'}>
      <div className={'mx-auto flex flex-col items-center gap-4 font-semibold'}>
        <p className="text-6xl text-primary">
          {score}
          {t('score')}
        </p>

        {userStateValue.type !== 'GUEST' && (
          <>
            <p>{t('result_percentile', { percentile })}</p>
            {profile.status && <ExpBarChart status={profile.status} />}
          </>
        )}

        <Button onClick={handleReStartButton} size={'lg'}>
          {t('restart')}
        </Button>
      </div>
      {userStateValue.type === 'GUEST' && (
        <OAuth oAuthOnSuccess={onOAuthSuccess} />
      )}
    </div>
  );
};

export default GameResult;
