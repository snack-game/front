import { useState } from 'react';

import styled from '@emotion/styled';

import ErrorBoundary from '@components/base/ErrorBoundary';
import Button from '@components/common/Button/Button';
import retryError from '@components/common/Error/RetryError';
import ClassicMode from '@game/view/gameModes/ClassicMode';
import GoldMode from '@game/view/gameModes/GoldMode';
import PlayGroundMode from '@game/view/gameModes/PlayGroundMode';

const GameContainer = () => {
  const [mode, setMode] = useState<string>('gold');

  const handleModeSelect = (mode: string) => {
    setMode(mode);
  };

  return (
    <>
      <ErrorBoundary fallback={retryError}>
        {(() => {
          switch (mode) {
            case 'gold':
              return <GoldMode />;
            case 'classic':
              return <ClassicMode />;
            case 'practice':
              return <PlayGroundMode />;
            default:
              return <GoldMode />;
          }
        })()}
      </ErrorBoundary>
      <ModeSelectContainer>
        <Button
          content={'기본모드'}
          size={'small'}
          disabled={mode === 'gold'}
          onClick={() => handleModeSelect('gold')}
        />
        <Button
          content={'클래식모드'}
          size={'small'}
          disabled={mode === 'classic'}
          onClick={() => handleModeSelect('classic')}
        />
        <Button
          content={'놀이터모드'}
          size={'small'}
          disabled={mode === 'practice'}
          onClick={() => handleModeSelect('practice')}
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
