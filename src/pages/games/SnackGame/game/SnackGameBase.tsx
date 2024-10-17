import { useEffect, useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import { pixiState } from '@utils/atoms/game.atom';
import { userState } from '@utils/atoms/member.atom';

import { QUERY_KEY } from '@constants/api.constant';
import { ATOM_KEY } from '@constants/atom.constant';
import { useGuest } from '@hooks/queries/auth.query';
import useModal from '@hooks/useModal';

import { SnackGameDefaultResponse, SnackGameVerify } from './game.type';
import initializeApplication from './hook/initializeApplication';
import GameResult from './legacy/components/GameResult';
import { PausePopup } from './popup/PausePopup';
import { RulePopup } from './popup/RulePopup';
import { SettingsPopup } from './popup/SettingPopup';
import { GameScreen } from './screen/GameScreen';
import { LobbyScreen } from './screen/LobbyScreen';
import { SnackgameApplication } from './screen/SnackgameApplication';
import { Streak } from './snackGame/SnackGameUtil';
import {
  verifyStreaks,
  gameEnd,
  gamePause,
  gameResume,
  gameStart,
} from './util/api';

type Props = {
  replaceErrorHandler: (handler: () => void) => void;
};

const SnackGameBase = ({ replaceErrorHandler }: Props) => {
  const canvasBaseRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();

  const pixiValue = useRecoilValue(pixiState);
  const userInfo = useRecoilValue(userState);
  const guestMutation = useGuest();
  const queryClient = useQueryClient();

  // TODO: 훅 안으로 끌고 들어가기
  const initializeAppScreens = async (application: SnackgameApplication) => {
    application.appScreenPool.insert(
      [SettingsPopup, () => new SettingsPopup(application, handleGameResume)],
      [RulePopup, () => new RulePopup(application)],
      [
        PausePopup,
        () => new PausePopup(application, handleGameResume, handleGameEnd),
      ],
      [
        LobbyScreen,
        () =>
          new LobbyScreen(application, handleSetMode, handleNonLoggedInUser),
      ],
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
  let session: SnackGameDefaultResponse | undefined;
  let sessionMode: string | undefined;
  let cumulativeStreaks: Streak[] = [];

  const handleNonLoggedInUser = async () => {
    const isLoggedIn = JSON.parse(
      window.localStorage.getItem(ATOM_KEY.USER_PERSIST) || '{}',
    ).userState;
    if (!isLoggedIn) await guestMutation.mutateAsync();
  };

  // TODO: 모드를 타입으로 정의해도 괜찮을 것 같습니다
  const handleGameStart = async () => {
    session = await gameStart();
    return session;
  };

  // TODO: 현재 PixiJS 컨테이너와 게임의 모든 것이 결합되어있는데,
  // 이것을 게임 상태(모드, 점수, 스트릭) 및 게임 규칙을 관리하는 순수한 스낵게임 클래스로 분리하면 좋겠네요.
  // 지금 아래에 있는 getMode, handleStreak 같은 단순 상태를 가져오는 메서드들을 축약하고 싶어요!
  const handleGetMode = () => sessionMode!;
  const handleSetMode = (mode: string) => {
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

  const handleStreaksMove = async (): Promise<SnackGameVerify> => {
    const result = await verifyStreaks(session!.sessionId, cumulativeStreaks);
    cumulativeStreaks = [];
    return result;
  };

  const handleGamePause = async () => {
    if (!session || session.state === 'PAUSED') return;
    if (cumulativeStreaks.length > 0) {
      await handleStreaksMove();
    }

    session = await gamePause(session!.sessionId);
  };

  const handleGameResume = async () => {
    if (!session) return;
    session = await gameResume(session!.sessionId);
  };

  const handleGameEnd = async () => {
    if (cumulativeStreaks.length > 0) {
      await handleStreaksMove();
    }

    const data = await gameEnd(session!.sessionId);
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.USER_RANKING, QUERY_KEY.SEASON_USER_RANKING],
    });

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

  useEffect(() => {
    if (pixiValue.assetsInit && !userInfo.id) navigateToLobby();
  }, []);
  return (
    <div ref={canvasBaseRef} className={'mx-auto h-full w-full max-w-xl'}></div>
  );
};

export default SnackGameBase;
