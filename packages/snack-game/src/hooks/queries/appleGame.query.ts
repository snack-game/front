import { useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import appleGameApi from '@api/appleGame';
import { userState } from '@utils/atoms/auth';
import { appleGameState } from '@utils/atoms/game';
import { appleGameStateType } from '@utils/types/game.type';

import { ServerError } from '@constants/api.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import { useMemberGuest } from '@hooks/queries/members.query';
import useError from '@hooks/useError';
import useToast from '@hooks/useToast';

export const useAppleGameStart = () => {
  const errorPopup = useError();
  const openToast = useToast();
  const userStateValue = useRecoilValue(userState);
  const setAppleGameState = useSetRecoilState(appleGameState);
  const { guestMutate } = useMemberGuest();

  const { mutateAsync, data, isLoading } = useMutation<
    appleGameStateType,
    AxiosError<ServerError>,
    string
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
    if (!userStateValue.accessToken) {
      await guestMutate().then((response) => mutateAsync(response.accessToken));
    } else {
      await mutateAsync(userStateValue.accessToken);
    }
  };

  return { gameStart, data, isLoading };
};
