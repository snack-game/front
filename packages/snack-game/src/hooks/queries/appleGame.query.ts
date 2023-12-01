import { useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';

import appleGameApi from '@api/apple-game.api';
import { scoredAppleRectType } from '@game/game.type';
import { userState } from '@utils/atoms/member.atom';
import { MemberType } from '@utils/types/member.type';

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
    mutationFn: appleGameApi.gameStart,
    onError: useAppleGameError(),
    useErrorBoundary: appleGameErrorBoundary,
  });

  const gameStart = async () => {
    if (!userStateValue.accessToken) {
      const { accessToken }: MemberType = await guestMutation.mutateAsync();
      return await gameStartMutation.mutateAsync(accessToken);
    } else {
      return await gameStartMutation.mutateAsync();
    }
  };

  return { gameStart };
};

export const useAppleGameSessionEnd = () => {
  const gameEndCheck = useMutation({
    mutationFn: appleGameApi.gameEnd,
    onError: useAppleGameError(),
    useErrorBoundary: appleGameErrorBoundary,
  });

  return { gameEndCheck };
};

export const useGoldModeCheck = () => {
  const { gameEndCheck } = useAppleGameSessionEnd();

  const checkGameMove = useMutation({
    mutationFn: appleGameApi.checkGameMove,
    onError: useAppleGameError(),
    useErrorBoundary: appleGameErrorBoundary,
  });

  const gameEnd = async (sessionId: number, rects: scoredAppleRectType[]) => {
    if (!sessionId || !rects) {
      throw Error('게임의 상태가 올바르지 않아요!');
    }

    await checkGameMove.mutateAsync({
      sessionId: sessionId,
      rects,
    });

    gameEndCheck.mutate(sessionId);
  };

  return { gameEnd, checkGameMove };
};

export const useAppleGameRefresh = () => {
  return useMutation({
    mutationFn: appleGameApi.gameRefresh,
    onError: useAppleGameError(),
    useErrorBoundary: appleGameErrorBoundary,
  });
};
