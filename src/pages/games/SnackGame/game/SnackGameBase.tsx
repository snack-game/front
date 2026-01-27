import { useEffect, useRef } from 'react';

import * as Sentry from '@sentry/react';
import { useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import { getItemInventory } from '@api/item.api';
import GameResult from '@pages/games/AppleGame/components/GameResult';
import { pixiState } from '@utils/atoms/game.atom';
import { userState } from '@utils/atoms/member.atom';

import { QUERY_KEY } from '@constants/api.constant';
import { ATOM_KEY } from '@constants/atom.constant';
import { useGuest } from '@hooks/queries/auth.query';
import useModal from '@hooks/useModal';

import ProvocationSender from './components/ProvocationSender';
import { SnackGameDefaultResponse, SnackGameVerify } from './game.type';
import { GameHandlers, ItemHandlers } from './handlers.type';
import initializeApplication from './hook/initializeApplication';
import { PausePopup } from './popup/PausePopup';
import { RulePopup } from './popup/RulePopup';
import { SettingsPopup } from './popup/SettingPopup';
import { GameScreen } from './screen/GameScreen';
import { LobbyScreen } from './screen/LobbyScreen';
import { SnackgameApplication } from './screen/SnackgameApplication';
import {
  SnackGameMode,
  SnackGamePosition,
  StreakWithMeta,
} from './snackGame/SnackGameUtil';
import {
  verifyStreaks,
  gameEnd,
  gamePause,
  gameResume,
  gameStart,
  triggerBomb,
  triggerFever,
} from './util/api';
import { waitFor } from './util/asyncUtils';
import { canProvoke, getSurpassedPlayers } from './util/provocation.api';

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

  const handleApplicationError = () => {
    application.show(LobbyScreen);
  };

  let session: SnackGameDefaultResponse | undefined;
  let sessionMode: SnackGameMode | undefined;
  let cumulativeStreaks: StreakWithMeta[] = [];

  const handleNonLoggedInUser = async () => {
    const isLoggedIn = JSON.parse(
      window.localStorage.getItem(ATOM_KEY.USER_PERSIST) || '{}',
    ).userState;
    if (!isLoggedIn) await guestMutation.mutateAsync();
  };

  const fetchUserItem = async () => {
    const data = await getItemInventory();
    return data;
  };

  // TODO: 현재 PixiJS 컨테이너와 게임의 모든 것이 결합되어있는데,
  // 이것을 게임 상태(모드, 점수, 스트릭) 및 게임 규칙을 관리하는 순수한 스낵게임 클래스로 분리하면 좋겠네요.
  // 지금 아래에 있는 getMode, handleStreak 같은 단순 상태를 가져오는 메서드들을 축약하고 싶어요!

  const handleGetMode = () => sessionMode!;
  const handleSetMode = (mode: SnackGameMode) => {
    sessionMode = mode;
  };

  const handleStreaksMove = async (): Promise<SnackGameVerify> => {
    const result = await verifyStreaks(session!.sessionId, cumulativeStreaks);
    cumulativeStreaks = [];
    return result;
  };

  // ==================== 게임 핸들러 ====================
  const handleGameStart = async () => {
    session = await gameStart();
    return session;
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
      onClose: handleGameResultClose,
    });
  };

  // TODO: 지금은 인자로 숫자를 사용하지만, '스트릭' VO를 만들어 사용하면 더 좋겠네요.
  const handleStreak = async (streak: StreakWithMeta, isGolden: boolean) => {
    cumulativeStreaks = [...cumulativeStreaks, streak];

    if (isGolden) {
      session = await handleStreaksMove();
    }
    return session!;
  };

  // ==================== 아이템 핸들러 ====================
  const handleBomb = async (position: SnackGamePosition, isGolden: boolean) => {
    if (isGolden) {
      session = await handleStreaksMove();
    }
    session = await triggerBomb(session!.sessionId, position);
    return session;
  };

  const handleFever = async () => {
    session = await triggerFever(session!.sessionId);
    return session;
  };

  // ==================== 게임/아이템 핸들러 그룹핑 객체 ====================
  const gameHandlers: GameHandlers = {
    start: handleGameStart,
    pause: handleGamePause,
    resume: handleGameResume,
    end: handleGameEnd,
    streak: handleStreak,
  };

  const itemHandlers: ItemHandlers = {
    bomb: handleBomb,
    fever: handleFever,
  };

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
            gameHandlers,
            itemHandlers,
            fetchUserItem,
          ),
      ],
    );
    return application.appScreenPool;
  };
  const application = initializeApplication({
    canvasBaseRef,
    initializeAppScreens,
  });

  const handleGameResultClose = async () => {
    const isGuest =
      JSON.parse(window.localStorage.getItem(ATOM_KEY.USER_PERSIST) || '{}')
        .userState.type === 'GUEST';
    if (isGuest) {
      return navigateToLobby();
    }

    const canProvoke = await pollProvoke();
    if (!canProvoke) {
      return navigateToLobby();
    }

    const targets = await getSurpassedPlayers();
    if (targets.length === 0) {
      Sentry.captureMessage(
        `[🚨 ${import.meta.env.VITE_NODE_ENV}경고]: targets 배열이 비어있습니다. sessionId: ${session!.sessionId}`,
        'error',
      );
      return navigateToLobby();
    }

    return openModal({
      children: <ProvocationSender targets={targets} />,
      onClose: navigateToLobby,
    });
  };

  const pollProvoke = async (): Promise<boolean> => {
    let isPolling = true;

    while (isPolling) {
      try {
        const response = await canProvoke(session!.ownerId, session!.sessionId);

        switch (response.status) {
          case 200:
            return response.data;
          case 202:
            await waitFor(1);
            break;
          default:
            isPolling = false;
            break;
        }
      } catch (error) {
        console.error(error);
        isPolling = false;
      }
    }

    return false;
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
