import { useEffect, useRef } from 'react';

import { useRecoilValue } from 'recoil';

import { BizGameScreen } from '@pages/games/SnackGame/game/screen/BizGameScreen';
import { pixiState } from '@utils/atoms/game.atom';
import { userState } from '@utils/atoms/member.atom';

import { SnackGameBizDefaultResponse, SnackGameBizVerify } from './game.type';
import { createGameApiClient } from './util/api';
import initializeApplication from '../SnackGame/game/hook/initializeApplication';
import { PausePopup } from '../SnackGame/game/popup/PausePopup';
import { RulePopup } from '../SnackGame/game/popup/RulePopup';
import { SettingsPopup } from '../SnackGame/game/popup/SettingPopup';
import { LobbyScreen } from '../SnackGame/game/screen/LobbyScreen';
import { SnackgameApplication } from '../SnackGame/game/screen/SnackgameApplication';
import {
  SnackGameMode,
  Streak,
} from '../SnackGame/game/snackGame/SnackGameUtil';

type Props = {
  replaceErrorHandler: (handler: () => void) => void;
};

const SnackGameBizBase = ({ replaceErrorHandler }: Props) => {
  const canvasBaseRef = useRef<HTMLDivElement>(null);

  const pixiValue = useRecoilValue(pixiState);
  const userInfo = useRecoilValue(userState);

  const gameApi = createGameApiClient();

  // TODO: 훅 안으로 끌고 들어가기
  const initializeAppScreens = async (application: SnackgameApplication) => {
    application.appScreenPool.insert(
      [SettingsPopup, () => new SettingsPopup(application, handleGameResume)],
      [RulePopup, () => new RulePopup(application)],
      [
        PausePopup,
        () => new PausePopup(application, handleGameResume, handleGameEnd),
      ],
      [LobbyScreen, () => new LobbyScreen(application, handleSetMode)],
      [
        BizGameScreen,
        () =>
          new BizGameScreen(
            application,
            handleGetMode,
            handleStreak,
            handleGameStart,
            handleGamePause,
            handleGameEnd,
          ),
      ],
    );
    return application.appScreenPool;
  };
  const application = initializeApplication({
    canvasBaseRef,
    initializeAppScreens,
  });

  const handleApplicationError = () => {
    application.show(LobbyScreen);
  };

  // 게임 진행 관련 functions
  let session: SnackGameBizDefaultResponse | undefined;
  let sessionMode: SnackGameMode | undefined;
  let cumulativeStreaks: Streak[] = [];

  const handleGameStart = async () => {
    session = await gameApi.start();
    gameApi.setToken(session.token);
    return session;
  };

  // TODO: 현재 PixiJS 컨테이너와 게임의 모든 것이 결합되어있는데,
  // 이것을 게임 상태(모드, 점수, 스트릭) 및 게임 규칙을 관리하는 순수한 스낵게임 클래스로 분리하면 좋겠네요.
  // 지금 아래에 있는 getMode, handleStreak 같은 단순 상태를 가져오는 메서드들을 축약하고 싶어요!
  const handleGetMode = () => sessionMode!;
  const handleSetMode = (mode: SnackGameMode) => {
    sessionMode = mode;
  };

  // TODO: 지금은 인자로 숫자를 사용하지만, '스트릭' VO를 만들어 사용하면 더 좋겠네요.
  const handleStreak = async (streak: Streak, isGolden: boolean) => {
    cumulativeStreaks = [...cumulativeStreaks, streak];

    if (isGolden) {
      session = await handleStreaksMove();
    }
    return session!;
  };

  const handleStreaksMove = async (): Promise<SnackGameBizVerify> => {
    const result = await gameApi.verifyStreaks(
      session!.sessionId,
      cumulativeStreaks,
    );
    cumulativeStreaks = [];
    return result;
  };

  const handleGamePause = async () => {
    if (!session || session.state === 'PAUSED') return;
    if (cumulativeStreaks.length > 0) {
      await handleStreaksMove();
    }

    session = await gameApi.pause(session!.sessionId);
  };

  const handleGameResume = async () => {
    if (!session) return;
    session = await gameApi.resume(session!.sessionId);
  };

  const handleGameEnd = async () => {
    if (cumulativeStreaks.length > 0) {
      await handleStreaksMove();
    }
    const data = await gameApi.end(session!.sessionId);
    gameApi.clearToken();

    const resultMessage = { type: 'snackgameresult', payload: data };
    window.parent?.postMessage(resultMessage, '*');
    window.ReactNativeWebView?.postMessage(JSON.stringify(resultMessage));

    navigateToLobby();
  };

  const navigateToLobby = async () => {
    session = undefined;
    application.show(LobbyScreen);
  };

  const onClientMessage = (e: MessageEvent) => {
    const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
    if (!data.type?.startsWith('snackgame-client')) return;
    switch (data.type) {
      case 'snackgame-client-restart-invoked':
        if (!session) {
          (
            application.appScreenPool.get(LobbyScreen) as LobbyScreen
          ).handleGameStartButton();
        }
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('message', onClientMessage);
    return () => window.removeEventListener('message', onClientMessage);
  }, []);

  useEffect(() => {
    replaceErrorHandler(handleApplicationError);
  }, []);

  useEffect(() => {
    if (pixiValue.assetsInit && !userInfo.id) navigateToLobby();
  }, []);

  return (
    <div ref={canvasBaseRef} className={'mx-auto h-full w-full max-w-xl'}></div>
  );
};

export default SnackGameBizBase;
