import React, { RefObject, useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Button from '@components/common/Button/Button';
import Loading from '@components/common/Loading';
import AppleGame from '@components/games/AppleGame';

import { useAppleGameStart } from '@hooks/queries/appleGame.query';
import { useClientRect } from '@hooks/useClientRect';

const AppleGameWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  background-color: #ffedd5;
  width: 90%;
  height: 720px;
`;

const AppleGameContainer = () => {
  const canvasBaseRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const [start, setStart] = useState<boolean>(false);
  const { width, height } = useClientRect({ canvasBaseRef });
  const { gameStart, data, isLoading } = useAppleGameStart();

  const handleStartButton = () => {
    gameStart();
    setStart(true);
  };

  useEffect(() => {
    setStart(false);
  }, []);

  return (
    <AppleGameWrapper ref={canvasBaseRef}>
      {isLoading ? (
        <Loading />
      ) : (
        <AppleGame
          clientWidth={width}
          clientHeight={height}
          appleGameState={data}
        />
      )}
      <Button
        content={'시작!'}
        onClick={handleStartButton}
        show={!start}
        wrapper={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `}
      />
    </AppleGameWrapper>
  );
};

export default AppleGameContainer;
