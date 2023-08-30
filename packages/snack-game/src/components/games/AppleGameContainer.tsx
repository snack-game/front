import React, { RefObject, useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Button from '@components/common/Button/Button';
import Loading from '@components/common/Loading';
import AppleGame from '@components/games/AppleGame';
import { AppleGameManager } from '@modules/apple-game/appleGameManager';
import { Drag } from '@modules/apple-game/drag';

import { useAppleGameStart } from '@hooks/queries/appleGame.query';
import { useClientRect } from '@hooks/useClientRect';

const AppleGameWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  background-color: #ffedd5;
  width: 80%;
  height: 80vh;
`;

const AppleGameContainer = () => {
  const dragRef = useRef(new Drag());
  const appleGameManagerRef = useRef(new AppleGameManager());
  const canvasBaseRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const [timeRemaining, setTimeRemaining] = useState<number>(10);
  const [start, setStart] = useState<boolean>(false);
  const { clientWidth, clientHeight, clientLeft, clientTop } = useClientRect({
    canvasBaseRef,
  });
  const { gameStart, data, isLoading } = useAppleGameStart();

  const handleStartButton = () => {
    gameStart().then(() => {
      setStart(true);
      setTimeRemaining(10);
    });
  };

  const gameEnd = () => {
    setStart(false);
  };

  useEffect(() => {
    if (start && timeRemaining > 0) {
      const timerId = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    } else if (timeRemaining === 0) {
      gameEnd();
    }
  }, [start, timeRemaining]);

  return (
    <>
      {timeRemaining}
      <AppleGameWrapper ref={canvasBaseRef}>
        {isLoading && <Loading />}
        {start && (
          <AppleGame
            clientWidth={clientWidth}
            clientHeight={clientHeight}
            clientLeft={clientLeft}
            clientTop={clientTop}
            appleGameState={data}
            drag={dragRef.current}
            appleGameManager={appleGameManagerRef.current}
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
    </>
  );
};

export default AppleGameContainer;
