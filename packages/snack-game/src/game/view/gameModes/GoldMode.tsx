import { useState } from 'react';

import QueryBoundary from '@components/base/QueryBoundary';
import retryError from '@components/common/Error/RetryError';
import { scoredAppleRectType } from '@game/game.type';
import AppleGame from '@game/view/AppleGame';

import {
  useAppleGameRefresh,
  useGoldModeCheck,
  useGoldModeStart,
} from '@hooks/queries/appleGame.query';

const GoldMode = () => {
  const { gameStart } = useGoldModeStart();
  const { gameEnd } = useGoldModeCheck();
  const gameRefresh = useAppleGameRefresh();

  const [sessionId, setSessionId] = useState(0);

  const startLogic = async () => {
    const { apples, sessionId } = await gameStart();
    setSessionId(sessionId);
    return apples;
  };

  const endLogic = async (rects: scoredAppleRectType[]) => {
    await gameEnd(sessionId, rects);
  };

  const refreshLogic = async () => {
    const { apples } = await gameRefresh.mutateAsync(sessionId);
    return apples;
  };

  return (
    <QueryBoundary errorFallback={retryError}>
      <AppleGame
        startLogic={startLogic}
        endLogic={endLogic}
        refreshLogic={refreshLogic}
        gameMode={'gold'}
        sessionId={sessionId}
      />
    </QueryBoundary>
  );
};

export default GoldMode;
