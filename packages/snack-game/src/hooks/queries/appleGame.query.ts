import { useRecoilValue, useSetRecoilState } from 'recoil';

import appleGameApi from '@api/appleGame';
import { userState } from '@utils/atoms/auth.atom';
import { appleGameState } from '@utils/atoms/game.atom';
import {
  appleGameCheckMovePropsType,
  appleGameRectType,
  appleGameStateType,
} from '@utils/types/game.type';
import { AuthType } from '@utils/types/member.type';

import { TOAST_MESSAGE } from '@constants/toast.constant';
import { useMemberGuest } from '@hooks/queries/members.query';
import useGenericMutation from '@hooks/useGenericMutation';
import useToast from '@hooks/useToast';

export const useAppleGameStart = () => {
  const openToast = useToast();
  const userStateValue = useRecoilValue(userState);
  const guestMutation = useMemberGuest();
  const setAppleGameState = useSetRecoilState(appleGameState);

  const gameStartMutation = useGenericMutation<
    string | void,
    appleGameStateType
  >({
    apiMethod: appleGameApi.gameStart,
    onSuccess: (data: appleGameStateType) => {
      setAppleGameState(data);
      openToast(TOAST_MESSAGE.GAME_START, 'success');
    },
  });

  const gameStart = async () => {
    if (!userStateValue.accessToken) {
      await guestMutation
        .mutateAsync()
        .then(async ({ accessToken }: AuthType) => {
          await gameStartMutation.mutateAsync(accessToken);
        });
    } else {
      await gameStartMutation.mutateAsync();
    }
  };

  return { gameStart, gameStartMutation };
};

export const useAppleGameSessionEnd = () => {
  const openToast = useToast();

  const gameEndCheck = useGenericMutation({
    apiMethod: appleGameApi.gameEnd,
    onSuccess: () => {
      openToast(TOAST_MESSAGE.GAME_END, 'success');
    },
  });

  return { gameEndCheck };
};

export const useAppleGameCheck = () => {
  const { gameEndCheck } = useAppleGameSessionEnd();
  const appleGameValue = useRecoilValue(appleGameState);

  const checkGameMove = useGenericMutation<
    appleGameCheckMovePropsType,
    void | appleGameStateType
  >({
    apiMethod: appleGameApi.checkGameMove,
  });

  const gameEnd = (rects: appleGameRectType[]) => {
    const sessionId = appleGameValue.sessionId;

    if (!sessionId || !rects) {
      throw Error('게임의 상태가 올바르지 않아요!');
    }

    checkGameMove
      .mutateAsync({
        sessionId: sessionId,
        rects,
      })
      .then(() => {
        gameEndCheck.mutate({ sessionId });
      });
  };

  return { gameEnd, checkGameMove };
};

export const useAppleGameRefresh = () => {
  const setAppleGameState = useSetRecoilState(appleGameState);

  return useGenericMutation<number, appleGameStateType>({
    apiMethod: appleGameApi.gameRefresh,
    onSuccess: (data: appleGameStateType) => {
      setAppleGameState(data);
    },
  });
};
