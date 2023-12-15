import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styled from '@emotion/styled';

import ErrorBoundary from '@components/base/ErrorBoundary';
import Button from '@components/common/Button/Button';
import retryError from '@components/common/Error/RetryError';
import ClassicMode from '@game/view/ClassicMode';
import DefaultMode from '@game/view/DefaultMode';

const GameContainer = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<string>('gold');

  const handleModeSelect = (mode: string) => {
    setMode(mode);
  };

  return (
    <>
      <ErrorBoundary fallback={retryError}>
        {(() => {
          switch (mode) {
            case 'classic':
              return <ClassicMode />;
            default:
              return <DefaultMode />;
          }
        })()}
      </ErrorBoundary>
      <ModeSelectContainer>
        <Button
          content={t('game_gold_mode')}
          size={'small'}
          disabled={mode === 'gold'}
          onClick={() => handleModeSelect('gold')}
        />
        <Button
          content={t('game_classic_mode')}
          size={'small'}
          disabled={mode === 'classic'}
          onClick={() => handleModeSelect('classic')}
        />
      </ModeSelectContainer>
    </>
  );
};

const ModeSelectContainer = styled.div`
  display: flex;
  margin-top: 3rem;
`;

export default GameContainer;
