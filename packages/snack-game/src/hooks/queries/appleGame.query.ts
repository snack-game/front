import { useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import appleGameApi from '@api/apple-game.api';
import { appleGameState } from '@utils/atoms/game.atom';
import { userState } from '@utils/atoms/member.atom';
import {
  appleGameProgressType,
  appleGameStateType,
} from '@utils/types/game.type';
import { AuthType } from '@utils/types/member.type';

import { ServerError } from '@constants/api.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import { useMemberGuest } from '@hooks/queries/members.query';
import useToast from '@hooks/useToast';

export const useAppleGameStart = () => {
  const openToast = useToast();
  const userStateValue = useRecoilValue(userState);
  const guestMutation = useMemberGuest();
  const setAppleGameState = useSetRecoilState(appleGameState);

  const gameStartMutation = useMutation({
    mutationFn: appleGameApi.gameStart,
    onSuccess: (data: appleGameStateType) => {
      setAppleGameState(data);
      openToast(TOAST_MESSAGE.GAME_START, 'success');
    },
    useErrorBoundary: (error: AxiosError<ServerError>) => {
      if (!error.response) throw error;

      openToast(error.response.data.messages, 'error');

      return error.response?.status >= 500;
    },
  });

  const gameStart = async () => {
    if (!userStateValue.accessToken) {
      const { accessToken }: AuthType = await guestMutation.mutateAsync();
      await gameStartMutation.mutateAsync(accessToken);
    } else {
      await gameStartMutation.mutateAsync();
    }
  };

  return { gameStart, gameStartMutation };
};

export const useAppleGameSessionEnd = () => {
  const openToast = useToast();

  const gameEndCheck = useMutation({
    mutationFn: appleGameApi.gameEnd,
    onSuccess: () => {
      openToast(TOAST_MESSAGE.GAME_END, 'success');
    },
    useErrorBoundary: (error: AxiosError<ServerError>) => {
      if (!error.response) throw error;

      openToast(error.response.data.messages, 'error');

      return error.response?.status >= 500;
    },
  });

  return { gameEndCheck };
};

export const useAppleGameCheck = () => {
  const { gameEndCheck } = useAppleGameSessionEnd();
  const appleGameValue = useRecoilValue(appleGameState);

  const checkGameMove = useMutation({
    mutationFn: appleGameApi.checkGameMove,
  });

  const gameEnd = async (rects: appleGameProgressType) => {
    const sessionId = appleGameValue.sessionId;

    if (!sessionId || !rects) {
      throw Error('게임의 상태가 올바르지 않아요!');
    }

    await checkGameMove.mutateAsync({
      sessionId: sessionId,
      rects,
    });

    gameEndCheck.mutate({ sessionId });
  };

  return { gameEnd, checkGameMove };
};

export const useAppleGameRefresh = () => {
  const openToast = useToast();
  const setAppleGameState = useSetRecoilState(appleGameState);

  return useMutation({
    mutationFn: appleGameApi.gameRefresh,
    onSuccess: (data: appleGameStateType) => {
      setAppleGameState(data);
    },
    useErrorBoundary: (error: AxiosError<ServerError>) => {
      if (!error.response) throw error;

      openToast(error.response.data.messages, 'error');

      return error.response?.status >= 500;
    },
  });
};
