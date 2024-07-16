import { useEffect, useRef } from 'react';

import useModal from '@hooks/useModal';

import { SnackGameDefalutResponse } from './game.type';
import initializeApplication from './hook/initializeApplication';
import GameResult from './legacy/components/GameResult';
import { PausePopup } from './popup/PausePopup';
import { SettingsPopup } from './popup/SettingPopup';
import { GameScreen } from './screen/GameScreen';
import { LobbyScreen } from './screen/LobbyScreen';
import { SnackgameApplication } from './screen/SnackgameApplication';
import {
  gameEnd,
  gamePause,
  gameResume,
  gameScore,
  gameStart,
} from './util/api';

type Props = {
  replaceErrorHandler: (handler: () => void) => void;
};

const SnackGameBase = ({ replaceErrorHandler }: Props) => {
  const canvasBaseRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();

  // TODO: 훅 안으로 끌고 들어가기
  const initializeAppScreens = async (application: SnackgameApplication) => {
    application.appScreenPool.insert(
      [SettingsPopup, () => new SettingsPopup(application, handleGameResume)],
      [PausePopup, () => new PausePopup(application, handleGameResume)],
      [LobbyScreen, () => new LobbyScreen(application, handleSetMode)],
      [
        GameScreen,
        () =>
          new GameScreen(
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
  let session: SnackGameDefalutResponse | undefined;
  let sessionMode: string | undefined;

  // TODO: 모드를 타입으로 정의해도 괜찮을 것 같습니다
  const handleGameStart = async () => {
    const data = await gameStart();
    session = data;
  };

  // TODO: 현재 PixiJS 컨테이너와 게임의 모든 것이 결합되어있는데,
  // 이것을 게임 상태(모드, 점수, 스트릭) 및 게임 규칙을 관리하는 순수한 스낵게임 클래스로 분리하면 좋겠네요.
  // 지금 아래에 있는 getMode, handleStreak 같은 단순 상태를 가져오는 메서드들을 축약하고 싶어요!
  const handleGetMode = () => sessionMode!;
  const handleSetMode = (mode: string) => {
    sessionMode = mode;
  };

  // TODO: 지금은 인자로 숫자를 사용하지만, '스트릭' VO를 만들어 사용하면 더 좋겠네요.
  const handleStreak = async (streakLength: number) => {
    session!.score += streakLength;
    await gameScore(session!.score, session!.sessionId);
  };

  const handleGamePause = async () => {
    if (!session || session.state === 'PAUSED') return;
    session = await gamePause(session!.sessionId);
  };

  const handleGameResume = async () => {
    if (!session) return;
    await gameResume(session!.sessionId);
  };

  const handleGameEnd = async () => {
    const data = await gameEnd(session!.sessionId);

    openModal({
      children: (
        <GameResult
          score={data.score}
          percentile={data.percentile}
          reStart={() => application.show(GameScreen)}
        />
      ),
      handleOutsideClick: navigateToLobby,
    });
  };

  const navigateToLobby = async () => {
    session = undefined;
    application.show(LobbyScreen);
  };

  useEffect(() => {
    replaceErrorHandler(handleApplicationError);
  }, []);

  return (
    <div ref={canvasBaseRef} className={'mx-auto h-full w-full max-w-xl'}></div>
  );
};

export default SnackGameBase;
