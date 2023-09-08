import { useRecoilValue, useSetRecoilState } from 'recoil';

import appleGameApi from '@api/appleGame';
import { appleGameState } from '@utils/atoms/game';
import { appleGameStateType } from '@utils/types/game.type';

import { TOAST_MESSAGE } from '@constants/toast.constant';
import useGenericMutation from '@hooks/useGenericMutation';
import useToast from '@hooks/useToast';

export const useAppleGameStart = () => {
  const openToast = useToast();
  const setAppleGameState = useSetRecoilState(appleGameState);

  return useGenericMutation<void, appleGameStateType>({
    apiMethod: appleGameApi.gameStart,
    onSuccess: (data: appleGameStateType) => {
      setAppleGameState(data);
      openToast(TOAST_MESSAGE.GAME_START, 'success');
    },
  });
};

export const useAppleGameSessionEnd = () => {
  const openToast = useToast();

  const { mutateAsync: gameEndCheck } = useGenericMutation({
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

  const { mutate: checkGameMove } = useGenericMutation({
    apiMethod: appleGameApi.checkGameMove,
    onSuccess: async () => {
      await gameEndCheck({
        sessionId: appleGameValue.sessionId,
      });
    },
  });

  const gameEnd = () => {
    const sessionId = appleGameValue.sessionId;
    const coordinates = appleGameValue.coordinates;

    if (!sessionId || !coordinates) {
      throw Error('게임의 상태가 올바르지 않아요!');
    }

    checkGameMove({
      sessionId: sessionId,
      coordinates,
    });
  };

  return { gameEnd };
};
