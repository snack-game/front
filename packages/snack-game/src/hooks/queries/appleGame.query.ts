import { useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import appleGameApi from '@api/appleGame';
import { appleGameState } from '@utils/atoms/game';
import { appleGameStateType } from '@utils/types/game.type';

import { ServerError } from '@constants/api.constant';
import LOCAL_STORAGE from '@constants/localstorage.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import { useMemberGuest } from '@hooks/queries/members.query';
import useError from '@hooks/useError';
import useLocalStorage from '@hooks/useLocalStorage';
import useToast from '@hooks/useToast';

export const useAppleGameStart = () => {
  const errorPopup = useError();
  const openToast = useToast();
  const setAppleGameState = useSetRecoilState(appleGameState);
  const { guestMutate } = useMemberGuest();
  const { storageValue: accessToken } = useLocalStorage<string>({
    key: LOCAL_STORAGE.ACCESS_TOKEN,
  });

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
    if (!accessToken) {
      await guestMutate();
    }

    await mutateAsync(accessToken);
  };

  return { gameStart, data, isLoading };
};
