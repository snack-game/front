import { useMutation } from '@tanstack/react-query';

import { sendProvocation } from '@pages/games/SnackGame/game/util/provocation.api';

import useToast from '@hooks/useToast';

export const useSendProvocation = () => {
  const openToast = useToast();

  return useMutation({
    mutationFn: sendProvocation,
    onSuccess: () => {
      openToast('도발 메시지를 전송했습니다!', 'success');
    },
    onError: () => {
      openToast('도발 메시지 전송에 실패했습니다.', 'error');
    },
    throwOnError: false,
  });
};
