import { useState } from 'react';

import styled from '@emotion/styled';

import ErrorBoundary from '@components/base/ErrorBoundary';
import Button from '@components/common/Button/Button';
import retryError from '@components/common/Error/RetryError';
import ClassicMode from '@game/view/gameModes/ClassicMode';
import GoldMode from '@game/view/gameModes/GoldMode';

const GameContainer = () => {
  const [mode, setMode] = useState<string>('gold');

  const handleModeSelect = (mode: string) => {
    setMode(mode);
  };

  return (
    <>
      <ModeSelectContainer>
        <Button
          content={'기본모드'}
          size={'small'}
          onClick={() => handleModeSelect('gold')}
        />
        <Button
          content={'클래식모드'}
          size={'small'}
          onClick={() => handleModeSelect('classic')}
        />
        <Button
          content={'놀이터모드'}
          size={'small'}
          onClick={() => handleModeSelect('practice')}
        />
      </ModeSelectContainer>
      <ErrorBoundary fallback={retryError}>
        {(() => {
          switch (mode) {
            case 'gold':
              return <GoldMode />;
            case 'classic':
              return <ClassicMode />;
            default:
              return <GoldMode />;
          }
        })()}
      </ErrorBoundary>
    </>
  );
};

const ModeSelectContainer = styled.div`
  display: flex;
`;

export default GameContainer;
