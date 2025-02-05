import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';

import {
  checkSnackGameMove,
  snackGameEnd,
  snackGameRefresh,
  snackGameStart,
} from '@api/apple-game.api';
import { scoredAppleRectType } from '@pages/games/AppleGame/appleGameType';
import { userState } from '@utils/atoms/member.atom';

import { ServerError } from '@constants/api.constant';
import { useGuest } from '@hooks/queries/auth.query';
import useToast from '@hooks/useToast';

const useAppleGameError = () => {
  const openToast = useToast();

  return (error: AxiosError<ServerError>) => {
    if (!error.response) throw error;

    openToast(error.response.data.messages, 'error');
  };
};

const appleGameErrorBoundary = (error: AxiosError<ServerError>) => {
  if (!error.response) throw error;

  return error.response.status >= 500;
};

export const useGoldModeStart = () => {
  const userStateValue = useRecoilValue(userState);
  const guestMutation = useGuest();

  const gameStartMutation = useMutation({
    mutationFn: snackGameStart,
    onError: useAppleGameError(),
    throwOnError: appleGameErrorBoundary,
  });

  const gameStart = async () => {
    if (!userStateValue.id) {
      await guestMutation.mutateAsync();
      return await gameStartMutation.mutateAsync();
    } else {
      return await gameStartMutation.mutateAsync();
    }
  };

  return { gameStart };
};

export const useAppleGameSessionEnd = () => {
  const gameEnd = useMutation({
    mutationFn: snackGameEnd,
    onError: useAppleGameError(),
    throwOnError: appleGameErrorBoundary,
  });

  return { gameEnd };
};

export const useGoldModeCheck = () => {
  const checkGameMove = useMutation({
    mutationFn: checkSnackGameMove,
    onError: useAppleGameError(),
    throwOnError: appleGameErrorBoundary,
  });

  const checkMoves = async (
    sessionId: number,
    rects: scoredAppleRectType[],
  ) => {
    if (!sessionId || !rects) {
      throw Error('게임의 상태가 올바르지 않아요!');
    }

    return await checkGameMove.mutateAsync({
      sessionId: sessionId,
      rects,
    });
  };

  return { checkMoves };
};

export const useAppleGameRefresh = () => {
  return useMutation({
    mutationFn: snackGameRefresh,
    onError: useAppleGameError(),
    throwOnError: appleGameErrorBoundary,
  });
};
