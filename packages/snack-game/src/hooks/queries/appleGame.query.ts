import { useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import appleGameApi from '@api/appleGame';
import { appleGameState } from '@utils/atoms/game';
import {
  appleGameCheckMovePropsType,
  appleGameEndPropsType,
  appleGameStateType,
} from '@utils/types/game.type';

import { ServerError } from '@constants/api.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import { useMemberGuest } from '@hooks/queries/members.query';
import useCookie from '@hooks/useCookie';
import useError from '@hooks/useError';
import useToast from '@hooks/useToast';

export const useAppleGameStart = () => {
  const errorPopup = useError();
  const openToast = useToast();
  const { getCookie } = useCookie();
  const setAppleGameState = useSetRecoilState(appleGameState);
  const { guestMutate } = useMemberGuest();

  const { mutateAsync, data, isLoading } = useMutation<
    appleGameStateType,
    AxiosError<ServerError>,
    void
  >(appleGameApi.gameStart, {
    retry: 0,
    onError: (error: AxiosError<ServerError>) => {
      if (error.response) {
        if (error.response.status >= 500) {
          throw error;
        }

        errorPopup(error.response.status, error.response.data.messages);
      }
    },
    onSuccess: (data: appleGameStateType) => {
      setAppleGameState(data);
      openToast(TOAST_MESSAGE.GAME_START, 'success');
    },
  });

  const gameStart = async () => {
    const accessToken = getCookie('accessToken');

    if (accessToken) {
      await guestMutate().then(() => mutateAsync());
    } else {
      await mutateAsync();
    }
  };

  return { gameStart, data, isLoading };
};

export const useAppleGameEnd = () => {
  const errorPopup = useError();
  const appleGameValue = useRecoilValue(appleGameState);

  const { mutateAsync: checkGameMove, isLoading } = useMutation<
    void,
    AxiosError<ServerError>,
    appleGameCheckMovePropsType
  >(appleGameApi.checkGameMove, {
    retry: 0,
    onError: (error: AxiosError<ServerError>) => {
      if (error.response) {
        if (error.response.status >= 500) {
          throw error;
        }

        errorPopup(error.response.status, error.response.data.messages);
      }
    },
  });

  const { mutateAsync: gameEndCheck } = useMutation<
    void,
    AxiosError<ServerError>,
    appleGameEndPropsType
  >(appleGameApi.gameEnd, {
    retry: 0,
    onError: (error: AxiosError<ServerError>) => {
      if (error.response) {
        if (error.response.status >= 500) {
          throw error;
        }

        errorPopup(error.response.status, error.response.data.messages);
      }
    },
  });

  const gameEnd = async () => {
    const sessionId = appleGameValue.sessionId;

    if (appleGameValue.coordinates) {
      await checkGameMove({
        sessionId: sessionId,
        coordinates: appleGameValue.coordinates,
      }).then(() => {
        gameEndCheck({
          sessionId: sessionId,
        });
      });
    }
  };

  return { gameEnd, isLoading, gameEndCheck };
};
