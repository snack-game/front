import { useEffect, useRef } from 'react';

import { useRecoilValue } from 'recoil';

import ErrorBoundary from '@components/base/ErrorBoundary';
import RetryError from '@components/Error/RetryError';
import { pixiState } from '@utils/atoms/game.atom';
import { toastStateType } from '@utils/types/common.type';

import useModal from '@hooks/useModal';
import useToast from '@hooks/useToast';

import initializeApplication from './hook/initializeApplication';
import GameResult from './legacy/components/GameResult';
import { PausePopup } from './popup/PausePopup';
import { SettingsPopup } from './popup/SettingPopup';
import { GameScreen } from './screen/GameScreen';
import { LobbyScreen } from './screen/LobbyScreen';
import { SnackgameApplication } from './screen/SnackgameApplication';
import { gameEnd, gameStart } from './util/api';

const SnackGameBase = () => {
  const canvasBaseRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();

  // TODO: 훅 안으로 끌고 들어가기
  // 여기서부터
  const initializeAppScreens = async (application: SnackgameApplication) => {
    application.appScreenPool.insert(
      [LobbyScreen, () => new LobbyScreen(application, handleGameStart)],
      [SettingsPopup, () => new SettingsPopup(application)],
      [PausePopup, () => new PausePopup(application)],
      [GameScreen, () => new GameScreen(application, handleGameEnd)],
    );
    return application.appScreenPool;
  };
  // 여기까지
  const application = initializeApplication({
    canvasBaseRef,
    initializeAppScreens,
  });

  const handleGameStart = async () => {
    const data = await gameStart();
    return data;
  };

  const handleGameEnd = async (sessionId: number) => {
    const data = await gameEnd(sessionId);
    openModal({
      children: (
        <GameResult
          score={data.score}
          percentile={data.percentile}
          reStart={() => application.show(LobbyScreen)} // TODO: 게임 바로 재시작 할 수 있게(아직 버그있음)
        />
      ),
    });
    return data;
  };

  const pixiValue = useRecoilValue(pixiState);

  const handleRetryGameError = () => {
    if (pixiValue.assetsInit && pixiValue.pixiInit) {
      application.show(LobbyScreen);
    }
  };

  useEffect(() => {
    // no-op
  }, []);

  return (
    <ErrorBoundary fallback={RetryError} onReset={handleRetryGameError}>
      <div
        ref={canvasBaseRef}
        className={'mx-auto h-full w-full max-w-xl'}
      ></div>
    </ErrorBoundary>
  );
};

export default SnackGameBase;
