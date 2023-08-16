import { useMutation } from 'react-query';

import { AxiosError } from 'axios';

import appleGameApi from '@api/appleGame';

import { ServerError } from '@constants/api.constant';
import LOCAL_STORAGE from '@constants/localstorage.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import { useMemberGuest } from '@hooks/queries/members.query';
import useError from '@hooks/useError';
import useLocalStorage from '@hooks/useLocalStorage';
import useToast from '@hooks/useToast';

export const useGameStart = () => {
  const openToast = useToast();
  const errorPopup = useError();
  const { guestMutate } = useMemberGuest();
  const { storageValue: accessToken } = useLocalStorage<string>({
    key: LOCAL_STORAGE.ACCESS_TOKEN,
  });

  const { mutate, error } = useMutation<
    string,
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
    onSuccess: () => {
      openToast(TOAST_MESSAGE.GAME_START, 'success');
    },
  });

  const gameStart = () => {
    if (!accessToken) {
      guestMutate();
      return;
    }

    mutate(accessToken);
  };

  return {
    gameStart,
    error,
  };
};
