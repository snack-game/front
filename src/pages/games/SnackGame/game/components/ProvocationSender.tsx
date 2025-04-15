import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useRecoilValue } from 'recoil';

import Button from '@components/Button/Button';
import Spacing from '@components/Spacing/Spacing';
import { userState } from '@utils/atoms/member.atom';

import { useSendProvocation } from '@hooks/queries/provocation.query';

interface ProvocationTarget {
  name: string;
  beforeRank: number;
  currentRank: number;
}

const ProvocationSender = ({ targets }: { targets: ProvocationTarget[] }) => {
  const { t } = useTranslation('game');

  return (
    <div className="flex w-full flex-col items-center">
      <p className="text-4xl text-primary">{t('new_high_score')}</p>

      <div className="flex flex-col items-center gap-4">
        <p>{t('prompt_provoke_message')}</p>
        <Spacing size={1} />
        <div className="grid w-full gap-3">
          {targets.map((target) => (
            <Target key={target.name} {...target} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Target = ({ name }: ProvocationTarget) => {
  const { t } = useTranslation('game');

  const userStateValue = useRecoilValue(userState);
  const sendProvocation = useSendProvocation();

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = async () => {
    setIsClicked(true);

    try {
      await sendProvocation.mutateAsync({
        ownerId: userStateValue.id as number,
        receiverNickname: name,
      });
    } catch (error) {
      setIsClicked(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 grow leading-5">
        <p className="truncate">{name}</p>
      </div>
      <Button
        className="h-10 shrink-0 disabled:bg-button-disabled"
        disabled={isClicked}
        onClick={handleClick}
      >
        {isClicked ? t('send_complete') : t('send')}
      </Button>
    </div>
  );
};

export default ProvocationSender;
