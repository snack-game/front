import { useMutation } from 'react-query';

import { AxiosError } from 'axios';

import appleGameApi from '@api/appleGame';

import { ServerError } from '@constants/api.constant';
import LOCAL_STORAGE from '@constants/localstorage.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import useError from '@hooks/useError';
import useLocalStorage from '@hooks/useLocalStorage';
import useToast from '@hooks/useToast';

export const useGameStart = () => {
  const openToast = useToast();
  const errorPopup = useError();
  const { storageValue: accessToken } = useLocalStorage<string>({
    key: LOCAL_STORAGE.ACCESS_TOKEN,
  });

  const { mutate } = useMutation<string, AxiosError<ServerError>>(
    () => appleGameApi.gameStart(accessToken),
    {
      retry: 0,
      onError: (error: AxiosError<ServerError>) => {
        if (error.response) {
          errorPopup(error.response.status, error.response.data.messages);
        }
      },
      onSuccess: () => {
        openToast(TOAST_MESSAGE.GAME_START, 'success');
      },
    },
  );

  return {
    gameStartMutate: mutate,
  };
};
